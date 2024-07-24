from datetime import datetime

from sqlalchemy import UUID, ForeignKey, event
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class Cart(BaseModel):
    __tablename__ = "cart"
    
    issue_date: Mapped[datetime | None] = mapped_column(default=None, nullable=True)
    delivery_date: Mapped[datetime | None] = mapped_column(default=None, nullable=True)
    buy_date: Mapped[datetime | None] = mapped_column(default=None, nullable=True)
    user_id: Mapped[UUID | None] = mapped_column(ForeignKey("user.id", ondelete="SET NULL"), nullable=True)
    
    status_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("status.id", ondelete="CASCADE"), 
        nullable=True, default=None)
    
    user: Mapped["User"] = relationship(
        back_populates="cart",
        )
    
    perfume_volume: Mapped[list["PerfumeVolume"]] = relationship(
        back_populates="cart",
        secondary="cart_perfume"
        )
    
    status: Mapped["Status"] = relationship(
        back_populates="cart",
    )

    cart_perfume: Mapped[list["CartPerfume"]] = relationship(
        viewonly=True,
        back_populates="cart",
        )


@event.listens_for(Cart.status_id, "modified")
def receive_modified(target, initiator):
    print(target, "penis")
    if target.status.title == "В пути":
        target.issue_date = datetime.now()
    elif target.status.title == "Готов к выдаче":
        target.delivery_date = datetime.now()
    elif target.status.title == "Завершен":
        target.buy_date = datetime.now()
    else:
        pass

