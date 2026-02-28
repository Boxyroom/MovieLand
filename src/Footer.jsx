import { Link } from "react-router-dom";
import jcLogo from "./assets/RedLogo.png";

function Footer({ onHomeClick }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          © 2025 A Clavette Design
          <div className="footer-logo">
            <img src={jcLogo} alt="John Clavette Design Logo" />
          </div>
        </div>
        <div className="footer-links">
          <Link to="/" onClick={onHomeClick}>
            Home
          </Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
