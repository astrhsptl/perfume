from core.models.cart_perfume import CartPerfume

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class CartPerfumeRepository(BaseSQLAlchemyRepository):
    model = CartPerfume