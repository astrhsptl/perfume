from datetime import datetime
from uuid import UUID

from ._base import BaseSchema


class CartPerfumeBase(BaseSchema):
    quantity: int
    perfume_volume_id: UUID
    cart_id: UUID


class CartPerfumeRead(CartPerfumeBase):
    id: UUID
    create_time: datetime


class CartPerfumeCreate(CartPerfumeBase):
    pass 


class CartPerfumeUpdate(CartPerfumeBase):
    pass
