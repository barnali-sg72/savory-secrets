import axios from "axios";
import { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import HorizontalScroll from "./HorizontalScroll";

type Props = {
  handleViewAll(
    e: React.MouseEvent<HTMLAnchorElement>,
    mealType: string,
    ingredientType: string
  ): void;
};

export default function EasySection(props: Props) {
  //const navigate = useNavigate();
  const [meals, setMeals] = useState<Recipe[]>([]);
  //const [mealSet, setMealSet] = useState<Recipe[][]>([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_RECIPE_API_URL}/recipes?ingredientType=easy`;
    axios.get(url).then((response) => {
      setMeals(response.data.data[0]);
    });
  }, []);

  /*useEffect(() => {
    populateMealSet();
  }, [meals]);

  const populateMealSet = () => {
    let mealList: Recipe[][] = [];
    let count = 0;
    let lst: Recipe[] = [];
    for (const d of meals) {
      if (count < 4) {
        lst.push(d);
        count++;
        if (count >= 4) {
          mealList.push(lst);
          lst = [];
          count = 0;
        }
      }
    }
    setMealSet(mealList);
  };*/

  return (
    <div className="easy-section py-3">
      <div className="head d-flex  mt-5 mb-3">
        <h2 className=" align-self-center ms-3 flex-grow-1">
          Explore Quick and Easy Recipes
        </h2>
        <a
          href="#"
          className="view justify-self-end align-self-center"
          onClick={(e) => props.handleViewAll(e, "", "easy")}
        >
          View All &gt;&gt;
        </a>
      </div>
      <HorizontalScroll recipes={meals} containerId="easy-section-container" />
    </div>
  );
}
