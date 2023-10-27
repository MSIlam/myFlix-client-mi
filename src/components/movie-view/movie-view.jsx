export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-details">
      <div className="movie-image">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h2>{movie.title}</h2>
        <p>
          <strong>Description:</strong> {movie.description}
        </p>
        <p>
          <strong>Genres:</strong> {movie.genres.name}
        </p>
        <p>
          <strong>Director:</strong> {movie.director.name}
        </p>
        <p>
          <strong>Release year:</strong> {movie.year}
        </p>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
