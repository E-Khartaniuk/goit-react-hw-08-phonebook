import { configureStore, createSlice } from '@reduxjs/toolkit';

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import { authReducer } from './auth/slice';

import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

import {
  changeContactThunk,
  deleteContactThunk,
  getContacts,
  postContact,
} from './contacts/contactsThunk';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
    editedContact: null,
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
    editContact: (state, action) => {
      state.contacts.editedContact = action.payload;
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
export const { filter, editContact } = phoneBookSlice.actions;

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
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
