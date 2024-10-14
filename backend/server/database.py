import array
from bson.objectid import ObjectId
from util.common import hashPassword
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from motor.motor_asyncio import AsyncIOMotorClient
#from dotenv import dotenv_values
from dotenv import load_dotenv

import os

load_dotenv()

#config = dotenv_values(".env")
#print(config)
mongodb_client = AsyncIOMotorClient(os.getenv("ATLAS_URI"), tls=True, tlsAllowInvalidCertificates=True, server_api=ServerApi('1'))
#mongodb_client = MongoClient(os.getenv("ATLAS_URI"), tls=True, tlsAllowInvalidCertificates=True, server_api=ServerApi('1'))
database = mongodb_client[os.getenv("DB_NAME")]
recipe_collection = database.get_collection("recipes")
user_collection = database.get_collection("users")
review_collection = database.get_collection("reviews")

user_collection.create_index(("username"), unique=True)

def recipe_helper(recipe: dict, short:bool = False) -> dict:
    rating = 0
    if not short:
        ingredients = []
        for ing in recipe["ingredients"]:
            ingredients.append({
                "name": ing["name"],
                "amount": ing["amount"],
                "unit": ing["unit"]
            })
        
        instructions = []
        for ins in recipe["instructions"]:
            instructions.append({
                "number": ins["number"],
                "step": ins["step"]
            })

        author = {}
        if "author" in recipe.keys():
            author = {
                "username": recipe["author"]["username"],
                "firstname": recipe["author"]["firstname"],
                "lastname": recipe["author"]["lastname"]
            }
        else:
            author = {
                "username": "",
                "firstname": "",
                "lastname": ""
            }        

        if "rating" in recipe.keys():
            rating = recipe["rating"]

        return {
            "id": str(recipe["_id"]),
            "title": recipe["title"],
            "image": recipe["image"],
            "readyInMinutes": recipe["readyInMinutes"],
            "servings": recipe["servings"],
            "description": recipe["description"],
            "dishTypes": recipe["dishTypes"],
            "author": author,
            "isPublic": recipe["isPublic"],
            "rating": rating ,
            "ingredients": ingredients,
            "instructions": instructions
        }
    else:
        if "rating" in recipe.keys():
            rating = recipe["rating"]
        return {
            "id": str(recipe["_id"]),
            "title": recipe["title"],
            "image": recipe["image"],
            "description": recipe["description"],
            "isPublic": recipe["isPublic"],
            "rating": rating,
            "author" : {
                "username": recipe["author"]["username"],
                "firstname": recipe["author"]["firstname"],
                "lastname": recipe["author"]["lastname"]
            }
        }
    
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "firstname": user["firstname"],
        "lastname": user["lastname"],
        "username": user["username"],
        "password": user["password"],
        "email": user["email"],
        "phone": user["phone"]
    }

def review_helper(review) -> dict:
    return {
        "id": str(review["_id"]),
        "recipeId": review["recipeId"],
        "recipeTitle": review["recipeTitle"],
        "userId": review["userId"],
        "userName": review["userName"],
        "date": review["date"],
        "rate": review["rate"],
        "comment": review["comment"]
    }



# CRUD OPERATIONS ON recipe COLLECTION IN RecipeDB database
# Get all recipes
async def get_recipes():
    recipes = []
    #async for rec in recipe_collection.find():
    async for rec in recipe_collection.find({},{"ingredients": 0, "instructions": 0}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get all recipes by name
async def get_recipes_by_name(name: str):
    recipes = []
    #async for rec in recipe_collection.find():
    async for rec in recipe_collection.find({"$or": [{"title": {"$regex" : name, "$options": "i"}}, 
                                                     { "ingredients":{"$elemMatch":{"name": {"$regex" : name, "$options": "i"}}}}]},
                                            {"ingredients": 0, "instructions": 0}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get all recipes by authorId (username)
async def get_recipes_by_author(authorId: str):
    recipes = []
    #async for rec in recipe_collection.find():
    async for rec in recipe_collection.find({ "author.username": authorId },
                                            {"ingredients": 0, "instructions": 0}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get all recipes by ingredient type
async def get_recipes_by_ingredientType(ingredientType: str):
    recipes = []
    #async for rec in recipe_collection.find():
    #async for rec in recipe_collection.find({"ingredients":{"$elemMatch":{"name": {"$regex" : ingredientType.lower(), "$options": "i"}}}},
    #                                       {"ingredients": 0, "instructions": 0}):
    async for rec in recipe_collection.find({"title": {"$regex" : ingredientType, "$options": "i"}},
                                            {"ingredients": 0, "instructions": 0}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get all recipes by mealType
async def get_recipes_by_mealType(mealType: str):
    recipes = []
    #async for rec in recipe_collection.find():
    async for rec in recipe_collection.find({"dishTypes": mealType.lower()}, 
                                            {"ingredients": 0, "instructions": 0}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get all recipes by filter
async def get_recipes_by_filter(filter: list[str]):
    recipes = []
    #async for rec in recipe_collection.find():
    async for rec in recipe_collection.find({"dishTypes":{"$in": filter}}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get all recipes by name
async def get_recipes_by_name_and_filter(name: str, filter: list[str]):
    recipes = []
    #async for rec in recipe_collection.find():
    async for rec in recipe_collection.find({"$and": [{"$or": [{"title": {"$regex" : name, "$options": "i"}}, 
                                            { "ingredients":{"$elemMatch":{"name": 
                                            {"$regex" : name, "$options": "i"}}}}]},
                                            {"dishTypes":{"$in": filter}}]},
                                            {"ingredients": 0, "instructions": 0}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    
    return recipes

# Get recipe by id
async def get_recipe(id: str) -> dict:
    recipe = await recipe_collection.find_one({"_id": ObjectId(id)})
    if recipe:
        return recipe_helper(recipe, False)
    
# Get recipe by title list
async def get_recipe_by_title_list(titles: list):
    recipes = []
    async for rec in recipe_collection.find({"title": {"$in": titles}}).sort({"title": 1}):
        recipes.append(recipe_helper(rec, True))
    return recipes
    
# add a new recipe
async def add_recipe(recipe_data: dict):
    recipe = await recipe_collection.insert_one(recipe_data)
    new_recipe = await recipe_collection.find_one({"_id": recipe.inserted_id})
    return recipe_helper(new_recipe, True)

# update a recipe
async def update_recipe(id: str, recipe_data: dict):
    if len(recipe_data) <= 0:
        return False
    recipe = await recipe_collection.find_one({"_id": ObjectId(id)})
    if recipe:
        updated_recipe = await recipe_collection.update_one(
            {"_id": ObjectId(id)}, 
            {"$set": recipe_data}
        )
        if updated_recipe:
            return True
        else :
            return False

# update a recipe
async def update_recipe_rating(id: str, recipe_rating: dict):
    if len(recipe_rating) <= 0:
        return False
    recipe = await recipe_collection.find_one({"_id": ObjectId(id)})
    if recipe:
        updated_recipe = await recipe_collection.update_one(
            {"_id": ObjectId(id)}, 
            {"$set": recipe_rating}
        )
        if updated_recipe:
            return True
        else :
            return False
        
# delete a recipe
async def delete_recipe(id: str):
    recipe = await recipe_collection.find_one({"_id": ObjectId(id)})
    if recipe:
        await recipe_collection.delete_one({"_id": ObjectId(id)})
        return True
    
# get all users
async def get_users():
    users = []
    #async for rec in recipe_collection.find():
    async for rec in user_collection.find({}):
        users.append(user_helper(rec))
    
    return users

# add a new user
async def add_user(userdata: dict): 
    user = await user_collection.insert_one(userdata)
    newuser = await user_collection.find_one({"_id": user.inserted_id})
    return user_helper(newuser)

# get user by username
async def get_user(username: str):
    user = await user_collection.find_one({"username": username})
    if user:
        return user_helper(user)

# update a user
async def update_user(id: str, user_data: dict):
    if len(user_data) <= 0:
        return False
    
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        if user["password"] != user_data["password"] :
            user_data = hashPassword(user_data)
        result = await user_collection.update_one(
            {"_id": ObjectId(id)}, 
            {"$set": user_data}
        )
        if result:
            updated_user = await user_collection.find_one({"_id": ObjectId(id)})
            return user_helper(updated_user)
            #return True
        else :
            return None
            #return False
    
# delete a user
async def delete_user(id: str):
    user = await user_collection.find_one({"_id": ObjectId(id)})
    if user:
        await user_collection.delete_one({"_id": ObjectId(id)})
        return True
    

# CRUD OPERATIONS ON review COLLECTION IN RecipeDB database
# Get all reviews by recipe id

# Get review by id
async def get_reviews(recipeId: str) -> dict:
    reviews = []
    async for rec in review_collection.find({"recipeId": recipeId}):
        reviews.append(review_helper(rec))
    
    return reviews

# Get review by title
async def get_reviews_by_title(title: str) -> dict:
    reviews = []
    async for rec in review_collection.find({"recipeTitle": title}):
        reviews.append(review_helper(rec))
    
    return reviews

# add a new review
async def add_review(review_data: dict): 
    review = await review_collection.insert_one(review_data)
    newreview = await review_collection.find_one({"_id": review.inserted_id})
    return review_helper(newreview)

# update a review
async def update_review(id: str, review_data: dict):
    if len(review_data) <= 0:
        return False
    review = await review_collection.find_one({"_id": ObjectId(id)})
    if review:
        updated_review = await review_collection.update_one(
            {"_id": ObjectId(id)}, 
            {"$set": review_data}
        )
        if updated_review:
            return True
        else :
            return False
        
# delete a review
async def delete_review(id: str):
    review = await review_collection.find_one({"_id": ObjectId(id)})
    if review:
        await review_collection.delete_one({"_id": ObjectId(id)})
        return True