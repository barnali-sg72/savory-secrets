import chicken from "../assets/images/chicken.jpg";
import shrimp from "../assets/images/shrimp.jpg";
import salmon from "../assets/images/salmon.jpg";
import beef from "../assets/images/beef.jpg";
import pork from "../assets/images/pork.jpg";
import vegetable from "../assets/images/vegetable-skewer.jpg";
import pasta from "../assets/images/pasta.jpg";
import bread from "../assets/images/bread.jpg";
import rice from "../assets/images/fried-rice.jpg";
import beans from "../assets/images/beans2.jpg";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchType } from "../App";

type Props = {
  searchValue: SearchType;
};

export default function IngredientSelection(props: Props) {
  const ingredients = [
    { ingredient: "Chicken", img: chicken },
    { ingredient: "Shrimp", img: shrimp },
    { ingredient: "Salmon", img: salmon },
    { ingredient: "Beef", img: beef },
    { ingredient: "Pork", img: pork },
    { ingredient: "Vegetable", img: vegetable },
    { ingredient: "Pasta", img: pasta },
    { ingredient: "Bread", img: bread },
    { ingredient: "Rice", img: rice },
    { ingredient: "Beans", img: beans },
  ];
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useState<string>("");
  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setSearchStr(value);
  };

  const onSearch = () => {
    props.searchValue.updateIngredientType(searchStr);
    navigate("/recipes");
  };

  const onSearchSelect = (str: string) => {
    setSearchStr(str);
    props.searchValue.updateIngredientType(str);
    navigate("/recipes");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onSearch();
    }
  };

  return (
    <section className="d-flex flex-column search-section">
      {/*<p className="separator"></p>*/}
      <div className="ing-search d-flex flex-column align-items-center justify-content-center mb-5">
        <h3 className="text-start fw-bold w-75 text-white mt-3 ms-3">
          Search by Ingredient Type
        </h3>
        <div className="border d-flex flex-nowrap w-75  rounded-4 my-3 overflow-hidden">
          <input
            className="float-start form-control mr-sm-2"
            name="ing-search"
            type="search"
            placeholder="Search by ingredient type"
            aria-label="Search"
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary">
            <Search
              color={"white"}
              size={"3rem"}
              className="search-icon float-none align-middle ms-1 mt-1"
              onClick={onSearch}
            />
          </button>
        </div>
      </div>
      <div className="px-5">
        <h3 className="text-center mt-5 ms-3">Popular Ingredients</h3>
        <div className="d-flex flex-wrap search-option    justify-content-between">
          {ingredients.map((val, ind) => (
            <section
              key={ind}
              className="d-flex flex-column gap-4 search-card rounded-4  mx-1 "
              onClick={() => onSearchSelect(val.ingredient)}
            >
              <img
                alt={val.ingredient}
                loading="lazy"
                className="w-100 rounded"
                src={val.img}
              ></img>
              <h4 className="text-start align-self-center justify-self-center">
                {val.ingredient}
              </h4>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
