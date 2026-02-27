import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MovieRow({ title, query, movies: externalMovies, onLoad }) {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query || externalMovies) return;

    setLoading(true);

    const isNumber = typeof query === "number";

    const url = isNumber
      ? `https://api.themoviedb.org/3/discover/movie?api_key=1a8538dae9b985e2342d6c4e86023791&with_genres=${query}&sort_by=popularity.desc`
      : `https://api.themoviedb.org/3/search/movie?api_key=1a8538dae9b985e2342d6c4e86023791&query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || [];

        setFetchedMovies(results);
        setTimeout(() => {
          setLoading(false);
        }, 300);

        if (onLoad) {
          onLoad(results);
        }
      });
  }, [query, externalMovies, onLoad]);

  const moviesToDisplay = externalMovies || fetchedMovies;

  return (
    <section className="movie-row">
      <h3 className="row-title">{title}</h3>

      <div className="row-posters">
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="poster-skeleton" />
          ))}

        {moviesToDisplay
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <img
              key={movie.id}
              className="row-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              draggable="false"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
          ))}
      </div>
    </section>
  );
}

export default MovieRow;
