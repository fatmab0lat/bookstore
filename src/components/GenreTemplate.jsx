import { React, useState, useEffect } from "react";
import bookdata from "../helpers/bookdata";
import BookItem from "./BookItem";
import api from "../api";
import axios from "axios";
function GenreTemplate({ genre }) {
  const genres = [
    "Science Fiction",
    "Fantasy",
    "Adventure",
    "Romance",
    "Crime",
    "Classics",
    "Dystopia",
    "Thriller",
  ];

  const [filteredBooks, setFilteredBooks] = useState([]);
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    const path = "/books/" + genre;
    await api
      .get(path)
      .then((response) => {
        setFilteredBooks(response.data);
      })
      .catch((error) => {
        console.error("error : ", error);
      });
  };
  return (
    <div>
      <h1 className="font-semibold text-2xl text-center mt-6">{genre}</h1>
      <div className="flex justify-center">
        <div className="flex flex-wrap align-middle justify-evenly mt-5 border-2 border-blue-900 rounded-xl w-3/4 p-4">
          {filteredBooks.map((book, key) => {
            return (
              <BookItem
                key={key}
                title={book.title}
                author={book.author}
                price={book.price}
                coverImg={book.coverImg}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GenreTemplate;
