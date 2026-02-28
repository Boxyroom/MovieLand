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

function GenrePage({ sortOrder, setSortOrder }) {
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
        const filtered = data.results
          .filter((movie) => movie.poster_path)
          .slice(0, 8);

        setMovies(filtered);
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

 
  const sortedMovies = sortOrder
    ? [...movies].sort((a, b) => {
        const dateA = new Date(a.release_date || 0);
        const dateB = new Date(b.release_date || 0);

        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      })
    : movies;

  return (
    <div style={{ paddingTop: "40px" }}>
      <div className="sort-container">
        <select className="sort-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by year</option>
          <option value="desc">Newest to Oldest</option>
          <option value="asc">Oldest to Newest</option>
        </select>
      </div>

      <MovieRow title={`${genreQuery} Movies`} movies={sortedMovies} />
    </div>
  );
}

export default GenrePage;
