from datetime import datetime
from uuid import UUID

from pydantic import Field

from ._base import BaseSchema


class CategoryBase(BaseSchema):
    name: str
    is_parent: bool 
    parent_id: UUID | None
    hidden: bool | None = Field(default=False)


class CategoryRead(CategoryBase):
    id: UUID 
    create_time: datetime 


class CategoryCreate(CategoryBase):
    pass 


class CategoryUpdate(CategoryBase):
    pass  