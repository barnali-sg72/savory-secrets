from typing import List, Optional

from pydantic import BaseModel, Field

class Author(BaseModel):
    username: str = Field(...)
    firstname: str = Field(...)
    lastname: str = Field(...)

class Instruction(BaseModel):
    number: int = Field(...)
    step: str = Field(...)

class Ingredient(BaseModel):
    name: str = Field(...)
    amount: float = Field(...)
    unit: str = Field(...)

class Recipe(BaseModel):
    #id: int = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    image: str = Field(...)
    description: str
    readyInMinutes: int
    servings: int
    dishTypes: List[str] = []
    author: Author
    isPublic: bool
    rating: float
    ingredients: List[Ingredient] = []
    instructions: List[Instruction] = []

class UpdatedInstruction(BaseModel):
    number: Optional[int]
    step: Optional[str]

class UpdatedIngredient(BaseModel):
    name: Optional[str]
    amount: Optional[float]
    unit: Optional[str]

class UpdatedAuthor(BaseModel):
    username: Optional[str]
    firstname: Optional[str]
    lastname: Optional[str]


class UpdatedRecipe(BaseModel):
    title: Optional[str]
    image: Optional[str]
    description: Optional[str]
    readyInMinutes: Optional[int]
    servings: Optional[int]
    dishTypes: List[str] = []
    author: Optional[UpdatedAuthor]
    isPublic: Optional[bool]
    rating: Optional[float]
    ingredients: List[UpdatedIngredient] = []
    instructions: List[UpdatedInstruction] = []

class UpdatedRecipeRating(BaseModel):
    rating: Optional[float]

