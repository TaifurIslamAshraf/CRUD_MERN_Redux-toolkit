import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddBook from "../feature/book/AddBook";
import EditBook from "../feature/book/EditBook";
import Error from "../feature/book/Error";
import Home from "../feature/book/Home";
import Navbar from "../layouts/Navbar";
import About from "../pages/About";

const Index = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-book" element={<EditBook />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Index;
