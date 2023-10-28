import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Saving Privete Rayan",
      description:
        "Following the Normandy landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action at cost of their lives.",
      genres: {
        name: "war",
        description:
          "War film is a film genre concerned with warfare, typically about naval, air, or land battles, with combat scenes central to the drama",
      },
      year: "1998",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
      director: {
        name: "Steven Spielberg",
        bio: "One of the most influencial personalities in the history of cinema, Steven Sielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
        birthyear: "1970-01-01",
      },
    },
    {
      id: 2,
      title: "The Shawshank Redemption",
      description:
        "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
      genres: {
        name: "Drama",
        description:
          "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
      },
      year: "1994",
      director: {
        name: "Frank Darabont",
        bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution. Brought to America as an infant, he settled with his family in Los Angeles and attended Hollywood High School. His first job in movies was as a production assistant on the 1981 low-budget film",
        birthyear: "1959-05-03",
      },
      image:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    },
    {
      id: 3,
      title: "Forrest Gump",
      description:
        "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
      year: "1994",
      director: {
        name: "Robert Zemeckis",
        bio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films). Usually working with writing partner Bob Gale, Robert's earlier films show he has a talent for zany comedy (Romancing the Stone (1984), 1941 (1979)) and special effect vehicles (Who Framed Roger Rabbit (1988) and Back to the Future (1985)). His later films have become more serious, with the hugely successful Tom Hanks vehicle Forrest Gump (1994) and the Jodie Foster film Contact (1997), both critically acclaimed movies. Again, these films incorporate stunning effects. Robert has proved he can work a serious story around great effects.",
        birthyear: "1970-07-02",
      },
      genres: {
        name: "Romance",
        description:
          "Romance films involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating.",
      },
      image:
        "https://images.thalia.media/-/BF2000-2000/e280381e7f854702b5e8d12ca24cd0d1/forrest-gump-taschenbuch-winston-groom-englisch.jpeg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
