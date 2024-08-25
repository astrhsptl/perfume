from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, Field

from ._base import BaseSchema
from .perfume_volume import PerfumeVolumeRead


class CartBase(BaseSchema):
    status_id: UUID | None

class StatusRead(BaseSchema):
    id: UUID
    create_time: datetime 
    title: str
    description: str
    hidden: bool | None = Field(default=False)

class CartRead(CartBase):
    id: UUID
    user_id: UUID
    create_time: datetime 
    delivery_date: datetime | None
    buy_date: datetime | None
    issue_date: datetime | None
    perfume_volume: list[PerfumeVolumeRead] | None
    status: StatusRead | None


class CartCreate(CartBase):
    user_id: UUID


class CartUpdate(CartBase):
    pass


class CartSearch(BaseModel):
    delivery_date: date | None = Field(default=None)
    buy_date: date | None = Field(default=None)
    issue_date: date | None = Field(default=None)
    hidden: bool | None = Field(default=None)
