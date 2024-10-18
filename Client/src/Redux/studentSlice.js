import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import GlobalApi from '../Components/GlobalApi';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get(`${GlobalApi.baseUrl}/student/get`);
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (studentData) => {
  const response = await axios.post(`${GlobalApi.baseUrl}/student/create`, studentData);
  return response.data;
});

export const updateStudent = createAsyncThunk('students/updateStudent', async ({ id, studentData }) => {
  const response = await axios.put(`${GlobalApi.baseUrl}/student/edit/${id}`, studentData);
  return response.data;
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id) => {
  await axios.delete(`${GlobalApi.baseUrl}/student/delete/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
