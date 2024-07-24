from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class Perfume(BaseModel):
    __tablename__ = "perfume"
    name: Mapped[str] = mapped_column(nullable=False, unique=True)
    description: Mapped[str | None] = mapped_column(nullable=True, default=None)
    aroma: Mapped[str] = mapped_column(nullable=False)
    sex: Mapped[str] = mapped_column(nullable=False)
    
    brand_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("brand.id", ondelete="SET NULL"),
        nullable=True,
        default=None,)
    
    perfume_type_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("perfume_type.id", ondelete="SET NULL"),
        nullable=True,
        default=None,)
    
    perfume_volume: Mapped[list["PerfumeVolume"]] = relationship(
        back_populates="perfume"
        )
    
    file: Mapped[list["File"]] = relationship(
        back_populates="perfume",
    )

    brand: Mapped["Brand"] = relationship(
        back_populates="perfume",
        )

    perfume_type: Mapped["PerfumeType"] = relationship(
        back_populates="perfume",
        )
    
    user: Mapped[list["User"]] = relationship(
        back_populates="perfume",
        secondary="favourite",
        )
    
    favourite: Mapped[list["Favourite"]] = relationship(
        viewonly=True,
        back_populates="perfume",
    )