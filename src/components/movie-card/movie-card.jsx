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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string.isRequired,
    genres: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthyear: PropTypes.string,
    }),
  }),
  onMovieClick: PropTypes.func.isRequired,
};
