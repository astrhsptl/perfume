from repository.cart_perfume import CartPerfumeRepository

from app.schemas.cart_perfume import CartPerfumeRead

from ._base_service import BaseService


class CartPerfumeService(BaseService):
    _repository = CartPerfumeRepository()
    _serializer = CartPerfumeRead