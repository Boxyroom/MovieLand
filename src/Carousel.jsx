import { useState, useEffect, useRef } from "react";

function Carousel({ genres, isSearchMode }) {
  const angleRef = useRef(0);
  const cardRefs = useRef([]);
  const animationRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const radiusY = 60;
  const ROTATION_SPEED = 0.002;

  // Responsive breakpoint listener
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top when search activates
  useEffect(() => {
    if (isSearchMode) {
      document.activeElement?.blur();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSearchMode]);

  // Orbit animation
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    if (isMobile) {
      cardRefs.current.forEach((el) => {
        if (!el) return;
        el.style.transform = "none";
        el.style.zIndex = "0";
      });
      angleRef.current = 0;
      return;
    }

    function animate() {
      const radiusX = Math.min(320, window.innerWidth * 0.35);

      angleRef.current += ROTATION_SPEED;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;

        const baseAngle = (i / genres.length) * (Math.PI * 2);
        const angle = baseAngle + angleRef.current;

        const x = Math.sin(angle) * radiusX;
        const y = Math.cos(angle) * radiusY - 30;

        const depth = Math.cos(angle);
        const baseScale = 0.6 + (depth + 1) * 0.2;
        const hoverBoost = hoveredIndex === i ? 0.15 : 0;
        const scale = baseScale + hoverBoost;

        el.style.transform = `
          translateX(${x}px)
          translateY(${y}px)
          scale(${scale})
        `;

        el.style.zIndex = Math.floor((depth + 1) * 100);
      });

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [genres, isMobile, hoveredIndex]);

  if (!genres || genres.length === 0) return null;

  return (
    <div
      key={isMobile ? "mobile" : "desktop"}
      style={{ transition: "opacity 0.4s ease" }}
    >
      {isMobile ? (
        <div className="carousel-mobile">
          {genres.map((genre) => (
            <div
              key={genre.id || genre.label}
              className="carousel-mobile-card"
              onClick={genre.onClick}
            >
              {isSearchMode ? (
                <img
                  className="carousel-mobile-img"
                  src={genre.img}
                  alt={genre.label}
                />
              ) : (
                <div className="carousel-mobile-inner">
                  <img
                    className="card__img"
                    src={genre.img}
                    alt={genre.label}
                  />
                  <div className="carousel-mobile-title">{genre.label}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="carousel">
          {genres.map((genre, i) => (
            <div
              key={genre.id || genre.label}
              ref={(el) => (cardRefs.current[i] = el)}
              className="carousel-case"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={genre.onClick}
            >
              {isSearchMode ? (
                <img
                  src={genre.img}
                  alt={genre.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="glass-overlay">
                  <div className="genre-title">{genre.label}</div>
                  <img
                    className="card__img"
                    src={genre.img}
                    alt={genre.label}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Carousel;
