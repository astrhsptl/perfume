from datetime import datetime
from uuid import UUID

from ._base import BaseSchema


class FavouriteBase(BaseSchema):
    perfume_volume_id: UUID 
    user_id: UUID 


class FavouriteRead(FavouriteBase):
    id: UUID 
    create_time: datetime 


class FavouriteCreate(FavouriteBase):
    pass 


class FavouriteUpdate(FavouriteBase):
    pass