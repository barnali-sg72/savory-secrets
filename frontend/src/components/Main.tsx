import { Route, Routes } from "react-router-dom";
import AlertDialog from "./AlertDialog";
import LoginForm from "./LoginForm";
import RecipeDisplay from "./RecipeDisplay";
import RecipeForm from "./RecipeForm";
import RecipeList from "./RecipeList";
import RecipePage from "./RecipePage";
import UserForm from "./UserForm";
import { useState } from "react";
import { AlertType, PageLayoutType, SearchType } from "../App";
import HomePage from "./HomePage";
import About from "./About";
import MealSelection from "./MealSelection";
import IngredientSelection from "./IngredientSelection";
import ContactUs from "./ContactUs";

type Props = {
  searchCriteria: string;
  mealType: string;
  ingredientType: string;
  isUserRecipes: boolean;
  searchValue: SearchType;
  //activeMenu: string
};
export default function Main(props: Props) {
  const [alert, setAlert] = useState<AlertType>({
    isError: false,
    message: "",
    show: false,
  });

  const displayMessage = (error: boolean, msg: string) => {
    setAlert({
      isError: error,
      message: msg,
      show: true,
    });
  };

  const menuData: PageLayoutType = {
    mealType: props.mealType,
    ingredientType: props.ingredientType,
    searchCriteria: props.searchCriteria,
    isUserRecipes: props.isUserRecipes,
    displayMessage: displayMessage,
    //updateActiveMenu: updateActiveMenu
  };

  return (
    <main className="d-flex flex-column">
      <Routes>
        <Route
          path="/"
          element={<HomePage searchValue={props.searchValue} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<UserForm mode="signup" />} />
        <Route
          path="/home"
          element={<HomePage searchValue={props.searchValue} />}
        />
        <Route
          path="/meal"
          element={<MealSelection searchValue={props.searchValue} />}
        />
        <Route
          path="/ingredient"
          element={<IngredientSelection searchValue={props.searchValue} />}
        />
        <Route path="/recipes" element={<RecipePage menuData={menuData} />}>
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/recipes/add" element={<RecipeForm mode="add" />} />
          <Route path="/recipes/display/:id" element={<RecipeDisplay />} />
          <Route
            path="/recipes/display/:id/edit"
            element={<RecipeForm mode="edit" />}
          />
        </Route>
        <Route path="/profile" element={<UserForm mode="profile" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      <AlertDialog
        openDialog={alert.show}
        isError={alert.isError}
        message={alert.message}
      />
    </main>
  );
}
