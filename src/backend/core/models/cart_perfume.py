from sqlalchemy import UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from ._base import BaseModel


class CartPerfume(BaseModel):
    __tablename__ = "cart_perfume"
    
    quantity: Mapped[int] = mapped_column(nullable=False)
    
    perfume_volume_id: Mapped[UUID] = mapped_column(ForeignKey("perfume_volume.id", ondelete="CASCADE"), nullable=False)
    cart_id: Mapped[UUID] = mapped_column(
        ForeignKey("cart.id", ondelete="CASCADE"), 
        nullable=False)