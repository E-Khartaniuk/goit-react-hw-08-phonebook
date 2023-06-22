import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContacts = async () => {
  const { data } = await axios.get(
    'https://6488eedf0e2469c038fe859b.mockapi.io/contacts'
  );

  return data;
};

export const addContact = async contactData => {
  const addcontactToDB = await axios.post(
    'https://6488eedf0e2469c038fe859b.mockapi.io/contacts',
    {
      ...contactData,
    }
  );

  return addcontactToDB;
};

export const deleteContact = async id => {
  const deleteContactFromDB = await axios.delete(
    `https://6488eedf0e2469c038fe859b.mockapi.io/contacts/${id}`
  );

  return deleteContactFromDB;
};

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
      .addCase(getContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ------ POST Contats
      .addCase(postContact.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.items = [...state.contacts.items, action.payload];
      })
      .addCase(postContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //// ---------- PUT Contacts
      .addCase(deleteContactThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload
        );
      })
      .addCase(deleteContactThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const contactReducer = phoneBookSlice.reducer;
export const { filter } = phoneBookSlice.actions;

export const store = configureStore({
  reducer: { contacts: contactReducer },
});
