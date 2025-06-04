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
  const [mealSet, setMealSet] = useState<Recipe[][]>([]);

  useEffect(() => {
    const url = "http://localhost:8000/recipes?ingredientType=easy";
    axios.get(url).then((response) => {
      setMeals(response.data.data[0]);
    });
  }, []);

  useEffect(() => {
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
  };

  return (
    <div className="easy-section p-3">
      <div className="head d-flex flex-wrap mt-3 mb-4">
        <h2 className="text-start align-self-center ms-3 flex-grow-1">
          Explore Quick and Easy Recipes
        </h2>
        <a
          href="#"
          className="justify-self-end align-self-center"
          onClick={(e) => props.handleViewAll(e, "", "easy")}
        >
          View All
        </a>
      </div>
      <HorizontalScroll recipes={meals} />
    </div>
  );
}
