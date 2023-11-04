import React from "react";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser);
  // const [token, setToken] = useState (null);

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

  if (!user) {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div> The list is empty! </div>;
  }

  return (
    <div>
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) =>
              setSelectedMovie(newSelectedMovie)
            }
          />
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            // setUser(null); setToken(null); localStorage.clear(); }}> Logout </button>
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
