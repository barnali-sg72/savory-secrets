import { useEffect, useState } from "react";
import { Trash } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import {
  Ingredient,
  Instruction,
  OutletContextType,
  RecipeContext,
  RecipeContextType,
  RecipeDetails,
} from "./RecipePage";
import React from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { UserContextType, UserContext, getLoggedUser } from "../App";

export interface RecipeParams {
  id: string;
}

type Props = {
  mode: string;
};

export default function RecipeForm(props: Props) {
  //const [stepCount, setStepCount] = useState<number>(1);
  const userContext: UserContextType = React.useContext(
    UserContext
  ) as UserContextType;
  const [errors, setErrors] = useState(new Map<string, string>());
  const { id } = useParams<keyof RecipeParams>() as RecipeParams;
  const navigate = useNavigate();
  const outletData: OutletContextType = useOutletContext();
  const recipeContext: RecipeContextType = React.useContext(
    RecipeContext
  ) as RecipeContextType;
  const newRecipe: RecipeDetails = {
    id: "",
    title: "",
    image: "",
    description: "",
    readyInMinutes: 0,
    servings: 0,
    dishTypes: [],
    author: {
      username: getLoggedUser()?.username,
      firstname: getLoggedUser()?.firstname,
      lastname: getLoggedUser()?.lastname,
    },
    isPublic: true,
    rating: 0,
    ingredients: [
      {
        name: "",
        amount: 0,
        unit: "",
      },
    ],
    instructions: [
      {
        number: 1,
        step: "",
      },
    ],
  };
  const [recipe, setRecipe] = useState<RecipeDetails>(newRecipe);

  const errorMessages: Map<string, string> = new Map<string, string>([
    ["title", "Please enter recipe title"],
    ["image", "Please enter recipe image"],
    ["description", "Please enter recipe description"],
    ["readyInMinutes", "Please enter recipe preparation time"],
    ["servings", "Please enter recipe serving size"],
    ["instruction", "Please enter instruction"],
    ["ingredientName", "Please enter ingredient name"],
    ["ingredientAmount", "Please enter amount"],
    ["dishTypes", "Please select at least one dish type"],
  ]);

  //window.scrollTo(0, 0);

  //const [dishTypes, setDishTypes] = useState<string[]>([]);

  //const inputRefs : React.RefObject<HTMLInputElement>[] = Array(6).fill(0).map(i=> React.createRef());
  const handleFormErrors = () => {
    let allerrors = new Map<string, string>();
    allerrors.set(
      "title",
      recipe.title == "" ? errorMessages.get("title") ?? "" : ""
    );
    allerrors.set(
      "image",
      recipe.image == "" ? errorMessages.get("image") ?? "" : ""
    );
    allerrors.set(
      "description",
      recipe.description == "" ? errorMessages.get("description") ?? "" : ""
    );
    allerrors.set(
      "readyInMinutes",
      recipe.readyInMinutes == 0
        ? errorMessages.get("readyInMinutes") ?? ""
        : ""
    );
    allerrors.set(
      "servings",
      recipe.servings == 0 ? errorMessages.get("servings") ?? "" : ""
    );
    recipe.ingredients.map((val, ind) => {
      allerrors.set(
        "ingredient.name-" + ind,
        val.name == "" ? errorMessages.get("ingredientName") ?? "" : ""
      );
      allerrors.set(
        "ingredient.amount-" + ind,
        val.amount <= 0.0 ? errorMessages.get("ingredientAmount") ?? "" : ""
      );
    });
    recipe.instructions.map((val, ind) => {
      allerrors.set(
        "instruction.step-" + ind,
        val.step == "" ? errorMessages.get("instruction") ?? "" : ""
      );
    });
    allerrors.set(
      "dishTypes",
      recipe.dishTypes.length <= 0 ? errorMessages.get("dishTypes") ?? "" : ""
    );
    setErrors(allerrors);
  };

  // handleFormErrors();

  useEffect(() => {
    //window.scrollTo(0, 0);
    outletData.resetMessages();
    if (props.mode == "edit") {
      recipeContext.getRecipe(id).then((res) => {
        setRecipe(res.data[0]);
        //handleFormErrors();
      });
    } else {
      setRecipe(newRecipe);
    }
  }, [props.mode]);

  useEffect(() => {
    handleFormErrors();
  }, [recipe]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (e.currentTarget.checkValidity()) {
      errors.set(name, "");
    } else {
      errors.set(name, errorMessages.get(name) ?? "");
    }
    setRecipe((val) => ({ ...val, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    const checked = e.currentTarget.checked;
    let dtypes: string[] = recipe.dishTypes;

    if (checked && !hasDishType(dtypes, name)) {
      dtypes.push(name);
    }
    if (!checked && hasDishType(dtypes, name)) {
      dtypes.splice(dtypes.indexOf(name), 1);
    }
    setRecipe((val) => ({ ...val, dishTypes: dtypes }));

    handleFormErrors();
  };

  const hasDishType = (dtypes: string[], dish: string) => {
    return dtypes.find((dt) => dt === dish);
  };

  const isChecked = (name: string) => {
    let types = recipe.dishTypes;
    const found = types.filter((t: string) => t == name);
    return found.length > 0;
  };

  const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (e.currentTarget.checkValidity()) {
      errors.set(name, "");
    } else {
      errors.set(name, errorMessages.get(name) ?? "");
    }
    setRecipe((val) => ({ ...val, [name]: value }));
  };

  const handleIngredientChange = (
    e: React.FormEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    let ingredients = recipe.ingredients;
    let ing: Ingredient = ingredients[index];
    if (!ing) {
      ing = {
        name: "",
        amount: 0,
        unit: "",
      };
    }
    ing = { ...ing, [name]: value };
    ingredients[index] = ing;
    setRecipe((val) => ({ ...val, ingredients: ingredients }));
    handleFormErrors();

    /*if (!ing) {
            ing = {
                name: key === "name"?value:"",
                amount: key === "amount"?Number(value):0,
                unit: key === "unit"?value:""
            }
        }*/
  };

  const handleInstructionChange = (
    e: React.FormEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    let instructions = recipe.instructions;
    let ins: Instruction = instructions[index];
    if (!ins) {
      ins = {
        number: index + 1,
        step: "",
      };
    }
    ins = { ...ins, [name]: value };
    instructions[index] = ins;
    setRecipe((val) => ({ ...val, instructions: instructions }));
    handleFormErrors();
  };

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let ingredients = recipe.ingredients;
    const size = ingredients.length;
    const ing: Ingredient = {
      name: "",
      amount: 0,
      unit: "",
    };

    ingredients.push(ing);
    setRecipe((val) => ({ ...val, ingredients: ingredients }));
    handleFormErrors();
  };

  const handleAddInstruction = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let instructions = recipe.instructions;
    const size = instructions.length;
    let ins: Instruction = {
      number: size + 1,
      step: "",
    };

    instructions.push(ins);
    setRecipe((val) => ({ ...val, instructions: instructions }));
    handleFormErrors();
  };

  const handleDeleteIngredient = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const ingredients = recipe.ingredients;
    ingredients.splice(index, 1);
    setRecipe((val) => ({ ...val, ingredients: ingredients }));
  };

  const handleDeleteInstruction = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    const instructions = recipe.instructions;
    instructions.splice(index, 1);

    instructions.map((ins, ind) => {
      ins.number = ind + 1;
    });
    setRecipe((val) => ({ ...val, instructions: instructions }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (recipe.dishTypes.length > 0) {
      console.log(localStorage.getItem("user"));
      console.log(recipe);
      if (recipe.isPublic === undefined || recipe.isPublic === null) {
        recipe.isPublic = true;
      }
      recipeContext.saveRecipe(recipe, props.mode);
    } else {
      alert("Please fix the errors first");
    }
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    recipeContext.onCancel();
  };

  const getSelectStyle = () => {
    if (errors.get("dishTypes")) {
      return "col-md-12 ms-3 border border-danger py-3 ps-5 rounded-3";
    } else {
      return "col-md-12 ms-3 border border-secondary py-3  ps-5 rounded-3";
    }
  };

  return (
    <>
      <div className="row align-items-center search mb-2 g-0">
        <div className="col-md">
          <a href="#" onClick={(e) => navigate("/recipes")}>
            Go to List Page
          </a>
        </div>
      </div>

      <div className="row d-flex justify-content-center">
        <div className="col-md-12 recipe-layout">
          <form className="recipe-form mt-1" onSubmit={handleSubmitForm}>
            <div className="row mb-3 mt-1">
              <div className="col-md px-0">
                {props.mode == "add" ? (
                  <h3 className="form-header">CREATE RECIPE</h3>
                ) : (
                  <h3 className="form-header">EDIT RECIPE</h3>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="row mb-3 mt-4">
                  <div className="col-md-2">
                    <label htmlFor="title" className="form-label">
                      Recipe Name
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={recipe.title}
                      required
                      className={
                        errors.get("title")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("title")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="image" className="form-label">
                      Recipe Image
                    </label>
                  </div>
                  <div className="col-md">
                    <input
                      id="image"
                      name="image"
                      type="text"
                      value={recipe.image}
                      required
                      className={
                        errors.get("image")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("image")}
                    </span>{" "}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                  </div>
                  <div className="col-md">
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={recipe.description}
                      className={
                        errors.get("description")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleTextAreaChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("description")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="readyInMinutes" className="form-label">
                      Total time in minutes
                    </label>
                  </div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      id="readyInMinutes"
                      name="readyInMinutes"
                      required
                      value={recipe.readyInMinutes}
                      min="0"
                      className={
                        errors.get("readyInMinutes")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("readyInMinutes")}
                    </span>
                  </div>
                  <div className="col-md-2">
                    <label htmlFor="servings" className="form-label">
                      No of Servings
                    </label>
                  </div>
                  <div className="col-md-2">
                    <input
                      type="number"
                      id="servings"
                      name="servings"
                      required
                      value={recipe.servings}
                      min="0"
                      className={
                        errors.get("servings")
                          ? "form-control border border-danger"
                          : "form-control border border-secondary"
                      }
                      onChange={handleInputChange}
                    />
                    <span className="float-start text-danger">
                      {errors.get("servings")}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="float-start ms-3 mt-2">
                      Select dish types:
                    </label>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className={getSelectStyle()}>
                    <div className="row">
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="breakfast"
                          defaultChecked={false}
                          checked={isChecked("breakfast")}
                          value="breakfast"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="breakfast"
                          className="form-check-label ms-2"
                        >
                          Breakfast
                        </label>
                        <br />
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="main course"
                          defaultChecked={false}
                          checked={isChecked("main course")}
                          value="main course"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="main course"
                          className="form-check-label ms-2"
                        >
                          Main course
                        </label>
                        <br />
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="side dish"
                          defaultChecked={false}
                          checked={isChecked("side dish")}
                          value="side dish"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="side dish"
                          className="form-check-label ms-2"
                        >
                          Side dish
                        </label>
                        <br />
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="lunch"
                          defaultChecked={false}
                          checked={isChecked("lunch")}
                          value="lunch"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="lunch"
                          className="form-check-label ms-2"
                        >
                          Lunch
                        </label>
                        <br />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="dinner"
                          defaultChecked={false}
                          checked={isChecked("dinner")}
                          value="dinner"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="dinner"
                          className=" form-check-label ms-2"
                        >
                          Dinner
                        </label>
                        <br />
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="appetizer"
                          defaultChecked={false}
                          checked={isChecked("appetizer")}
                          value="appetizer"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="appetizer"
                          className="form-check-label ms-2 align-middle"
                        >
                          Appetizer
                        </label>
                        <br />
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="dessert"
                          defaultChecked={false}
                          checked={isChecked("dessert")}
                          value="dessert"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="dessert"
                          className="form-check-label ms-2"
                        >
                          Dessert
                        </label>
                        <br />
                      </div>
                      <div className="form-check col-md-3">
                        <input
                          type="checkbox"
                          className="form-check-input me-1 mt-3 border border-secondary"
                          name="drink"
                          defaultChecked={false}
                          checked={isChecked("drink")}
                          value="drink"
                          onChange={handleSelectChange}
                        />

                        <label
                          htmlFor="drink"
                          className="form-check-label ms-2"
                        >
                          Drink
                        </label>
                        <br />
                      </div>
                    </div>
                  </div>
                  <span className="float-start text-danger text-start">
                    {errors.get("dishTypes")}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="row gx-0 align-items-center form-header">
                    <div className="col-md-12  d-flex justify-content-between align-items-center">
                      <h4 className="float-start ms-2">Ingredients</h4>

                      <button
                        className="btn btn-link mb-1 float-end"
                        onClick={handleAddIngredient}
                      >
                        <PlusCircle />
                      </button>
                    </div>
                  </div>
                  {recipe.ingredients.map((ing, key) => (
                    <div className="ingr-form row  position-relative rounded-4 gx-0 mt-3">
                      <div className="col-md-1">
                        <label htmlFor={"name-" + key} className="form-label">
                          Name
                        </label>
                      </div>
                      <div className="col-md-4">
                        <input
                          id={"name-" + key}
                          name="name"
                          type="text"
                          value={ing.name}
                          required
                          className={
                            errors.get("ingredient.name-" + key)
                              ? "form-control border border-danger"
                              : "form-control border border-secondary"
                          }
                          onChange={(e) => handleIngredientChange(e, key)}
                        />
                        <span className="float-start text-danger">
                          {errors.get("ingredient.name-" + key)}
                        </span>
                      </div>
                      <div className="col-md">
                        <label
                          htmlFor={"amount-" + key}
                          className="form-label ms-4"
                        >
                          Amount
                        </label>
                      </div>
                      <div className="col-md-2">
                        <input
                          id={"amount-" + key}
                          name="amount"
                          type="number"
                          min="0"
                          step="0.1"
                          value={ing.amount}
                          required
                          className={
                            errors.get("ingredient.amount-" + key)
                              ? "form-control border border-danger"
                              : "form-control border border-secondary"
                          }
                          onChange={(e) => handleIngredientChange(e, key)}
                        />
                        <span className="float-start text-danger">
                          {errors.get("ingredient.amount-" + key)}
                        </span>
                      </div>
                      <div className="col-md">
                        <label
                          htmlFor={"unit-" + key}
                          className="form-label ms-4"
                        >
                          Unit
                        </label>
                      </div>
                      <div className="col-md">
                        <input
                          id={"unit-" + key}
                          name="unit"
                          type="text"
                          className="form-control border border-secondary"
                          value={ing.unit}
                          onChange={(e) => handleIngredientChange(e, key)}
                        />
                      </div>
                      {key > 0 ? (
                        <button
                          className="delete-btn btn btn-primary py-1 px-2  "
                          onClick={(e) => handleDeleteIngredient(e, key)}
                        >
                          <Trash />
                        </button>
                      ) : (
                        <button
                          className="delete-btn btn btn-primary py-1 px-2 opacity-0 "
                          disabled
                          onClick={(e) => handleDeleteIngredient(e, key)}
                        >
                          <Trash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <div className="row gx-0 align-items-center form-header">
                    <div className="col-md-12  d-flex justify-content-between align-items-center">
                      <h4 className="float-start ms-2 mt-2">Instructions</h4>

                      <button
                        className="btn btn-link float-end mb-1"
                        onClick={handleAddInstruction}
                      >
                        <PlusCircle />
                      </button>
                    </div>
                  </div>
                  {recipe.instructions.map((ins, key) => (
                    <div className="row gx-0 mt-3">
                      <div className="col-md-1">
                        <label
                          htmlFor={"step-" + ins.number}
                          className="form-label"
                        >
                          Step {ins.number}
                        </label>
                      </div>
                      <div className="col-md-10 d-flex flex-nowrap align-items-center justify-content-center">
                        <div className="w-90">
                          <textarea
                            id={"step-" + ins.number}
                            name="step"
                            required
                            value={ins.step}
                            className={
                              errors.get("instruction.step-" + key)
                                ? "form-control border border-danger"
                                : "form-control border border-secondary"
                            }
                            onChange={(e) => handleInstructionChange(e, key)}
                          />
                          <span className="float-start text-danger">
                            {errors.get("instruction.step-" + key)}
                          </span>
                        </div>

                        {key > 0 ? (
                          <div className="w-10">
                            <button
                              className="btn btn-primary ms-3 py-2 px-3"
                              onClick={(e) => handleDeleteInstruction(e, key)}
                            >
                              <Trash />
                            </button>
                          </div>
                        ) : (
                          <div className="w-10"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mb-5" role="group">
                  <button type="submit" className="btn btn-primary me-1">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
