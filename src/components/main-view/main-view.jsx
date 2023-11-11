import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NaviBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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
            },
            Stars: movie.Stars,
            Year: movie.Year,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [user, storedToken]);

  return (
    <BrowserRouter>
      <NaviBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
      <Row
        className="justify-content-md-centre"
        style={{ marginTop: "60px", padding: "20px" }}
      >
        <Routes>
          <Route
            path="/signup"
            element={
              <React.Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </React.Fragment>
            }
          />
          <Route
            path="/login"
            element={
              <React.Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        localStorage.setItem("token", token);
                      }}
                    />
                  </Col>
                )}
              </React.Fragment>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <React.Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>This list is empty!</Col>
                ) : (
                  <Col md={8}>{<MovieView movies={movies} />}</Col>
                )}
              </React.Fragment>
            }
          />
          <Route
            path="/"
            element={
              <React.Fragment>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>This list is empty!</Col>
                ) : (
                  <React.Fragment>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          // addToFavorites={addToFavorites}
                        />
                      </Col>
                    ))}
                  </React.Fragment>
                )}
              </React.Fragment>
            }
          />
          <Route
            path="/profile"
            element={
              <React.Fragment>
                {user ? (
                  <Col md={8}>
                    <ProfileView />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </React.Fragment>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
