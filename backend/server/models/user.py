from typing import Optional
from pydantic import BaseModel, Field

class User(BaseModel):
    firstname: str = Field(...)
    lastname: str = Field(...)
    username: str = Field(...)
    password: str = Field(...)
    email: str 
    phone: str

class UpdatedUser(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]
    username: Optional[str]
    password: Optional[str]
    email: Optional[str] 
    phone: Optional[str]

class AuthUser(BaseModel):
    username: bytes
    password: bytes