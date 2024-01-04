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
      {genres.map((genre) => {
        return <GenreTemplate genre={genre} />;
      })}
    </div>
  );
}

export default FilteredBooks;
