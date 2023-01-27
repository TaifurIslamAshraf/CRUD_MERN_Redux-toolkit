import { configureStore } from "@reduxjs/toolkit";

import bookSlice from "../feature/book/bookSlice";

const store = configureStore({
  reducer: {
    books: bookSlice,
  },
});

export default store;
