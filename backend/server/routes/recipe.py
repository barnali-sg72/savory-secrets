import array
from typing import List
from fastapi import APIRouter, Body, Query
from fastapi.encoders import jsonable_encoder

from server.database import (
    get_recipes,
    get_recipes_by_name,
    get_recipes_by_author,
    get_recipes_by_filter,
    get_recipes_by_name_and_filter,
    get_recipe_by_title_list,
    get_recipes_by_ingredientType,
    get_recipes_by_mealType,
    get_recipe,
    add_recipe,
    update_recipe,
    delete_recipe
)

from server.models.recipe import (
    Recipe,
    UpdatedRecipe,
    UpdatedRecipeRating
)

from server.models.common import (
    ResponseModel,
    ErrorResponseModel
)
    
router = APIRouter()

@router.post("/", response_description="Recipe data added into the database")
async def add_recipe_data(recipe: Recipe = Body(...)):
    recipe = jsonable_encoder(recipe)
    new_recipe = await add_recipe(recipe)
    return ResponseModel(new_recipe, "Recipe added successfully.")

'''
@router.get("/", response_description="Recipes retrieved")
async def get_recipes_data(name: str = "", filter: List[str] = Query(None)):
    if name == "" and filter == None:
        recipes = await get_recipes()
    elif name != "" and filter == None:
        recipes = await get_recipes_by_name(name)
    elif name == "" and filter != None:
        recipes = await get_recipes_by_filter(filter)
    elif name != "" and filter != None:
        recipes = await get_recipes_by_name_and_filter(name, filter)

    if recipes:
        return ResponseModel(recipes, "Recipes data retrieved successfully")
    return ResponseModel(recipes, "Empty list returned")
'''

@router.get("/", response_description="Recipes retrieved")
async def get_recipes_data(name: str = "", author: str = "", mealType: str = "", ingredientType: str = "", titles: List[str] = Query(None)):
    if name == "" and author == "" and mealType == "" and ingredientType == "" and titles == None:
        recipes = await get_recipes()
    elif name != "":
        recipes = await get_recipes_by_name(name)
    elif author != "":
        recipes = await get_recipes_by_author(author)
    elif mealType != "":
        recipes = await get_recipes_by_mealType(mealType)
    elif ingredientType != "":
        recipes = await get_recipes_by_ingredientType(ingredientType)
    elif titles != None:
        recipes = await get_recipe_by_title_list(titles)

    if recipes:
        return ResponseModel(recipes, "Recipes data retrieved successfully")
    return ResponseModel(recipes, "Empty list returned")

@router.get("/{id}", response_description="Recipe data retrieved")
async def get_recipe_data(id):
    recipes = await get_recipe(id)
    if recipes:
        return ResponseModel(recipes, "Recipe data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Recipe doesn't exist.")

@router.put("/{id}", response_description="Recipe data updated")
async def update_recipe_data(id: str, req: UpdatedRecipe | UpdatedRecipeRating = Body(...)):
    req = {k: v for k, v in req.model_dump().items() if v is not None}
    updated_recipe = await update_recipe(id, req)
    if updated_recipe:
        return ResponseModel(
            "Recipe with ID: {} updated successfully".format(id),
            "Recipe updated successfully",
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the recipe data.",
    )

@router.delete("/{id}", response_description="Recipe data deleted")
async def delete_recipe_data(id: str):
    result = await delete_recipe(id)
    if result:
        return ResponseModel(
            "Recipe with ID: {} deleted successfully".format(id),
            "Recipe deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error deleting the recipe data."
    )
    

