import React from "react";
import { Person, PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { UserContextType, UserContext, User } from "../App";

type Props = {
  handleNavigate(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    menu: string,
    route: string,
    isUserRecipes: boolean
  ): void;
};

export default function HeaderUser(props: Props) {
  const userContext: UserContextType = React.useContext(
    UserContext
  ) as UserContextType;
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    userContext.updateCurrentUser(null);
    navigate("/");
  };

  const getName = () => {
    let user: string | undefined = "";
    if (localStorage.getItem("user") != null) {
      const currentUser: User | null = JSON.parse(
        localStorage.getItem("user") || "{}"
      );
      user = currentUser?.firstname;
    }
    return user;
  };

  return (
    <>
      {localStorage.getItem("user") === undefined ||
      localStorage.getItem("user") === null ? (
        <button
          className="signin btn btn-light align-self-center"
          onClick={(e) => navigate("/login")}
        >
          Sign In
        </button>
      ) : (
        <div className="dropdown show d-flex align-self-center">
          <a
            className=" d-flex align-items-center gap-2"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <p className="mb-0">Hi {getName()}!</p>
            <PersonFill size="2rem" color="white" />
          </a>
          <div
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuLink"
          >
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) =>
                props.handleNavigate(e, "My Profile", "/profile", false)
              }
            >
              My Profile
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) =>
                props.handleNavigate(e, "My Recipes", "/recipes", true)
              }
            >
              My Recipes
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) =>
                props.handleNavigate(e, "Add Recipes", "/recipes/add", false)
              }
            >
              Add Recipes
            </a>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => props.handleNavigate(e, "Login", "/login", false)}
            >
              Switch Account
            </a>
            <a className="dropdown-item" href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </>
  );
}
