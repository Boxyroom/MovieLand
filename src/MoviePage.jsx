import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MoviePage() {
  const { imdbID } = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${imdbID}?api_key=1a8538dae9b985e2342d6c4e86023791`,
      );

      const data = await res.json();
      setMovie(data);
      const videoRes = await fetch(
        `https://api.themoviedb.org/3/movie/${imdbID}/videos?api_key=1a8538dae9b985e2342d6c4e86023791`,
      );

      const videoData = await videoRes.json();

      const trailer = videoData.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube",
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      }

      setLoading(false);
    }

    fetchMovie();
  }, [imdbID]);

  if (loading) {
    return (
      <div className="movie-page">
        <div className="movie-hero">
          <div className="movie-hero-overlay" />
        </div>
      </div>
    );
  }

  if (!movie) return <div style={{ padding: "40px" }}>Movie not found.</div>;
  console.log(movie);

  return (
    <div className="movie-page">
      <div className="back-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span>❮</span>
        </button>
      </div>
      <div
        className="movie-hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="movie-hero-overlay" />

        <div className="movie-hero-content">
          <h1>{movie.title}</h1>

          <p className="meta">
            {movie.release_date?.slice(0, 4)} {"\u2022"} {movie.runtime} min{" "}
            {"\u2022"} {movie.genres?.map((g) => g.name).join(", ")}
          </p>

          <p className="plot">{movie.overview}</p>

          <p className="rating">⭐ TMDB Rating: {movie.vote_average}</p>

          {trailerKey && (
            <button
              className="trailer-btn"
              onClick={() => setShowTrailer(true)}
            >
              ▶ Watch Trailer
            </button>
          )}
        </div>
      </div>

      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div
            className="trailer-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="trailer-close"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>

            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Movie Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MoviePage;
