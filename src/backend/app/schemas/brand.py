from datetime import datetime
from uuid import UUID
from .perfume import PerfumeRead
from pydantic import BaseModel, Field
from ._base import BaseSchema


class BrandBase(BaseSchema):
    title: str


class BrandRead(BrandBase):
    id: UUID 
    create_time: datetime 


class BrandDepthRead(BrandRead):
    perfume: list[PerfumeRead]


class BrandCreate(BrandBase):
    pass 


class BrandUpdate(BrandBase):
    pass  


class BrandSearch(BaseModel):
    title: str | None = Field(default=None)