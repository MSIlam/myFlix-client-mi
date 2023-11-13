import "./movie-view.scss";
import PropTypes from "prop-types";
import { Card, Button, Col, Container, Row } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container>
      <Row className="movie-details justify-content-md-center">
        <Col className=" col-lg-6 ">
          <Card className="movie-image">
            <Card.Img
              src={movie.ImageURL}
              alt={movie.Title}
              style={{ width: "100%" }}
            />
          </Card>
        </Col>
        <Col className="col-lg-6">
          <Card>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Title>Description:</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Card.Title>Genres:</Card.Title>
              <Card.Text>{movie.Genres.Name}</Card.Text>
              <Card.Title>Director:</Card.Title>
              <Card.Text>{movie.Director.Name}</Card.Text>
              <Card.Title>Release year:</Card.Title>
              <Card.Text>{movie.Year}</Card.Text>
              <Card.Title>Actors:</Card.Title>
              <Card.Text>{movie.Stars}</Card.Text>
            </Card.Body>
            <Button
              onClick={onBackClick}
              className="back-button"
              style={{ cursor: "pointer" }}
            >
              Back
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Proptype conditions
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Description: PropTypes.string,
    Genres: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
      Bio: PropTypes.string,
      Birthyear: PropTypes.string,
    }),
    Stars: PropTypes.string,
    Year: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
