import { useNavigate, useOutletContext } from "react-router-dom";
import {
  OutletContextType,
  RecipeContext,
  RecipeContextType,
} from "./RecipePage";
import React from "react";
import Rating from "./Rating";
import Pagination from "./Pagination";
import useMediaQuery from "../hooks/useMediaQuery";

export default function RecipeList() {
  //const [isTablet, setTablet] = useState(window.matchMedia("only screen and (min-width: 768px)"));
  //const [matches, setMatches] = useState<boolean>(true);
  const outletData: OutletContextType = useOutletContext();
  const recipeContext: RecipeContextType = React.useContext(
    RecipeContext
  ) as RecipeContextType;
  const navigate = useNavigate();
  const mediaMatches: boolean = useMediaQuery(
    "only screen and (min-width: 768px)"
  );

  /*const handleRecipeClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    event.preventDefault();
    //recipeContext.getRecipe(id);
    navigate("/recipes/display/" + id);
  };

  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    recipeContext.addRecipe();
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    navigate("/recipes/display/" + id + "/edit");
    //recipeContext.editRecipe(id, true);
  };

  const handleShowDialog = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    recipeContext.handleShowDialog(id);
  };*/

  return (
    <section className="d-flex flex-column px-4 pb-4">
      <div className="d-flex-inline w-100 form-header mb-3  p-1 rounded-2">
        <div className="mt-2 ms-2">
          <h3>
            <b>{recipeContext.title.toUpperCase()}</b>
          </h3>
        </div>
      </div>
      {mediaMatches ? (
        <Pagination data={outletData.recipeList} />
      ) : (
        <section className="d-flex justify-content-center">
          <div className=" d-flex justify-content-center align-items-center flex-wrap col-scroll gap-4 ms-3 pt-4 ps-3">
            {outletData.recipeList.map((rec) => (
              <article
                className="card position-relative"
                onClick={() => navigate("/recipes/display/" + rec.id)}
              >
                <img
                  className="card-img-top"
                  src={rec.image}
                  alt={rec.title}
                ></img>
                {/*{ rec.author.username === getLoggedUser()?.username ?
                                <div className="image-buttons">
                                    <button type="button" className="btn btn-secondary"
                                        onClick={(event) => handleEditClick(event, rec.id)}>
                                        <Pencil fill="white" width="12" height="12"></Pencil>&nbsp;
                                    </button>
                                    <button type="button" className="btn btn-secondary"
                                        onClick={(e) => handleShowDialog(e, rec.id)}>
                                        <TrashFill fill="white" width="12" height="12"></TrashFill>
                                    </button>
                                </div>  
                            : <></>  }  */}
                <div className="card-body">
                  {rec.rating && rec.rating > 0 ? (
                    <Rating num={rec?.rating} />
                  ) : (
                    <Rating num={0} />
                  )}
                  <h6 className="card-author mb-3">
                    <b>Author:</b>{" "}
                    {rec.author.firstname + " " + rec.author.lastname}
                  </h6>
                  <h6 className="card-title text-wrap">{rec.title}</h6>
                  {
                    <p
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: rec.description || "",
                      }}
                    ></p>
                  }
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
