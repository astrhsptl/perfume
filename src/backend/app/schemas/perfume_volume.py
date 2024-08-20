from ._base import BaseSchema
from datetime import datetime 
from uuid import UUID 
from enum import Enum
from pydantic import Field


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


class PerfumeVolumeUpdate(PerfumeVolumeBase):
    volume: int | None = Field(default=None)
    quantity: int | None = Field(default=None)
    const: float | None = Field(default=None)
    perfume_id: UUID | None = Field(default=None)  