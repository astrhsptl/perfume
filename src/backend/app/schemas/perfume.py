from datetime import datetime
from uuid import UUID

from pydantic import Field

from ._base import BaseSchema
from .file import FileRead
from .perfume_volume import PerfumeVolumeRead


class PerfumeBase(BaseSchema):
    name: str
    description: str | None
    hidden: bool | None = Field(default=False)


class PerfumeRead(PerfumeBase):
    id: UUID 
    create_time: datetime


class PerfumeDepthRead(PerfumeRead):
    file: list[FileRead] | None


class PerfumeDepthOnID(PerfumeDepthRead):
    perfume_volume: list[PerfumeVolumeRead] | None


class PerfumeCreate(PerfumeBase):
    pass


class PerfumeUpdate(PerfumeBase):
    pass
