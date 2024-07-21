from datetime import datetime
from uuid import UUID

from pydantic import EmailStr

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


class UserCreate(UserBase):
    password: str


class UserUpdate(UserBase):
    password: str