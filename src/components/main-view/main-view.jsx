import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser);

  // Hooking
  useEffect(() => {
    if (!user || !storedToken) {
      return;
    }
    fetch("https://myflix-mi-e89972ef7472.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        const moviesFromApi = movies.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            ImageURL: movie.ImageURL,
            Description: movie.Description,
            Genres: {
              Name: movie.Genres.Name,
              Description: movie.Genres.Description,
            },
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
            },
            Stars: movie.Stars,
            Year: movie.Year,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [user, storedToken]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <p>
            <strong>Login</strong>
          </p>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              localStorage.setItem("token", token);
            }}
          />
          <p>
            <strong>Signup</strong>
          </p>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : (
        <React.Fragment>
          {movies.length === 0 ? (
            <div> The list is empty! </div>
          ) : (
            movies.map((movie) => (
              <Col className="md-5" key={movie.id} md={3}>
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))
          )}
          <Button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            Logout
          </Button>
        </React.Fragment>
      )}
    </Row>
  );
};
