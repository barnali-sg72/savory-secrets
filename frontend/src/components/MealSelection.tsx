import appetizer from "../assets/images/appetizer1.jpg";
import breakfast from "../assets/images/pancakes.jpg";
import dinner from "../assets/images/chicken.jpg";
import lunch from "../assets/images/hamburger.jpg";
import salad from "../assets/images/caesar-salad.jpg";
import soup from "../assets/images/soup1.jpg";
import maincourse from "../assets/images/noodles.jpg";
import sidedish from "../assets/images/vegetable-skewer.jpg";
import dessert from "../assets/images/dessert.jpg";
import drink from "../assets/images/drinks1.jpg";
import { Search } from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchType } from "../App";

type Props = {
  searchValue: SearchType;
};

export default function MealSelection(props: Props) {
  const meals = [
    { meal: "Appetizer", img: appetizer },
    { meal: "Breakfast", img: breakfast },
    { meal: "Dinner", img: dinner },
    { meal: "Lunch", img: lunch },
    { meal: "Salad", img: salad },
    { meal: "Soup", img: soup },
    { meal: "Main Course", img: maincourse },
    { meal: "Side Dish", img: sidedish },
    { meal: "Dessert", img: dessert },
    { meal: "Drink", img: drink },
  ];
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useState<string>("");
  const handleSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value: string = e.currentTarget.value;
    setSearchStr(value);
  };

  const onSearch = () => {
    props.searchValue.updateMealType(searchStr);
    navigate("/recipes");
  };

  const onSearchSelect = (str: string) => {
    setSearchStr(str);
    props.searchValue.updateMealType(str);
    navigate("/recipes");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      onSearch();
    }
  };

  return (
    <section className="d-flex flex-column search-section ">
      {/*<p className="separator"></p>*/}
      <div className="meal-search d-flex flex-column align-items-center justify-content-center mb-5 ">
        <h3 className="text-start fw-bold w-75 text-white mt-3 ms-3">
          Search by Meal Type
        </h3>
        <div className="border border-white d-flex flex-nowrap w-75 rounded-4 my-3 overflow-hidden">
          <input
            name="meal-search"
            className="float-start form-control mr-sm-2"
            type="search"
            placeholder="Search by meal type"
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
      <div className="p-5">
        <h3 className="text-center mt-5 ">Popular Meal Categories</h3>
        <div className="d-flex flex-wrap search-option justify-content-between ">
          {meals.map((val, ind) => (
            <section
              key={ind}
              className="d-flex flex-column search-card rounded-4  mx-1 gap-5"
              onClick={() => onSearchSelect(val.meal)}
            >
              <img
                alt={val.meal}
                className="w-100 rounded"
                src={val.img}
                loading="lazy"
              ></img>
              <h4 className="text-start align-self-center justify-self-center">
                {val.meal}
              </h4>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
