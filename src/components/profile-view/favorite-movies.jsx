import React from "react";
import { Link } from "react-router-dom";

function FavoriteMovies({ favoritemovieList }) {
  const removeFav = (movieId) => {
    // Implement the logic to remove the movie with the given ID from the favorites list
    console.log(`Removing movie with ID ${movieId} from favorites`);
  };
  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoritemovieList.map((movies) => {
        return (
          <div key={movies._id}>
            <img src={movies.ImageURL} />
            <Link to={`users/${users.id}/movies/${movies._id}`}>
              <h4>{movies.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>
              Remove from list
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;
