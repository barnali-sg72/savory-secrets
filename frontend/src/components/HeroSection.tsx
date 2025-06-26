import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero">
        <img
          src="../assets/images/food8.webp"
          alt="hidden-image1"
          className="d-none"
        />
        <img
          src="../assets/images/food9.webp"
          alt="hidden-image2"
          className="d-none"
        />
        <img
          src="../assets/images/food13.webp"
          alt="hidden-image3"
          className="d-none"
        />
        <img
          src="../assets/images/food10.webp"
          alt="hidden-image4"
          className="d-none"
        />
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
