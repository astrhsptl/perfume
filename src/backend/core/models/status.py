from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class Status(BaseModel):
    __tablename__ = "status"
    
    title: Mapped[str] = mapped_column(nullable=False, unique=True)
    description: Mapped[str] = mapped_column(nullable=False)

    cart: Mapped[list["Cart"]] = relationship(
        back_populates="status",
    )