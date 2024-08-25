from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field

from ._base import BaseSchema


class PerfumeVolumeBase(BaseSchema):
    volume: int
    quantity: int 
    cost: float
    perfume_id: UUID 


class PerfumeVolumeRead(PerfumeVolumeBase):
    id: UUID 
    create_time: datetime 


class PerfumeVolumeCreate(PerfumeVolumeBase):
    pass 


class PerfumeVolumeUpdate(BaseModel):
    volume: int | None = Field(default=None)
    quantity: int | None = Field(default=None)
    cost: float | None = Field(default=None)
    perfume_id: UUID | None = Field(default=None)  
