from datetime import datetime
from uuid import UUID

from ._base import BaseSchema
from .status import StatusRead


class CartBase(BaseSchema):
    status_id: UUID | None
    user_id: UUID


class CartRead(CartBase):
    id: UUID
    create_time: datetime 
    delivery_date: datetime | None
    buy_date: datetime | None 
    issue_date: datetime | None


class CartDepthRead(CartRead):
    status: StatusRead | None


class CartCreate(CartBase):
    pass


class CartUpdate(CartBase):
    pass