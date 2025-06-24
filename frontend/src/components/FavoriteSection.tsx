import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Recipe } from "./RecipePage";
import axios from "axios";
import Rating from "./Rating";

export default function FavoriteSection() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const favtitles = [
    "Grilled Sesame Chicken",
    "Pan-Seared Salmon With Orange-Miso Reduction",
    "Crab Cake Stuffed Shrimp",
    "Blueberry Raspberry Pie",
  ];

  useEffect(() => {
    const url =
      `${process.env.REACT_APP_RECIPE_API_URL}/recipes?` + getTitleList();
    axios.get(url).then((response) => {
      setFavorites(response.data.data[0]);
    });
  }, []);

  const getTitleList = () => {
    let list: string = "";
    favtitles.forEach((f) => {
      if (list !== "") {
        list += "&";
      }
      list += "titles=" + f;
    });
    return list;
  };

  return (
    <div className="favorite px-3 py-5">
      <h2 className="text-start mt-5 ms-3">Most Popular Recipes</h2>
      <div className="fav-scroll">
        <div className="d-flex fav-list justify-content-evenly ">
          {favorites.map((rec) => (
            <article
              className="card position-relative"
              onClick={() => navigate("/recipes/display/" + rec.id)}
            >
              <img
                className="card-img-top mb-2"
                src={rec.image}
                alt={rec.title}
              ></img>
              <div className="card-body">
                {rec.rating && rec.rating > 0 ? (
                  <Rating num={rec?.rating} />
                ) : (
                  <Rating num={0} />
                )}
                <h6 className="card-author mt-3 mb-4">
                  <b>Author:</b>{" "}
                  {rec.author.firstname + " " + rec.author.lastname}
                </h6>
                <h5 className="card-title text-wrap">{rec.title}</h5>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
