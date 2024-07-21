from datetime import datetime

from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class User(BaseModel):
    __tablename__ = "user"
    
    username: Mapped[str] = mapped_column(nullable=False, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    phone: Mapped[str] = mapped_column(nullable=False)
    address: Mapped[str] = mapped_column(nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    update_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    is_admin: Mapped[bool] = mapped_column(nullable=False, default=False)
    is_active: Mapped[bool] = mapped_column(nullable=False, default=True)
    
    cart: Mapped["Cart"] = relationship(
        back_populates="user",
        )
    
    
    perfume_volume: Mapped[list["PerfumeVolume"]] = relationship(
        back_populates="user",
        secondary="favourite",
        )
    
    perfume: Mapped[list["Perfume"]] = relationship(
        back_populates="user",
        secondary="favourite",
        )