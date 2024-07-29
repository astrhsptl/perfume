from ._base import BaseSchema
from datetime import datetime 
from uuid import UUID 
from enum import Enum
from pydantic import Field


class PossibleVolumes(Enum):
    small: int = 10
    middle: int = 20
    large: int = 30

class PerfumeValumeBase(BaseSchema):
    volume: PossibleVolumes
    quantity: int 
    const: float
    perfume_id: UUID 


class PerfumeVolumeRead(PerfumeValumeBase):
    id: UUID 
    create_time: datetime 


class PerfumeVolumeCreate(PerfumeValumeBase):
    pass 


class PerfumeVolumeUpdate(PerfumeValumeBase):
    volume: PossibleVolumes | None = Field(default=None)
    quantity: int | None = Field(default=None)
    const: float | None = Field(default=None)
    perfume_id: UUID | None = Field(default=None)  