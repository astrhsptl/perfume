from datetime import datetime
from uuid import UUID
from .cart import CartRead
from pydantic import EmailStr, BaseModel, Field
from ._base import BaseSchema


class UserBase(BaseSchema):
    username: str
    email: EmailStr
    phone: str
    address: str


class UserRead(UserBase):
    id: UUID 
    is_active: bool
    create_time: datetime
    update_time: datetime


class UserDepthRead(UserRead):
    carts: list[CartRead]


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    username: str | None = Field(default=None)
    email: EmailStr | None = Field(default=None)
    phone: str | None = Field(default=None)
    address: str | None = Field(default=None)


class UserSearch(BaseModel):
    username: str | None = Field(default=None)
    email: EmailStr | None = Field(default=None)
    phone: str | None  = Field(default=None)
    address: str | None = Field(default=None)