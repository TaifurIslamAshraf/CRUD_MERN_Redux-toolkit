import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = "http://localhost:4000";

const initialState = {
  books: [],
  responseStatus: "",
  responseMessage: "",
  isLoding: false,
};

export const createBook = createAsyncThunk(
  "book/createBook",
  async (book, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/api/books`, book);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.res.data.message);
    }
  }
);

export const getBook = createAsyncThunk("book/getBook", async () => {
  try {
    const res = await axios.get(`${baseUrl}/api/books`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/api/books/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.res.data.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, title, author }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(`${baseUrl}/api/books/${id}`, {
        title: title,
        author: author,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: initialState,
  extraReducers: (build) => {
    build.addCase(createBook.pending, (state, action) => {
      state.responseStatus = "pending";
    });
    build.addCase(createBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
      state.responseStatus = "success";
      state.responseMessage = "Book created Successfully";
    });
    build.addCase(createBook.rejected, (state, action) => {
      state.responseMessage = action.payload;
      state.responseStatus = "rejected";
    });
    build.addCase(getBook.pending, (state, action) => {
      state.responseStatus = "pending";
      state.isLoding = true;
    });
    build.addCase(getBook.fulfilled, (state, action) => {
      state.books = action.payload;
      state.responseMessage = "Book get successfully";
      state.responseStatus = "success";
      state.isLoding = false;
    });
    build.addCase(getBook.rejected, (state, action) => {
      state.books = [];
      state.responseMessage = action.error.message;
      state.responseStatus = "Rejected";
      state.isLoding = false;
    });
    build.addCase(deleteBook.pending, (state, action) => {
      state.isLoding = false;
      state.responseStatus = "pending";
    });
    build.addCase(deleteBook.fulfilled, (state, action) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
      state.responseMessage = "Book delete successfully";
      state.responseStatus = "success";
      state.isLoding = false;
    });
    build.addCase(deleteBook.rejected, (state, action) => {
      state.responseMessage = action.error.message;
      state.responseStatus = "rejected";
    });
    build.addCase(updateBook.pending, (state, action) => {
      state.responseStatus = "pending";
      state.isLoding = true;
    });
    build.addCase(updateBook.fulfilled, (state, action) => {
      state.isLoding = false;
      const book = state.books.filter((book) =>
        book._id === action.payload.id ? action.payload : state
      );
      state.books = book;
      state.responseMessage = "book update successfully";
      state.responseStatus = "success";
    });
    build.addCase(updateBook.rejected, (state, action) => {
      state.isLoding = false;
      state.responseMessage = action.error.message;
      state.responseStatus = "rejected";
    });
  },
});

export default bookSlice.reducer;
