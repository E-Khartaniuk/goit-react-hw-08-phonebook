import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, logIn, logOut } from 'components/api/auth';
import { getContacts } from 'redux/contacts/contactsThunk';

export const getProfileThunk = createAsyncThunk('auth/current', () => {
  return getProfile();
});

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const data = await logIn(body);
      dispatch(getProfileThunk());
      dispatch(getContacts());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/logout',
  async (body, { rejectWithValue }) => {
    try {
      const data = await logOut(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
