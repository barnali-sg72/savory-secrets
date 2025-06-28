import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import FavoriteSection from "./FavoriteSection";
import DinnerSection from "./DinnerSection";
import EasySection from "./EasySection";
import { SearchType } from "../App";

type Props = {
  searchValue: SearchType;
};

export default function HomePage(props: Props) {
  const navigate = useNavigate();
  const handleViewAll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    mealType: string = "",
    ingredientType: string = ""
  ) => {
    e.preventDefault();
    const value = e.currentTarget.text;

    if (ingredientType !== "") {
      //setSelectedMenu("Ingredients");
      props.searchValue.updateIngredientType(ingredientType);
    }
    if (mealType !== "") {
      //setSelectedMenu("Meal");
      props.searchValue.updateMealType(mealType);
    }

    navigate("/recipes");
  };
  return (
    <div className="front-page">
      <div className="content d-flex flex-column">
        {/*<img className="images-anime"/> */}
        <HeroSection />
        <FavoriteSection />
        {/*<p className="separator"></p>*/}
        <DinnerSection handleViewAll={handleViewAll} />
        {/*<p className="separator"></p>*/}
        <EasySection handleViewAll={handleViewAll} />
        {/*<p className="separator"></p>*/}
        <h2 className="mission-header mt-5 ">Our Mission</h2>
        <div className="mission">
          <p className="message1">
            At Savory Secrets, we believe that food brings people together, and
            we are dedicated to building a warm and welcoming community of food
            enthusiasts. Our community is a place where you can share your
            culinary adventures, learn from one another, and find inspiration
            every day. Whether you’re a seasoned cook or just starting your
            culinary journey, you’ll find a supportive and friendly environment
            here.
          </p>

          <img className="img1" src="images/lobster.jpg" />
          <img className="img2" src="images/dish1.jpg" />
          <p className="message2">
            Our goal is to provide you with reliable, easy-to-follow recipes
            that you can trust. Whether you’re looking for quick weeknight
            dinners, indulgent desserts, or healthy meal prep ideas, you’ll find
            a diverse collection of recipes to suit every occasion. We also
            strive to offer valuable tips, cooking techniques, and ingredient
            information to help you become a more skilled and knowledgeable home
            cook. By offering a variety of recipes, we hope to cater to
            different tastes, dietary preferences, and cooking levels.
          </p>
        </div>
      </div>
    </div>
  );
}
