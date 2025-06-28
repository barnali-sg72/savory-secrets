import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero d-flex">
        <div className="hero-header  d-flex flex-column ">
          <h2>Welcome to</h2>
          <h1>Savory Secrets!</h1>
          <p>
            Handpicked recipes made with love and simple ingredients — perfect
            for cozy evenings, family gatherings, and every meal in between.
          </p>
          <button
            className="btn btn-primary "
            aria-label="explore"
            onClick={() => navigate("/recipes")}
          >
            Explore Recipes
          </button>
        </div>
      </div>
    </>
  );
}
