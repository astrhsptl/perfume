from datetime import date, datetime
from uuid import UUID
from pydantic import BaseModel, Field
from ._base import BaseSchema


class CartBase(BaseSchema):
    status_id: UUID | None



class CartRead(CartBase):
    id: UUID
    user_id: UUID
    create_time: datetime 
    delivery_date: datetime | None
    buy_date: datetime | None 
    issue_date: datetime | None


class CartCreate(CartBase):
    user_id: UUID


class CartUpdate(CartBase):
    pass


class CartSearch(BaseModel):
    delivery_date: date | None = Field(default=None)
    buy_date: date | None = Field(default=None)
    issue_date: date | None = Field(default=None)
