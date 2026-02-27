import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Carousel from "./Carousel";
import GenrePage from "./GenrePage";
import MoviePage from "./MoviePage";
import actionImg from "./assets/action.png";
import romanceImg from "./assets/romance.png";
import documentaryImg from "./assets/documentary.png";
import horrorImg from "./assets/horror.png";
import scifiImg from "./assets/scifi.png";
import comedyImg from "./assets/comedy.png";
import Footer from "./Footer";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import ScrollToTop from "./ScrollToTop";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [isCarouselVisible, setIsCarouselVisible] = useState(true);
  const genres = [
    {
      label: "Action",
      img: actionImg,
      onClick: () => navigate("/genre/Action"),
    },
    {
      label: "Romance",
      img: romanceImg,
      onClick: () => navigate("/genre/Romance"),
    },
    {
      label: "Documentary",
      img: documentaryImg,
      onClick: () => navigate("/genre/Documentary"),
    },
    {
      label: "Horror",
      img: horrorImg,
      onClick: () => navigate("/genre/Horror"),
    },
    {
      label: "Sci-Fi",
      img: scifiImg,
      onClick: () => navigate("/genre/Sci-Fi"),
    },
    {
      label: "Comedy",
      img: comedyImg,
      onClick: () => navigate("/genre/Comedy"),
    },
  ];

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 420);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 420);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [carouselItems, setCarouselItems] = useState(genres);
  const [isSearchMode, setIsSearchMode] = useState(false);

  async function searchMovies() {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=1a8538dae9b985e2342d6c4e86023791&query=${trimmed}`,
    );

    const data = await res.json();

    const results = (data.results || [])
      .filter((movie) => movie.poster_path)
      .slice(0, 6);

    const movieItems = results.map((movie) => ({
      id: movie.id,
      label: movie.title,
      img: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      onClick: () => navigate(`/movie/${movie.id}`),
    }));

    setIsCarouselVisible(false);

    setTimeout(() => {
      setCarouselItems(movieItems);
      setIsSearchMode(true);
      setIsCarouselVisible(true);
    }, 300);
  }

  function resetToGenres() {
    setIsCarouselVisible(false);

    setTimeout(() => {
      setCarouselItems(genres);
      setIsSearchMode(false);
      setSearchTerm("");
      setIsCarouselVisible(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      searchMovies();
    }
  }

  return (
    <>
      <ScrollToTop />
      <Nav isSearchMode={isSearchMode} onReset={resetToGenres} />
      <div className="page-container" key={location.pathname}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <>
                <div className="home-wrapper">
                  <div
                    style={{
                      opacity: isCarouselVisible ? 1 : 0,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    <Carousel
                      key={isSearchMode ? "search" : "genres"}
                      genres={carouselItems}
                      isSearchMode={isSearchMode}
                    />
                  </div>

                  <div className="search">
                    <input
                      type="text"
                      className="search-input"
                      placeholder={
                        isSmallScreen ? "Search" : "Search for movies..."
                      }
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <button
                      className="search-btn"
                      type="button"
                      onClick={searchMovies}
                    >
                      Search
                    </button>
                  </div>
                  {isSearchMode && (
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                      <button className="home-link" onClick={resetToGenres}>
                        Back to Genres
                      </button>
                    </div>
                  )}
                </div>
              </>
            }
          />

          <Route path="/genre/:genreQuery" element={<GenrePage />} />
          <Route path="/movie/:imdbID" element={<MoviePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer onHomeClick={resetToGenres} />
    </>
  );
}

export default App;
