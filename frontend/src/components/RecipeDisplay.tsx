import { Trash, Pen, XCircle } from "react-bootstrap-icons";
import {
  OutletContextType,
  RecipeContext,
  RecipeContextType,
  RecipeDetails,
  Review,
} from "./RecipePage";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import { RecipeParams } from "./RecipeForm";
import { getLoggedUser } from "../App";
import RatingInput from "./RatingInput";
import Rating from "./Rating";

export default function RecipeDisplay() {
  const { id } = useParams<keyof RecipeParams>() as RecipeParams;
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(
    null
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const newReview: Review = {
    id: "",
    recipeId: id,
    recipeTitle: "",
    userId: "",
    userName: "",
    date: "",
    rate: 0,
    comment: "",
  };

  const [rate, setRate] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [review, setReview] = useState<Review>(newReview);
  const navigate = useNavigate();
  const outletData: OutletContextType = useOutletContext();
  const recipeContext: RecipeContextType = React.useContext(
    RecipeContext
  ) as RecipeContextType;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRecipeData();
    getAllReviews(false, newReview);
  }, [review]);

  const fetchRecipeData = () => {
    recipeContext.getRecipe(id).then((res) => {
      setRecipeDetails(res.data[0]);
    });
  };

  /*useEffect(() => {
        getAllReviews();
    }, [reviews])*/

  const getAllReviews = (update: boolean, rev: Review) => {
    //get reviews
    const url = `${process.env.REACT_APP_RECIPE_API_URL}/reviews?recipeId=${id}`;
    axios
      .get(url)
      .then((response) => {
        setReviews(response.data.data[0]);
        const rate = getAverageReview(response.data.data[0]);
        const body = {
          rating: rate,
        };
        axios
          .put(`${process.env.REACT_APP_RECIPE_API_URL}/recipes/${id}`, body)
          .then((response) => {
            console.log(response);
            if (update) {
              setReview(rev);
            }
          })
          .catch((reason) => {
            console.log(reason);
          });
      })
      .catch((reason) => {
        console.log(reason);
        //setError(reason);
      });
  };

  const getAverageReview = (data: Review[]) => {
    let sum: number = 0;
    data.map((v: Review) => (sum = sum + v.rate));
    return sum / data.length;
  };

  const hasCurrentUserReview = () => {
    return (
      reviews.filter((r) => r.userId == getLoggedUser()?.username).length > 0
    );
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/recipes/display/" + id + "/edit");
  };

  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    recipeContext.onCancel();
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string | undefined
  ) => {
    e.preventDefault();
    //recipeContext.deleteRecipe(id);
  };

  const handleShowDialog = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    recipeContext.handleShowDialog(id);
  };

  const getDishType = (types: string[] | undefined) => {
    let st = "";
    if (types !== null && types !== undefined) {
      const size = types.length;
      types.forEach((t, i) => {
        st += t;
        st += i >= size - 1 ? "" : ", ";
      });
    }

    return st;
  };

  const createReview = async () => {
    let rev: Review = {
      id: "",
      recipeId: id,
      recipeTitle: recipeDetails?.title || "",
      userId: getLoggedUser()?.username || "",
      userName: getLoggedUser()?.firstname + " " + getLoggedUser()?.lastname,
      date: new Date().toISOString().slice(0, 10),
      rate: rate,
      comment: comment,
    };

    return rev;
  };

  const saveReview = async () => {
    let rev = await createReview();
    axios
      .post(`${process.env.REACT_APP_RECIPE_API_URL}/reviews`, rev)
      .then((response) => {
        console.log(response);
        getAllReviews(true, rev);
        //setReview(rev);
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  const updateCurrentUserRate = (num: number) => {
    setRate(num);
  };

  const handleCommentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    setComment(value);
  };

  const isOwner = () => {
    return (
      recipeDetails &&
      localStorage.getItem("user") !== undefined &&
      localStorage.getItem("user") !== null &&
      getLoggedUser()?.username === recipeDetails.author.username
    );
  };

  return (
    <>
      {recipeDetails ? (
        <div className="mt-1 px-5 recipe-display">
          <div className="row ">
            <div className="col-md-12 d-flex mt-2 justify-content-between align-items-center">
              <a
                className="view justify-self-start"
                href="#"
                onClick={(e) => navigate("/recipes")}
              >
                &lt;&lt; List Page
              </a>
              <div
                className="edit  btn-group justify-self-end align-items-center"
                role="group"
              >
                <button
                  className="btn btn-primary me-0"
                  disabled={!isOwner()}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Edit"
                  onClick={handleEditClick}
                >
                  <Pen />
                </button>
                <button
                  className="btn btn-primary"
                  disabled={!isOwner()}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete"
                  onClick={(e) => handleShowDialog(e, recipeDetails?.id)}
                >
                  <Trash />
                </button>

                <button
                  className="btn btn-primary"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Close"
                  onClick={handleCloseClick}
                >
                  <XCircle />
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="row mt-4 recipe-header">
                <div className="col-md-6 float-start d-flex flex-column">
                  <h3 className="float-start text-start">
                    {recipeDetails?.title}
                  </h3>
                  {
                    <div
                      className="recipe-desc"
                      dangerouslySetInnerHTML={{
                        __html: recipeDetails?.description || "",
                      }}
                    />
                  }
                  <div className="text-start mt-2">
                    <b>Rating</b>:&nbsp;
                    {recipeDetails.rating && recipeDetails.rating > 0 ? (
                      <Rating num={recipeDetails?.rating} />
                    ) : (
                      <Rating num={0} />
                    )}
                  </div>
                  <div className="text-start mt-2 mb-5">
                    <b>Author</b>:&nbsp;
                    {recipeDetails.author.firstname != ""
                      ? recipeDetails.author.firstname +
                        " " +
                        recipeDetails.author.lastname
                      : " Anonymous"}
                  </div>
                </div>
                <div className="d-flex col-md-6 justify-content-center">
                  <img
                    className="recipe-image"
                    src={recipeDetails?.image}
                  ></img>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-md-6 text-start bg-light-grey border border-grey rounded-4 p-4">
                  <div className="row mt-4">
                    <div className="col-md-6 text-start">
                      <div>
                        <b>Total Time:</b>&nbsp;&nbsp;&nbsp;
                        {recipeDetails?.readyInMinutes}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div>
                        <b>Servings:</b>&nbsp;&nbsp;&nbsp;
                        {recipeDetails?.servings}
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3 mb-4">
                    <div className="col-md text-start">
                      <div>
                        <b>Dish Types:</b>&nbsp;&nbsp;&nbsp;
                        {getDishType(recipeDetails?.dishTypes)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-12">
                  <div className="row">
                    <div className="float-start col-md-12 my-5">
                      <span className="float-start">
                        <h4>
                          <b>INGREDIENTS:</b>
                        </h4>
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="list-group border border-grey p-4">
                        {recipeDetails.ingredients.map((ing) => (
                          <li className="list-group-item p-0 mb-2">
                            <div className="row">
                              <div className="ingr col-md-12 float-start">
                                <span>
                                  <b>{ing.name}</b>
                                </span>
                                <span>
                                  {ing.amount} {ing.unit}
                                </span>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3 ">
                <h4 className="float-start col-md-12 my-5">
                  <span className="float-start">
                    <b>INSTRUCTIONS:</b>
                  </span>
                </h4>
                <ul className="list-group border border-grey p-4 m-2">
                  {recipeDetails.instructions.map((ins) => (
                    <li className="list-group-item">
                      <div className="instr float-start">
                        <span className="text-nowrap">
                          <b>Step {ins.number}</b>:
                        </span>
                        <span>{ins.step}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="row">
                <h4 className="float-start col-md-12 my-5">
                  <span className="float-start">
                    <b>REVIEWS:</b>
                  </span>
                </h4>
                <div className="ratings d-flex flex-column border border-grey">
                  {!hasCurrentUserReview() &&
                  recipeDetails.author.username !==
                    getLoggedUser()?.username ? (
                    <>
                      <h5 className="align-self-start p-2 mt-2 fw-bold">
                        Please review this recipe:
                      </h5>
                      <div className="add-review d-flex flex-column border border-grey p-4 bg-white">
                        <div className="d-flex">
                          <span className="align-self-start">
                            Rate this recipe:
                          </span>
                          <span className="stars ms-5">
                            <RatingInput
                              setCurrentUserRate={updateCurrentUserRate}
                            />
                          </span>
                        </div>
                        <label
                          className="align-self-start mt-4"
                          htmlFor="review"
                        >
                          Add your review:
                        </label>
                        <textarea
                          id="review"
                          className="p-2 w-100"
                          onChange={handleCommentChange}
                        ></textarea>
                        <div className="text-start mt-4">
                          <button
                            role="button"
                            className="btn btn-primary me-3"
                            onClick={saveReview}
                          >
                            Save Review
                          </button>
                          <button role="button" className="btn btn-secondary">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {reviews.length > 0 ? (
                    <h4 className="align-self-start p-2 mt-3 fw-bold">
                      Reviews from all users:
                    </h4>
                  ) : (
                    <h4 className="align-self-start p-2 mt-3 fw-bold">
                      No reviews found
                    </h4>
                  )}
                  <div className="allreviews d-flex flex-column">
                    {reviews.map((rec, k) => (
                      <div
                        className="d-flex flex-column border border-secondary-subtle gap-2 bg-white text-small p-4 mb-4"
                        key={k}
                      >
                        <div className="d-flex">
                          <span className="stars">
                            <Rating num={rec.rate} />
                          </span>
                        </div>
                        <p className="align-self-start text-blue  fx-2">
                          By {rec.userName}
                        </p>
                        <p className="align-self-start">Date: {rec.date}</p>
                        <p className="align-self-start mb-1 fw-bold">
                          Comments:
                        </p>
                        <p className="align-self-start border border-secondary-subtle rounded text-medium p-2 w-100 text-start">
                          {rec.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
