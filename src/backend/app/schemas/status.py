from datetime import datetime
from uuid import UUID
from .cart import CartRead
from pydantic import Field, BaseModel
from ._base import BaseSchema


class StatusBase(BaseSchema):
    title: str
    description: str
    hidden: bool | None = Field(default=False)

class StatusRead(StatusBase):
    id: UUID
    create_time: datetime 


class StatusDepthRead(StatusRead):
    cart: list[CartRead] | None


class StatusCreate(StatusBase):
    pass


class StatusUpdate(BaseModel):
    title: str | None = Field(default=None)
    description: str | None = Field(default=None)
    hidden: bool | None = Field(default=False)


class StatusSearch(BaseModel):
    title: str | None = Field(default=None)
    description: str | None = Field(default=None)
    hidden: bool | None = Field(default=None) 