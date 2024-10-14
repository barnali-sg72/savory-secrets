from typing import List
import bcrypt
from fastapi import APIRouter, Body, HTTPException, Query
from fastapi.encoders import jsonable_encoder
import pymongo
from pymongo.errors import DuplicateKeyError
import base64

from util.common import hashPassword
from server.database import (
    get_users,
    add_user,
    get_user,
    update_user,
    delete_user
)

from server.models.user import (
    AuthUser,
    User,
    UpdatedUser
)

from server.models.common import (
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()

@router.get("/", response_description="Users retrieved")
async def get_users_data():
    users = await get_users()
    if users:
        return ResponseModel(users, "Users data retrieved successfully")
    return ResponseModel(users, "There are no users")

@router.post("/", response_description="User data added into the database")
async def add_user_data(user: User = Body(...)):
    user = hashPassword(user.__dict__)
    #user = jsonable_encoder(user)
    try:
        new_user = await add_user(user)
    except DuplicateKeyError:
        #raise HTTPException(status_code=409, detail="Username "+ user["username"]+" already exists")
        return ErrorResponseModel("An error occured.", 409, 
                                  "Username {} already exists".format(user["username"]))
    return ResponseModel(new_user, "User added successfully.")

@router.post("/login", response_description="User log in")
async def login_user(auth: AuthUser = Body(...)):
    username = base64.b64decode(auth.username).decode("utf-8")
    password = base64.b64decode(auth.password).decode("utf-8")
    user = await get_user(username)
   
    if user and bcrypt.checkpw(bytes(password, encoding="utf-8"), bytes(user["password"], encoding="utf-8")):        
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")

@router.get("/{username}", response_description="User data retrieved")
async def get_user_data(username:str, password:str):
    user = await get_user(username)
   
    if user and bcrypt.checkpw(bytes(password, encoding="utf-8"), bytes(user["password"], encoding="utf-8")):        
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")

@router.put("/{id}", response_description="User data updated")
async def update_user_data(id: str, req: UpdatedUser = Body(...)):
    req = {k: v for k, v in req.model_dump().items() if v is not None}
    try:
        updated_user = await update_user(id, req)
        if updated_user:
            return ResponseModel(
                #"User with ID: {} updated successfully".format(id),
                updated_user,
                "User updated successfully",
            )
    except DuplicateKeyError:
        return ErrorResponseModel(
            "An error occurred",
             409,
            "Username "+ req["username"]+" already exists")
        #raise HTTPException(status_code=409, detail="Username "+ req["username"]+" already exists")
    #except:
    #    raise HTTPException(status_code=404, detail="There was an error updating the user data. Try again later")
    
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the user data.",
    )


@router.delete("/{id}", response_description="User data deleted")
async def delete_user_data(id: str):
    result = await delete_user(id)
    if result:
        return ResponseModel(
            "User with ID: {} deleted successfully".format(id),
            "User deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error deleting the user data."
    )
    

