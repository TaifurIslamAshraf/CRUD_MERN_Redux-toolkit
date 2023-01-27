import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { deleteBook, getBook } from "./bookSlice";

const Home = () => {
  const { isLoding, books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBook());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  return (
    <div className="book-container">
      <h2>All Books</h2>
      {isLoding && <h2>Loding...</h2>}

      {isLoding ? (
        ""
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          {books &&
            books.map((book, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <Link to="/edit-book" state={book}>
                        <button className="edit-btn table-btn">Edit</button>
                      </Link>
                      <button
                        className="delete-btn table-btn"
                        onClick={() => handleDelete(book._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      )}
    </div>
  );
};

export default Home;
