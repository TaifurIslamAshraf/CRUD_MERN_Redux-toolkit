import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getBook, updateBook } from "./bookSlice";

const EditBook = () => {
  const location = useLocation();
  const [id] = useState(location.state._id);
  const [title, setTitle] = useState(location.state.title);
  const [author, setAuthor] = useState(location.state.author);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateBook({ id, title, author }));
      await dispatch(getBook());
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Your Book</h2>
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
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
