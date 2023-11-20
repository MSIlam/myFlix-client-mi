import React from "react";
import { MovieCard } from "./movie-card"; // Import your MovieCard component
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const SingleMovieView = ({ movie, user, setUser, token }) => (
  <Container>
    <Row>
      <MovieCard movie={movie} user={user} setUser={setUser} token={token} />
    </Row>
  </Container>
);
