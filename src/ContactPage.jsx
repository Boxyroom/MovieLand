import jcLogo from "./assets/RedLogo.png";

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1>Contact Me!</h1>

        <p className="contact-para">
          Feel free to contact me with any questions or if you'd like to offer
          me a job!!!
        </p>

        <div className="profile-section">
          <div className="profile-logo">
            <img src={jcLogo} alt="John Clavette Design Logo" />
          </div>
          <div className="profile-info">
            <h2>Hello, I'm John Clavette...</h2>
            <p>I can be reached via email at:</p>
            <p className="contact-email">clavette.john@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
