from datetime import datetime
from uuid import UUID
from .perfume import PerfumeRead
from ._base import BaseSchema


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