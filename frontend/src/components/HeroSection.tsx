import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <div className="images-anime d-flex flex-column align-items-center">
          <h1>Welcome to Savory Secrets!</h1>
          <p>
            Indulge your culinary curiosity and embark on a flavorful journey
            with us. Whether you're a seasoned chef or a kitchen novice, our
            Recipe App is your passport to a world of delectable dishes,
            tantalizing treats, and culinary adventures. Discover thousands of
            recipes handpicked by our team of experts, ranging from quick and
            easy meals for busy weeknights to impressive gourmet creations for
            special occasions. With our intuitive interface and user-friendly
            design, finding the perfect recipe has never been easier.
          </p>
          <button
            className="btn btn-secondary float-start"
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
