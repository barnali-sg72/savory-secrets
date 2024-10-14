import { useEffect, useState } from "react"
import axios from "axios"
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getLoggedUser, PageLayoutType, UserContext, UserContextType } from "../App";
import DeleteConfirmation from "./DeleteConfirmation";
import { XCircle } from "react-bootstrap-icons";

export type Ingredient = {
    name: string,
    amount: number,
    unit: string
}

export type Instruction = {
    number: number,
    step: string
}

export type Recipe = {
    id: string,
    title: string,
    image: string,
    description: string,
    readyInMinutes: number,
    servings: number,
    dishTypes: string[],
    author: {
        username: string | undefined,
        firstname: string | undefined,
        lastname: string | undefined
    },
    isPublic: boolean, 
    rating: number
}

export interface RecipeDetails extends Recipe {
    ingredients: Ingredient[],
    instructions: Instruction[]
}

export type Review = {
    id : string,
    recipeId: string,
    recipeTitle: string,
    userId: string,
    userName: string,
    date: string,
    rate: number,
    comment: string
}

export type MealType = {
    name: string,
    checked: boolean
}

export type RecipeContextType = {
    addRecipe: () => void,
    getRecipe: (id: string) => Promise<any>,
    editRecipe: (id: string, fetch: boolean) => void,
    saveRecipe: (recipe: RecipeDetails, mode: string) => void,
    deleteRecipe: (id: string|undefined) => void,
    onCancel: () => void,
    handleShowDialog: (id: string) => void,
    title: string

};

export type OutletContextType = {
    mealTypes : MealType[],
    recipeList: Recipe[],
    updateFilterList: (index: number) => void,
    recipeDetails: RecipeDetails,
    resetMessages: () => void
}

export const RecipeContext = React.createContext<RecipeContextType|null>(null);

type Props = {
    menuData: PageLayoutType
}

export default function RecipePage(props: Props) {
    const navigate = useNavigate();
    const userContext: UserContextType = React.useContext(UserContext) as UserContextType;
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>({} as RecipeDetails);
    //const [mode, setMode] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [error, setError] = useState<string>("");
    //const [criteria, setCriteria] = useState<string>("");
    const [filterList, setFilterList] = useState<string>("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [title, setTitle] = useState<string>("Loading...");

    //const pageOutletData: PageLayoutType = useOutletContext();
    
    const [mealTypes, setMealTypes] = useState<MealType[]>([ 
        { name: "breakfast", checked: false },
        { name: "dinner", checked: false },
        { name: "lunch", checked: false },
        { name: "main course", checked: false },
        { name: "side dish", checked: false },
        { name: "appetizer", checked: false },
        { name: "dessert", checked: false },
        { name: "drink", checked: false }
    ]);

    window.scrollTo(0, 0);
    
    useEffect(() => {
        window.scrollTo(0,0);
        resetMessages();
        getRecipeList();
    }, [props.menuData.searchCriteria, props.menuData.mealType, props.menuData.ingredientType, props.menuData.isUserRecipes]);

    const getRecipeList = () => {
        let url = "";
        const urlAll = "http://localhost:8000/recipes";
        const urlUserRecipes = "http://localhost:8000/recipes?author="+getLoggedUser()?.username;
        const urlSearch = "http://localhost:8000/recipes?name="+props.menuData.searchCriteria;
        const urlFilter = "http://localhost:8000/recipes?name="+filterList;  
        const urlMealType =  "http://localhost:8000/recipes?mealType="+props.menuData.mealType;
        const urlIngredientType =  "http://localhost:8000/recipes?ingredientType="+props.menuData.ingredientType;
        const urlFilterAndSearch = "http://localhost:8000/recipes?name="+props.menuData.searchCriteria+filterList;

        /*if ((props.menuData.searchCriteria == "") && (filterList.length <= 0)) {
            url = urlAll;
        } else if ((props.menuData.searchCriteria != "") && (filterList.length <= 0)) {
            url = urlSearch;
        } else if ((props.menuData.searchCriteria == "") && (filterList.length > 0)) {
            url = urlFilter;
        } else if ((props.menuData.searchCriteria != "") && (filterList.length > 0)) {
            url = urlFilterAndSearch;
        }*/
        let heading = "";
        if (props.menuData.isUserRecipes){
            url = urlUserRecipes;
            heading = "My Recipes";
        } else if (props.menuData.searchCriteria !== "") {
            url = urlSearch;
            heading = "Search results";
        } else if (props.menuData.mealType !== "") {
            url = urlMealType;
            heading = props.menuData.mealType + " recipes";
        } else if (props.menuData.ingredientType != "") {
            url = urlIngredientType;
            heading = props.menuData.ingredientType + " recipes";
        } else {
            url = urlAll;
            heading = "All Recipes";
        }

        
        //const url = criteria === "" ? urlAll: urlSearch;
        axios.get(url)
        .then(response => {
            setRecipeList(response.data.data[0].filter((d: Recipe) => {
                return props.menuData.isUserRecipes || (d.isPublic == undefined || d.isPublic === true); 
            }));  
            setTitle(heading.charAt(0).toUpperCase() + heading.slice(1));        
            //setSuccess("Recipes retrieved");       
        })
        .catch(reason => {
            console.log("Error retrieving recipe data");
            //pageOutletData.displayMessage(true, reason);
            setError(reason);
        })
    }

    const getRecipe = async (id: string) : Promise<any> => {
        const response = await fetchRecipe(id, "display");
        //let details = null;
        //response.then(res => {
        //    details = res?.data.data[0];
        //})
        return response?.data;
        //setMode("display");
    }

    const addRecipe = () => {
        resetMessages();
        navigate("/recipes/add");
        //setMode("add");
    }

    // CRUD functions added to context
    const fetchRecipe = async (id: string, mode: string)  => {
        resetMessages();
        if (id != null && id != undefined ) {
            const response = await axios.get("http://localhost:8000/recipes/"+id);
            /*if (response.status == 200) {
                //setRecipeDetails(response.data.data[0]);
                //navigate("/recipes/"+mode);
                //setMode(mode);
                return response.data.data[0];
            } else {
                console.log("Error retrieving recipe data");
                return null;
            }*/
           return response;
        }

    }

    const editRecipe = (id: string, fetch: boolean) => {
        if (fetch) {
            fetchRecipe(id, "edit");
        } else {
            navigate("/recipes/edit");
            //setMode("edit");
        }       
        
    }

    const saveRecipe = (recipe: RecipeDetails, mode: string) => {
        if (mode === "add") {
           axios.post("http://localhost:8000/recipes", recipe)
                .then(response => {     
                    //setMode("");                
                    getRecipeList();
                    //pageOutletData.displayMessage(false, "Recipe saved successfully");
                    setSuccess("Recipe saved successfully");
                    navigate("/recipes");
                })
                .catch(reason => {
                    console.log("Error saving recipe data");
                    //pageOutletData.displayMessage(true, "Error saving recipe data");
                    setError("Error saving recipe data");
                })
            
        } else if (mode === "edit") {
            axios.put("http://localhost:8000/recipes/"+recipe.id, recipe)
                .then(response => {     
                    //setMode("");      
                    setSuccess("Recipe updated successfully");   
                    //pageOutletData.displayMessage(false, "Recipe updated successfully");       
                    getRecipeList();
                    console.log(response);
                    navigate("/recipes");
                    
                })
                .catch(reason => {
                    console.log(reason);
                    //pageOutletData.displayMessage(true, "Error saving recipe data");
                    setError("Error saving recipe data");
                })
        }
    };

    const deleteRecipe = (id: string|undefined) => {
        if (id != null && id != undefined) {
            axios.delete("http://localhost:8000/recipes/"+id)
            .then(response => {                
                //setMode("");
                getRecipeList();
                setSuccess("Recipe deleted successfully");
                //pageOutletData.displayMessage(false, "Recipe deleted successfully");
                navigate("/recipes");
            })
            .catch(reason => {
                console.log("Error deleting recipe data");
                //pageOutletData.displayMessage(true, "Error deleting recipe data");
                setError("Error deleting recipe data");
            })
        }
       
    };

    /*const updateCriteria = (criteria: string) => {
        setSearchCriteria(criteria);
        getRecipeList();
    }*/

    const updateFilterList = (index: number) => {
        let types = mealTypes;
        types[index].checked = !types[index].checked;
        setMealTypes(types);
        setFilterList(getFilterList(types));
        //getRecipeList();
    }

    const getFilterList = (types: MealType[]) => {
        let list: string = "";
        types.filter(m => m.checked).forEach(f => {
            list += "&filter=" + f.name;
        })
        return list;
    }

    const onCancel = () => {
        //setMode("");
        navigate("/recipes");
    }

    const handleClose = () => setShowDeleteDialog(false);
    const handleShowDialog = (id: string) => {
        setSelectedId(id);
        setShowDeleteDialog(true);       
    }

    const handleDelete = () => {
        //alert("delete the reciope")
        deleteRecipe(selectedId);
    }


    const resetMessages = () => {
        setSuccess("");
        setError("");
    }

    const ProviderValue: RecipeContextType = {
        getRecipe: getRecipe,
        addRecipe: addRecipe,
        editRecipe: editRecipe,
        saveRecipe: saveRecipe,
        deleteRecipe: deleteRecipe,
        onCancel: onCancel,
        handleShowDialog: handleShowDialog,
        title: title
    }

    const outletData: OutletContextType = {
        mealTypes : mealTypes,
        recipeList: recipeList,
        updateFilterList: updateFilterList,
        recipeDetails: recipeDetails,
        resetMessages: resetMessages
    }

    return (
        <RecipeContext.Provider value={ProviderValue}>
            {/*<RecipeHeader updateCriteria={updateCriteria}/>*/}
            <div className="row recipe-page">
                <div className="col-md-12">
                    <div id="message" className="row">
                        <div className="col-md-12 px-5 mt-2">
                            { success?
                                <div className="d-flex msg-success align-items-center">
                                    <p className="fw-bold flex-grow-1 m-0">{success}</p>
                                    <button className="btn btn-link" data-bs-toggle="tooltip" data-bs-placement="top" title="Close"
                                        onClick={resetMessages}>
                                        <XCircle/>
                                    </button>                                     
                                </div>
                            : error? 
                                <div className="d-flex msg-error align-items-center">
                                    <p className="fw-bold flex-grow-1 m-0">{error}</p>
                                    <button className="btn btn-link" data-bs-toggle="tooltip" data-bs-placement="top" title="Close"
                                        onClick={resetMessages}>
                                        <XCircle/>
                                    </button> 
                                </div>
                            :<></>
                            }       
                        </div>
                        
                        
                    </div>
                    <div className="row mt-0 mx-1">
                        <div className="col-md-12 recipe-details">
                            <Outlet context={outletData}/>
                            <DeleteConfirmation showDialog={showDeleteDialog} handleClose={handleClose}
                                handleDelete={handleDelete}/>       
       
                        </div>
                    </div>
                </div>
            </div>
                    
        </RecipeContext.Provider>
    )

}