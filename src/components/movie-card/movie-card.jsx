import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="movie-card" // Add a class for styling if needed onClick=
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <button>{movie.title}</button>
    </div>
  );
};
