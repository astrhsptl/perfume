from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from ._base import BaseModel


class PerfumeCategory(BaseModel):
    __tablename__ = "perfume_category"

    perfume_id: Mapped[UUID] = mapped_column(
        ForeignKey("perfume.id", ondelete="CASCADE"),
        primary_key=True)
    
    category_id: Mapped[UUID] = mapped_column(
        ForeignKey("category.id", ondelete="CASCADE"),
        primary_key=True)