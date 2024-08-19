from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class PerfumeVolume(BaseModel):
    __tablename__ = "perfume_volume"
    
    volume: Mapped[int] = mapped_column(nullable=False)
    quantity: Mapped[int] = mapped_column(nullable=False, default=0)
    cost: Mapped[float] = mapped_column(nullable=False, default=0)
    perfume_id: Mapped[UUID] = mapped_column(ForeignKey("perfume.id", ondelete="SET NULL"), nullable=False)

    perfume: Mapped["Perfume"] = relationship(
        back_populates="perfume_volume"
        )
    
    cart: Mapped[list["Cart"]] = relationship(
        back_populates="perfume_volume",
        secondary="cart_perfume"
        )
    
    cart_perfume: Mapped["CartPerfume"] = relationship(
        viewonly=True,
        back_populates="perfume_volume",
        )