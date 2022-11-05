import React from "react";
import { Move } from "./Move";

const Book = ({ book, updateShelf }) => {
  const image = book.imageLinks && book.imageLinks.thumbnail;
  const noImage =
    "https://149348893.v2.pressablecdn.com/wp-content/uploads/2019/03/no-image-available.png";
  const noAuthor = "No Author";
  const authors = book.authors && book.authors.join(" & ");
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundSize: "128px 193px",
            backgroundImage: `url(${image || noImage})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <Move book={book} updateShelf={updateShelf} />
        </div>
      </div>

      <div className="book-title">{book.title}</div>
      <div className="book-authors">{authors || noAuthor}</div>
    </div>
  );
};

export default Book;
