import "./movie-view.scss";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-details">
      <div className="movie-image">
        <img src={movie.ImageURL} alt={movie.Title} style={{ width: "100%" }} />
      </div>
      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p>
          <strong>Description:</strong> {movie.Description}
        </p>
        <p>
          <strong>Genres:</strong> {movie.Genres.Name}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director.Name}
        </p>
        <p>
          <strong>Release year:</strong> {movie.Year}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Stars}
        </p>
      </div>
      <Button
        onClick={onBackClick}
        className="back-button"
        style={{ cursor: "pointer" }}
      >
        Back
      </Button>
    </div>
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
