
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class Brand(BaseModel):
    __tablename__ = "brand"
    
    title: Mapped[str] = mapped_column(nullable=False, unique=True)
    
    perfume: Mapped["Perfume"] = relationship(
        back_populates="brand",
        )