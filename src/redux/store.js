import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';

import { instance } from 'components/api/auth';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

export const fetchContacts = async () => {
  const { data } = await instance.get('/contacts');

  return data;
};

export const addContact = async contactData => {
  const addcontactToDB = await instance.post('/contacts', {
    ...contactData,
  });

  return addcontactToDB;
};

export const deleteContact = async id => {
  const deleteContactFromDB = await instance.delete(`/contacts/${id}`);

  return deleteContactFromDB;
};

export const changeContact = async body => {
  const { data } = await instance.patch(`/contacts/${body.id}`, {
    name: body.name,
    number: body.number,
  });
  // console.log('changeContact', data);

  return data;
};

export const changeContactThunk = createAsyncThunk(
  'contacts/changeContact',
  async (chengedContactData, { dispatch }) => {
    // console.log('chengeeeeeeThunk', chengedContactData);
    try {
      changeContact(chengedContactData);
      dispatch(getContacts());
    } catch (error) {
      return error;
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkApi) => {
    try {
      await deleteContact(id);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = fetchContacts();

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const postContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkApi) => {
    try {
      const { data } = await addContact(contactData);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const handlePanding = state => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.error = error ? error.message : payload;
};

export const phoneBookSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    filter: (state, action) => {
      if (action.payload === '') {
        return { ...state, filter: '' };
      }
      return {
        ...state,
        filter: action.payload.toLowerCase(),
      };
    },
  },
  extraReducers: builder =>
    builder
      // ------ FETCH Contats
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.items = action.payload;
      })
      // ------ POST Contats
      .addCase(postContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      //// ---------- PUT Contacts
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      })
      //////---------PATCH Contacts
      .addCase(changeContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.contacts.items = action.payload;
      })
      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePanding)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected),
});

export const contactReducer = phoneBookSlice.reducer;
export const { filter } = phoneBookSlice.actions;

const percistConfig = {
  key: 'token',
  storage,
  whitelist: ['access_token'],
};

const persistedReducer = persistReducer(percistConfig, authReducer);

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);
