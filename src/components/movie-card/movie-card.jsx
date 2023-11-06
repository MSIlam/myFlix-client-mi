import PropTypes from "prop-types";
import { Button, Card, CardBody } from "react-bootstrap";
import "./movie-card.scss";
import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      className="movie-card" // Add a class for styling if needed onClick=
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

// defining the prop constrains
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImageURL: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
