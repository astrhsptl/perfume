from ._base import BaseSchema
from datetime import datetime 
from uuid import UUID 
from core.models.perfume_volume import PossibleVolumes


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
    pass 