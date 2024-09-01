from datetime import datetime
from uuid import UUID

from app.schemas.response import PaginateBase

from ._base import BaseSchema
from .perfume import PerfumeDepthForIdRead, PerfumeRead


class FavouriteBase(BaseSchema):
    perfume_id: UUID
    user_id: UUID


class FavouriteRead(FavouriteBase):
    id: UUID
    create_time: datetime


class FavouriteDepthRead(FavouriteRead):
    perfume: PerfumeRead


class UserFavouriteDepthRead(FavouriteRead):
    perfume: PerfumeDepthForIdRead


class FavouriteCreate(FavouriteBase):
    pass


class FavouriteUpdate(FavouriteBase):
    pass


class FavouriteToggle(BaseSchema):
    perfume_id: UUID


class UserFavoritePaginated(PaginateBase):
    data: list[UserFavouriteDepthRead]
