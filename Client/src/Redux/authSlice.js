// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,   
  token: null,
  isAuthenticated: false, //   authenticated or not
  loading: false, 
  error: null, // errors
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setLoading(state) {
      state.loading = true;
    },
    
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    
    clearError(state) {
      state.error = null;
    },
  },
});


export const { setLoading, loginSuccess, logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
