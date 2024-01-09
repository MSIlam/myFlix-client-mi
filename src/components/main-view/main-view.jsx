import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { SingleMovieView } from "../movie-card/singlemovie-view";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NaviBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundView from "../not-found-view/not-found-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser);
  const [searchMovie, setSearchMovie] = useState("");

  const resetSearch = () => {
    setSearchMovie("");
  };

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

  // Filter movies based on search term
  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(searchMovie.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NaviBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
        setSearchMovie={setSearchMovie}
        filteredMovies={filteredMovies}
        resetSearch={resetSearch}
      />
      <Row
        className="justify-content-center align-items-center row-main"
        style={{
          height: "100vh",
          marginTop: "100px",
          "@media (maxWidth: 1200px)": {
            marginTop: "70px",
          },
          "@media (maxWidth: 992px)": {
            marginTop: "60px",
          },
          "@media (maxWidth: 768px)": {
            marginTop: "50px",
          },
          "@media (maxWidth: 443px)": {
            marginTop: "10px",
          },
        }}
      >
        <Routes>
          <Route
            path="/signup"
            element={
              <React.Fragment>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5} className="mx-auto">
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
                  <Col md={5} className="mx-auto">
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
                  <Col md={12}>{<MovieView movies={movies} />}</Col>
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
                ) : filteredMovies.length === 1 ? (
                  <Col xs={12} sm={10} md={8} lg={6}>
                    <SingleMovieView
                      movie={filteredMovies[0]}
                      user={user}
                      setUser={setUser}
                      token={storedToken}
                    />
                  </Col>
                ) : (
                  <React.Fragment>
                    {filteredMovies.map((movie) => (
                      <Col
                        key={movie.id}
                        className="mb-3"
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                      >
                        <MovieCard
                          movie={movie}
                          user={user}
                          setUser={setUser}
                          token={storedToken}
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
                  <Col>
                    <ProfileView movies={movies} />
                  </Col>
                ) : (
                  <Navigate to="/login" replace />
                )}
              </React.Fragment>
            }
          />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
