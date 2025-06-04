type Props = {
  selectedMenu: string;
  handleMenuClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    isMealType: boolean,
    isIngredientType: boolean
  ): void;
};

export default function Nav(props: Props) {
  return (
    <div className="app-menu d-flex">
      <div className="empty"></div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse  ms-5"
          id="navbarNav"
          role="navigation"
        >
          <ul className="navbar-nav d-flex gap-4">
            <li className="nav-item">
              <a
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className={
                  props.selectedMenu === "HOME" ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                onClick={(e) => props.handleMenuClick(e, "/home", false, false)}
              >
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className={
                  props.selectedMenu === "ALL RECIPES"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={(e) =>
                  props.handleMenuClick(e, "/recipes", false, false)
                }
              >
                ALL RECIPES
              </a>
            </li>
            <li className="nav-item dropdown btn-group">
              <a
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className={
                  props.selectedMenu === "MEAL" ? "nav-link active" : "nav-link"
                }
                onClick={(e) => props.handleMenuClick(e, "/meal", false, false)}
              >
                MEAL
              </a>
              <a
                href="#"
                className={
                  props.selectedMenu === "MEAL"
                    ? "nav-link dropdown-toggle active dropdown-toggle-split"
                    : "nav-link dropdown-toggle dropdown-toggle-split"
                }
                id="mealDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </a>

              <div className="dropdown-menu" aria-labelledby="mealDropdown">
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Appetizer
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Breakfast
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Dinner
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Lunch
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Salad
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Soup
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Main Course
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Side Dish
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Dessert
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", true, false)
                  }
                >
                  Drink
                </a>
              </div>
            </li>
            <li className="nav-item  dropdown btn-group">
              <a
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className={
                  props.selectedMenu === "INGREDIENTS"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={(e) =>
                  props.handleMenuClick(e, "/ingredient", false, false)
                }
              >
                INGREDIENTS
              </a>
              <a
                href="#"
                className={
                  props.selectedMenu === "INGREDIENTS"
                    ? "nav-link dropdown-toggle active dropdown-toggle-split"
                    : "nav-link dropdown-toggle dropdown-toggle-split"
                }
                id="ingredientDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="ingredientDropdown"
              >
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Chicken
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Shrimp
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Salmon
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Beef
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Pork
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Vegetable
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Pasta
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Bread
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Rice
                </a>
                <a
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  className="dropdown-item"
                  href="#"
                  onClick={(e) =>
                    props.handleMenuClick(e, "/recipes", false, true)
                  }
                >
                  Beans
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className={
                  props.selectedMenu === "ABOUT"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={(e) =>
                  props.handleMenuClick(e, "/about", false, false)
                }
              >
                ABOUT
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                className={
                  props.selectedMenu === "CONTACT US"
                    ? "nav-link active"
                    : "nav-link"
                }
                onClick={(e) =>
                  props.handleMenuClick(e, "/contactus", false, false)
                }
              >
                CONTACT US
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
