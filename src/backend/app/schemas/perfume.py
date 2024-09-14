from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, Field

from ._base import BaseSchema
from .file import FileRead
from .perfume_volume import PerfumeVolumeRead


class SexPossible(Enum):
    man = "Мужской"
    woman = "Женский"
    universal = "Унисекс"


class PerfumeBase(BaseSchema):
    name: str
    description: str | None
    sex: SexPossible
    aroma: str
    hidden: bool = Field(default=False)
    perfume_type_id: UUID | None
    brand_id: UUID | None


class PerfumeRead(PerfumeBase):
    id: UUID
    create_time: datetime


class PerfumeDepthRead(PerfumeRead):
    file: list[FileRead] | None


class PerfumeDepthForIdRead(PerfumeDepthRead):
    perfume_volume: list[PerfumeVolumeRead]


class PerfumeDepthOnID(PerfumeDepthRead):
    perfume_volume: list[PerfumeVolumeRead] | None


class PerfumeCreate(PerfumeBase):
    pass


class PerfumeUpdate(BaseModel):
    name: str | None = Field(default=False)
    description: str | None = Field(default=False)
    sex: SexPossible | None = Field(default=False)
    aroma: str | None = Field(default=False)
    hidden: bool = Field(default=False)
    perfume_type_id: UUID | None = Field(default=False)
    brand_id: UUID | None = Field(default=False)


class PerfumeSearch(BaseSchema):
    name: str | None = Field(default=None)
    description: str | None = Field(default=None)
    sex: SexPossible | None = Field(default=None)
    aroma: str | None = Field(default=None)
    hidden: bool | None = Field(default=None)
    perfume_type_id: UUID | None = Field(default=None)
    brand_id: UUID | None = Field(default=None)
    hidden: bool | None = Field(default=None)


class PerfumeVolumeSearch(BaseSchema):
    cost_to: float | None = Field(default=None)
    cost_from: float | None = Field(default=None)
