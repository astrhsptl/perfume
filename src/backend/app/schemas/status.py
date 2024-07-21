from datetime import datetime
from uuid import UUID

from pydantic import Field

from ._base import BaseSchema


class StatusBase(BaseSchema):
    title: str
    description: str
    hidden: bool | None = Field(default=False)

class StatusRead(StatusBase):
    id: UUID
    create_time: datetime 


class StatusCreate(StatusBase):
    pass


class StatusUpdate(StatusBase):
    pass