from ._base import BaseSchema
from datetime import datetime 
from uuid import UUID 


class PerfumeCategoryBase(BaseSchema):
    perfume_id: UUID 
    category_id: UUID 


class PerfumeCategoryRead(PerfumeCategoryBase):
    id: UUID 
    create_time: datetime


class PerfumeCategoryCreate(PerfumeCategoryBase):
    pass


class PerfumeCategoryUpdate(PerfumeCategoryBase):
    pass