
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Redux/authSlice';
import studentReducer from './Redux/studentSlice';
import libraryReducer from './Redux/librarySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    library: libraryReducer
    
    
  },
});

export default store;
