import PropTypes from "prop-types";

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

// defining the prop constrains
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
