from datetime import datetime
from uuid import UUID

from ._base import BaseSchema


class FileBase(BaseSchema):
    url: str
    perfume_id: UUID | None


class FileRead(FileBase):
    id: UUID 
    create_time: datetime 


class FileCreate(FileBase):
    pass


class FileUpdate(FileBase):
    pass