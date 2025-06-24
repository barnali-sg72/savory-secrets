import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import HorizontalScroll from "./HorizontalScroll";

type Props = {
  handleViewAll(
    e: React.MouseEvent<HTMLAnchorElement>,
    mealType: string,
    ingredientType: string
  ): void;
};

export default function DinnerSection(props: Props) {
  const navigate = useNavigate();
  const [dinners, setDinners] = useState<Recipe[]>([]);
  const [dinnerSet, setDinnerSet] = useState<Recipe[][]>([]);

  useEffect(() => {
    const url = `${process.env.REACT_APP_RECIPE_API_URL}/recipes?mealType=dinner`;
    axios.get(url).then((response) => {
      setDinners(response.data.data[0]);
    });
  }, []);

  useEffect(() => {
    populateDinnerSet();
  }, [dinners]);

  const populateDinnerSet = () => {
    let dinnerList: Recipe[][] = [];
    let count = 0;
    let lst: Recipe[] = [];
    for (const d of dinners) {
      if (count < 4) {
        lst.push(d);
        count++;
        if (count >= 4) {
          dinnerList.push(lst);
          lst = [];
          count = 0;
        }
      }
    }
    setDinnerSet(dinnerList);
  };

  return (
    <div className="dinner-section p-3">
      <div className="d-flex mt-3 mb-4 flex-wrap">
        <h2 className="text-start align-self-center ms-3 flex-grow-1">
          Explore Dinner Recipes
        </h2>
        <a
          href="#"
          className="justify-self-end align-self-center"
          onClick={(e) => props.handleViewAll(e, "dinner", "")}
        >
          View All
        </a>
      </div>
      <HorizontalScroll
        recipes={dinners}
        containerId="dinner-section-container"
      />
    </div>
  );
}
