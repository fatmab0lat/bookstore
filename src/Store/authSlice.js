import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    currentUser: null, 
    token: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.currentUser; 
      state.token = action.payload.token;
    },
   
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
