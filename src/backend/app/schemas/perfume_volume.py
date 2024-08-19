from ._base import BaseSchema
from datetime import datetime 
from uuid import UUID 
from enum import Enum
from pydantic import Field


class PossibleVolumes(Enum):
    small: int = 10
    middle: int = 20
    large: int = 30

class PerfumeVolumeBase(BaseSchema):
    volume: PossibleVolumes
    quantity: int 
    cost: float
    perfume_id: UUID 


class PerfumeVolumeRead(PerfumeVolumeBase):
    id: UUID 
    create_time: datetime 


class PerfumeVolumeCreate(PerfumeVolumeBase):
    pass 


class PerfumeVolumeUpdate(PerfumeVolumeBase):
    volume: PossibleVolumes | None = Field(default=None)
    quantity: int | None = Field(default=None)
    const: float | None = Field(default=None)
    perfume_id: UUID | None = Field(default=None)  