# from sqlalchemy import UUID, ForeignKey
# from sqlalchemy.orm import Mapped, mapped_column, relationship

# from ._base import BaseModel


# class Category(BaseModel):
#     __tablename__ = "category"
    
#     name: Mapped[str] = mapped_column(nullable=False)
#     is_parent: Mapped[bool] = mapped_column(nullable=False, default=False)
#     parent_id: Mapped[UUID | None] = mapped_column(
#         ForeignKey("category.id", ondelete="SET NULL"),
#         nullable=True,
#         default=None,)
    
#     perfume: Mapped[list["Perfume"]] = relationship(
#         back_populates="category",
#         secondary="perfume_category"
#         )