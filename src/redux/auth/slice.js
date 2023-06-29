import { createSlice } from '@reduxjs/toolkit';
import { getProfileThunk, logOutThunk, loginThunk } from './thunk';

const initialState = {
  access_token: '',
  isLoading: false,
  error: null,
  profile: '',
};

const handlePanding = state => {
  state.isLoading = true;
  state.error = '';
};

const handleRejected = (state, { error, payload }) => {
  state.isLoading = false;
  state.error = error ? error.message : payload;
};

export const handleFullfild = (state, action) => {
  state.isLoading = false;
  state.access_token = action.payload.token;
};

const handleFullfildProfile = (state, action) => {
  state.isLoading = false;
  state.profile = action.payload;
};

const handleLogOut = (state, action) => {
  state.isLoading = false;
  state.error = null;
  state.profile = '';
  state.access_token = '';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, handleFullfild)
      .addCase(getProfileThunk.fulfilled, handleFullfildProfile)
      .addCase(logOutThunk.fulfilled, handleLogOut)
      .addMatcher(action => {
        action.type.endsWith('/pending');
      }, handlePanding)
      .addMatcher(action => {
        action.type.endsWith('/rejected');
      }, handleRejected);
  },
});

export const authReducer = authSlice.reducer;
