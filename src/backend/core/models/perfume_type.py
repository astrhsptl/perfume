from sqlalchemy.orm import Mapped, mapped_column, relationship

from ._base import BaseModel


class PerfumeType(BaseModel):
    __tablename__ = "perfume_type"
    
    name: Mapped[str] = mapped_column(nullable=False)
    
    perfume: Mapped[list["Perfume"]] = relationship(
        back_populates="perfume_type",
        )