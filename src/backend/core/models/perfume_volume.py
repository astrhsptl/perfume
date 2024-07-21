from enum import Enum
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class PossibleVolumes(Enum):
    small = 10
    middle = 20
    large = 30


class PerfumeVolume(BaseModel):
    __tablename__ = "perfume_volume"
    
    volume: Mapped[PossibleVolumes] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False, default=0)
    const: Mapped[float] = mapped_column(nullable=False, default=0)
    perfume_id: Mapped[UUID] = mapped_column(ForeignKey("perfume.id", ondelete="SET NULL"), nullable=False)

    perfume: Mapped["Perfume"] = relationship(
        back_populates="perfume_volume"
        )
    
    cart: Mapped["Cart"] = relationship(
        back_populates="volume",
        secondary="cart_perfume"
        )
    