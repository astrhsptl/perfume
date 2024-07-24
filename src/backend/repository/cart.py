from uuid import UUID

from core.database import SESSION
from core.models.cart import Cart
from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class CartRepository(BaseSQLAlchemyRepository):
    model = Cart
    additional_tables = ["perfume_volume", "status"]
    soft_deletion = True