from datetime import datetime
from uuid import UUID
from .perfume import PerfumeRead
from pydantic import BaseModel, Field
from ._base import BaseSchema


class PerfumeTypeBase(BaseSchema):
    name: str


class PerfumeTypeRead(PerfumeTypeBase):
    id: UUID 
    create_time: datetime 

class PerfumeDepthRead(PerfumeTypeRead):
    perfume: list[PerfumeRead]

class PerfumeTypeCreate(PerfumeTypeBase):
    pass 


class PerfumeTypeUpdate(PerfumeTypeBase):
    pass  


class PerfumeTypeSearch(BaseModel):
    name: str | None = Field(default=None)