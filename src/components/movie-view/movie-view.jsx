import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Card, Button, Col, Container, Row } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { id } = useParams();
  // console.log("movieId:", movieId);

  const movie = movies.find((m) => m.id === id);
  return (
    <Container className="d-flex  align-items-center">
      <Row>
        <Col>
          <Card className="movie-image">
            <Card.Img src={movie.ImageURL} alt={movie.Title} />
          </Card>
        </Col>
        <Col>
          <Card className="movie-details">
            <Card.Body
              style={{
                fontSize: "20px",
              }}
            >
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Title>Description:</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
              <Card.Title>Genres:</Card.Title>
              <Card.Text>{movie.Genres.Name}</Card.Text>
              <Card.Title>Director:</Card.Title>
              <Card.Text>{movie.Director.Name}</Card.Text>
              <Card.Text>{movie.Director.Bio}</Card.Text>
              <Card.Text>{movie.Director.Birthyear}</Card.Text>
              <Card.Title>Release year:</Card.Title>
              <Card.Text>{movie.Year}</Card.Text>
              <Card.Title>Actors:</Card.Title>
              <Card.Text>{movie.Stars}</Card.Text>
            </Card.Body>
            <Card.Body className="text-center">
              <Link to={"/"}>
                <Button>Back</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
