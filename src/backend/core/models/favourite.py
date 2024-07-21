from sqlalchemy import UUID, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from ._base import BaseModel


class Favourite(BaseModel):
    __tablename__ = "favourite"
    
    perfume_id: Mapped[UUID] = mapped_column(
        ForeignKey("perfume.id", ondelete="CASCADE"),
        primary_key=True)
    
    user_id: Mapped[UUID] = mapped_column(
        ForeignKey("user.id", ondelete="CASCADE"),
        primary_key=True)
    
