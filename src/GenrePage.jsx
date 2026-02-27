import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieRow from "./MovieRow";

const GENRE_MAP = {
  Action: 28,
  Comedy: 35,
  Horror: 27,
  "Sci-Fi": 878,
  Romance: 10749,
  Documentary: 99,
};

function GenrePage() {
  const { genreQuery } = useParams();
  const genreId = GENRE_MAP[genreQuery];
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchGenreMovies() {
      if (!genreId) return;

      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=1a8538dae9b985e2342d6c4e86023791&with_genres=${genreId}&page=1`,
      );

      const data = await res.json();

      if (data.results) {
        setMovies(data.results.slice(0, 10));
      }
    }

    fetchGenreMovies();
  }, [genreId]);
  if (!genreId) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Genre not found.
      </div>
    );
  }
  return (
    <div style={{ paddingTop: "40px" }}>
      <MovieRow title={`${genreQuery} Movies`} movies={movies} />
    </div>
  );
}

export default GenrePage;
