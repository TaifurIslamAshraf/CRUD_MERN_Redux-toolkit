import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createBook } from "./bookSlice";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const book = { title, author };
    dispatch(createBook(book));
    setTitle("");
    setAuthor("");
    navigate("/", { replace: true });
  };

  return (
    <div className="form-container">
      <h2>Add Your Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Book Title"
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          name="author"
          value={author}
          placeholder="Author Name"
          required
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
