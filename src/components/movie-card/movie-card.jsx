import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./movie-card.scss";

export const MovieCard = ({ movie, addToFavorites }) => {
  // State to track whether the movie is marked as a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Function to handle toggling the favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    addToFavorites(movie._id, !isFavorite); // Pass movie ID and favorite status to the parent component
  };
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImageURL} style={{ width: "100%" }} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Year}</Card.Text>
        <Link to={`/movies/${movie.id}`}>
          <Button variant="primary">Open</Button>
        </Link>
        <span
          role="img"
          aria-label="Heart"
          onClick={toggleFavorite}
          style={{
            fontSize: "2rem",
            color: isFavorite ? "red" : "black",
            position: "absolute",
            bottom: "10px",
            right: "10px",
            cursor: "pointer",
          }}
        >
          {isFavorite ? "❤️" : "🖤"}
        </span>
      </Card.Body>
    </Card>
  );
};

// defining the prop constra
MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImageURL: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string,
  }).isRequired,
  addToFavorites: PropTypes.func,
};
