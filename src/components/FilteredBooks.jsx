import React from "react";
import GenreTemplate from "./GenreTemplate";

function FilteredBooks() {
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
  return (
    <div>
      {genres.map((genre, key) => {
        return <GenreTemplate genre={genre} key={key} />;
      })}
    </div>
  );
}

export default FilteredBooks;
