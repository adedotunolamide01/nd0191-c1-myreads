import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import MainShelf from "./components/MainShelf";
import { Navbar } from "./components/Navbar";
import * as BooksAPI from "./BooksAPI";
import Book from "./components/Book";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
    return () => {
      setBooks([]);
    };
  }, []);

  useEffect(() => {
    if (searchText.length > 0) {
      BooksAPI.search(searchText).then((result) => {
        if (result.error) {
          setSearchResults([]);
        } else {
          result.map((resultBook) => {
            const bookOnShelf = books.find(
              (originalBook) => originalBook.id === resultBook.id
            );
            if (bookOnShelf) {
              resultBook.shelf = bookOnShelf.shelf;
            }
            return resultBook;
          });
          setSearchResults(result);
        }
      });
    } else {
      setSearchResults([]);
    }
  }, [searchText, books]);

  useEffect(() => {
    if (showSearchPage) {
      setSearchResults([]);
      setSearchText("");
    }
  }, [showSearchPage]);

  const updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const newBooks = books.filter((prexBook) => {
        return book.id !== prexBook.id;
      });
      if (shelf !== "none") {
        newBooks.push({ ...book, shelf });
      }
      setBooks(newBooks);
    });
  };

  return (
    <div className="App">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchResults &&
                searchResults.map((allBook) => (
                  <li key={allBook.id}>
                    <Book book={allBook} updateShelf={updateShelf} />
                  </li>
                ))}
            </ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Navbar />
          <div className="list-books-content">
            <MainShelf books={books} updateShelf={updateShelf} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
      ;
    </div>
  );
}

export default App;
