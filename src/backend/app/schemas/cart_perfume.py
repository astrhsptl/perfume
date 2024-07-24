from datetime import datetime
from uuid import UUID
from .cart import CartRead
from .perfume_volume import PerfumeVolumeRead
from ._base import BaseSchema
from pydantic import BaseModel, Field

class CartPerfumeBase(BaseSchema):
    quantity: int
    perfume_volume_id: UUID
    cart_id: UUID


class CartPerfumeRead(CartPerfumeBase):
    id: UUID
    create_time: datetime


class CartPerfumeDepthRead(CartPerfumeRead):
    perfume_volume: PerfumeVolumeRead
    cart: CartRead


class CartPerfumeCreate(CartPerfumeBase):
    pass 


class CartPerfumeUpdate(BaseModel):
    quantity: int | None = Field(default=None)
    perfume_volume_id: UUID | None = Field(default=None)
    cart_id: UUID | None = Field(default=None)
