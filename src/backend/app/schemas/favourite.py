from datetime import datetime
from uuid import UUID

from ._base import BaseSchema
from .perfume import PerfumeRead


class FavouriteBase(BaseSchema):
    perfume_id: UUID
    user_id: UUID


class FavouriteRead(FavouriteBase):
    id: UUID
    create_time: datetime


class FavouriteDepthRead(FavouriteRead):
    perfume: PerfumeRead


class FavouriteCreate(FavouriteBase):
    pass


class FavouriteUpdate(FavouriteBase):
    pass


class FavouriteToggle(BaseSchema):
    perfume_id: UUID
