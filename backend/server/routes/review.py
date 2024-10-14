from typing import List
import bcrypt
from fastapi import APIRouter, Body, HTTPException, Query
from fastapi.encoders import jsonable_encoder
import pymongo
from pymongo.errors import DuplicateKeyError

from util.common import hashPassword
from server.database import (
    get_reviews,
    get_reviews_by_title,
    add_review,
    update_review,
    delete_review
)

from server.models.review import (
    Review,
    UpdatedReview
)

from server.models.common import (
    ResponseModel,
    ErrorResponseModel
)

router = APIRouter()

@router.get("/", response_description="Reviews retrieved")
async def get_reviews_data(recipeId: str = "", recipeTitle: str = ""):
    if recipeId != "":
        reviews = await get_reviews(recipeId)
    elif recipeTitle != "":
        reviews = await get_reviews_by_title(recipeTitle)
        
    if reviews:
        return ResponseModel(reviews, "Reviews retrieved successfully")
    return ResponseModel(reviews, "There are no reviews")

'''
@router.get("/", response_description="Reviews retrieved")
async def get_reviews_data_by_title(title: str = ""):
    reviews = await get_reviews_by_title(title)
    if reviews:
        return ResponseModel(reviews, "Reviews retrieved successfully")
    return ResponseModel(reviews, "There are no reviews")
'''
@router.post("/", response_description="Review data added into the database")
async def add_review_data(review: Review = Body(...)):
    review = jsonable_encoder(review)
    new_review = await add_review(review)
    return ResponseModel(new_review, "Review added successfully.")

@router.put("/{id}", response_description="Review updated")
async def update_review_data(id: str, req: UpdatedReview = Body(...)):
    req = {k: v for k, v in req.model_dump().items() if v is not None}
    
    updated_review = await update_review(id, req)
    if updated_review:
        return ResponseModel(
            "Review with ID: {} updated successfully".format(id),
            "Review updated successfully",
        )
    
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error updating the review data.",
    )


@router.delete("/{id}", response_description="Review data deleted")
async def delete_review_data(id: str):
    result = await delete_review(id)
    if result:
        return ResponseModel(
            "Review with ID: {} deleted successfully".format(id),
            "Review deleted successfully"
        )
    return ErrorResponseModel(
        "An error occurred",
        404,
        "There was an error deleting the review data."
    )
    

