import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import GlobalApi from '../Components/GlobalApi';

// Async Thunks for handling async actions like fetching, adding, editing, and deleting books

export const fetchBooks = createAsyncThunk('library/fetchBooks', async () => {
  const response = await axios.get(`${GlobalApi.baseUrl}/book/get`);
  return response.data;
});

export const addBook = createAsyncThunk('library/addBook', async (bookData) => {
  const response = await axios.post(`${GlobalApi.baseUrl}/book/create`, bookData);
  return response.data;
});

export const editBook = createAsyncThunk('library/editBook', async ({ id, bookData }) => {
  const response = await axios.put(`${GlobalApi.baseUrl}/book/edit/${id}`, bookData);
  return response.data;
});

export const deleteBook = createAsyncThunk('library/deleteBook', async (id) => {
  await axios.delete(`${GlobalApi.baseUrl}/book/delete/${id}`);
  return id;
});

// Slice
const librarySlice = createSlice({
  name: 'library',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload);
      })
      .addCase(editBook.fulfilled, (state, action) => {
        const updatedBook = action.payload;
        const index = state.books.findIndex((book) => book._id === updatedBook._id);
        if (index !== -1) {
          state.books[index] = updatedBook; // Update the book in state immediately
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book._id !== action.payload);
      });
  },
});

export default librarySlice.reducer;
