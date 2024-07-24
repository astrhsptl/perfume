from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class File(BaseModel):
    __tablename__ = "file"

    url: Mapped[str] = mapped_column(unique=True, nullable=False)
    
    perfume_id: Mapped[UUID] = mapped_column(
        ForeignKey("perfume.id", ondelete="SET NULL"),
        nullable=True,
        default=None,)
    
    perfume: Mapped[list["Perfume"]] = relationship(
        back_populates="file",
        )  