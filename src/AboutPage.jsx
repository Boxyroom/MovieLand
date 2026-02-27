import jcLogo from "./assets/Redlogo.png";

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-card">
        <h1>About The Creator of <strong className="brand-accent">MovieLand</strong></h1>

        <p className="about-description">
          <strong className="brand-accent">MovieLand</strong> is a React-based
          movie browsing application built using TMDB's API. Designed and
          developed by John Clavette.
        </p>

        <div className="profile-section">
          <div className="profile-logo">
            <img src={jcLogo} alt="John Clavette Design Logo" />
          </div>

          <div className="profile-info">
            <h2>John Clavette</h2>
            <p>
              <b>Email:</b> clavette.john@gmail.com
            </p>
            <p>
              <b>GitHub:</b> https://github.com/Boxyroom
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
