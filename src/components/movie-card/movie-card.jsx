import PropTypes from "prop-types";
import { Button, Card, CardBody } from "react-bootstrap";
import "./movie-card.scss";
import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)} variant="link" className="h-100">
      <Card.Img variant="top" src={movie.ImageURL} style={{ width: "100%" }} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Year}</Card.Text>
      </Card.Body>
    </Card>
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
