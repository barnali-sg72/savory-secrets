import React, { useState } from "react";
import "./App.css";
import "./css/queries.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import axios from "axios";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
};

export type Result = {
  error: boolean;
  message: string;
};

export type PageLayoutType = {
  mealType: string;
  ingredientType: string;
  searchCriteria: string;
  isUserRecipes: boolean;
  displayMessage(error: boolean, msg: string): void;
  //updateActiveMenu(menu: string): void
};

export type UserContextType = {
  user: User | null;
  updateCurrentUser: (user: User | null) => void;
  saveUser: (user: User | null, mode: string) => Promise<Result>;
};

export const UserContext = React.createContext<UserContextType | null>(null);
export type AlertType = {
  isError: boolean;
  message: string;
  show: boolean;
};

export type SearchType = {
  updateCriteria(str: string): void;
  updateMealType(str: string): void;
  updateIngredientType(str: string): void;
  updateIsUserRecipes(flag: boolean): void;
};

export function getLoggedUser() {
  if (localStorage.getItem("user") != null) {
    const currentUser: User | null = JSON.parse(
      localStorage.getItem("user") || "{}"
    );
    return currentUser;
  } else {
    return null;
  }
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [mealType, setMealType] = useState("");
  const [ingredientType, setIngredientType] = useState("");
  const [isUserRecipes, setUserRecipes] = useState<boolean>(false);

  const updateMealType = (criteria: string) => {
    resetCriteria();
    setMealType(criteria);
  };

  const updateIngredientType = (criteria: string) => {
    resetCriteria();
    setIngredientType(criteria);
  };

  const updateCriteria = (criteria: string) => {
    resetCriteria();
    setSearchCriteria(criteria);
  };

  const updateIsUserRecipes = (criteria: boolean) => {
    resetCriteria();
    setUserRecipes(criteria);
  };

  const resetCriteria = () => {
    setIngredientType("");
    setMealType("");
    setSearchCriteria("");
    setUserRecipes(false);
  };

  const getUserName = () => {
    let user: string | undefined = "";
    if (localStorage.getItem("user") != null) {
      const currentUser: User | null = JSON.parse(
        localStorage.getItem("user") || "{}"
      );
      user = currentUser?.username;
    }
    return user;
  };

  const getLoggedUser = () => {
    let user: User | null = null;
    if (localStorage.getItem("user") != null) {
      const currentUser: User | null = JSON.parse(
        localStorage.getItem("user") || "{}"
      );
      user = currentUser;
    }
    return user;
  };

  const saveUser = async (user: User | null, mode: string): Promise<Result> => {
    let msg: string = "";
    let response = null;
    let isError = false;
    if (mode == "signup") {
      response = await axios.post(
        `${process.env.REACT_APP_RECIPE_API_URL}/user`,
        user
      );
    } else {
      response = await axios.put(
        `${process.env.REACT_APP_RECIPE_API_URL}/user/${user?.id}`,
        user
      );
    }

    if (response.status == 200) {
      if (response.data.code == 409) {
        msg = response.data.message;
        isError = true;
      } else {
        const data: User | null = response.data.data[0];
        isError = false;
        if (mode == "signup") {
          msg =
            "User " +
            user?.username +
            " added successfully. Please go to the login page";
        } else {
          if (data != undefined) {
            updateCurrentUser(data);
            msg = "User " + user?.username + " updated successfully.";
          }
        }
      }
    } else if (response.status == 409) {
      isError = true;
      msg = response.statusText;
    } else {
      isError = true;
      msg =
        "User " +
        user?.username +
        " could not be saved successfully. Please try later";
    }

    return { error: isError, message: msg };
  };

  const updateCurrentUser = (user: User | null) => {
    if (user === null) {
      setUser(null);
      localStorage.removeItem("user");
    } else {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const UserContextValue: UserContextType = {
    user: user,
    updateCurrentUser: updateCurrentUser,
    saveUser: saveUser,
  };

  const updateSearch: SearchType = {
    updateCriteria: updateCriteria,
    updateMealType: updateMealType,
    updateIngredientType: updateIngredientType,
    updateIsUserRecipes: updateIsUserRecipes,
  };

  return (
    <UserContext.Provider value={UserContextValue}>
      <div className="App d-flex flex-column">
        <Header searchValue={updateSearch} />
        <Main
          searchCriteria={searchCriteria}
          mealType={mealType}
          ingredientType={ingredientType}
          isUserRecipes={isUserRecipes}
          searchValue={updateSearch}
        />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
