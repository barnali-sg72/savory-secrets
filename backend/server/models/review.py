from typing import Optional
from pydantic import BaseModel, Field

class Review(BaseModel):
    recipeId: str = Field(...)
    recipeTitle: str = Field(...)
    userId: str = Field(...)
    userName: str = Field(...)
    date: str = Field(...)
    rate: int = Field(...)
    comment: str = Field(...)

class UpdatedReview(BaseModel):
    recipeId: Optional[str]
    recipeTitle: Optional[str]
    userId: Optional[str]
    userName: Optional[str]
    date: Optional[str]
    rate: Optional[str] 
    comment: Optional[str]