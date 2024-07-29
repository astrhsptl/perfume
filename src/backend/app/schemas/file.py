from datetime import datetime
from uuid import UUID
from pydantic import Field
from ._base import BaseSchema


class FileBase(BaseSchema):
    perfume_id: UUID | None = Field(default=None)


class FileRead(FileBase):
    url: str
    id: UUID 
    create_time: datetime 


class FileCreate(FileBase):
    pass


class FileUpdate(FileBase):
    pass