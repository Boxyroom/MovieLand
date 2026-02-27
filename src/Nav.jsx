import logo from "./assets/movieland-logo4.png";
import { Link, useLocation } from "react-router-dom";

function Nav({ isSearchMode, onReset }) {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src={logo}
          alt="MovieLand Logo"
          className="logo-img"
        />
      </Link>

      {!isHome && (
        <Link to="/" className="home-link" onClick={onReset}>
          Home
        </Link>
      )}

      {isHome && isSearchMode && (
        <button className="home-link" onClick={onReset}>
          Genres
        </button>
      )}
    </nav>
  );
}

export default Nav;
