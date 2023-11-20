import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, user, setUser, token }) => {
  // State to track whether the movie is marked as a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(user?.FavouriteMovies?.includes(movie.id) || false);
  }, [user, movie]);

  const addToFavorites = () => {
    if (!user) {
      console.error("User is undefined.");
      return;
    }
    fetch(
      `https://myflix-mi-e89972ef7472.herokuapp.com/users/${user._id}/movies/${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add to favorites");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://myflix-mi-e89972ef7472.herokuapp.com/users/${user._id}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="h-100 shadow ">
      <div>
        <Card.Img
          variant="top"
          src={movie.ImageURL}
          style={{
            width: "100%",
            height: "450px",
            objectFit: "cover",
          }}
        />
      </div>
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Year}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Link to={`/movies/${movie.id}`}>
          <Button
            variant="primary"
            style={{
              left: "10px",
              botton: "10px",
              cursor: "pointer",
            }}
          >
            Open
          </Button>
        </Link>
        <span
          role="img"
          aria-label="Heart"
          onClick={isFavorite ? removeFavoriteMovie : addToFavorites}
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
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};
