import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('auth')) || {
  isAuthenticated: false,
  currentUser: null,
  token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.currentUser; 
      state.token = action.payload.token;
      localStorage.setItem('auth', JSON.stringify(state));
    },
   
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
