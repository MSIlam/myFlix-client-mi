import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div>
      <button
        className="movie-card" // Add a class for styling if needed
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </button>
    </div>
  );
};
