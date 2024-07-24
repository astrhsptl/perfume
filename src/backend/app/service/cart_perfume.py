from repository.cart_perfume import CartPerfumeRepository

from app.schemas.cart_perfume import CartPerfumeRead, CartPerfumeDepthRead

from ._base_service import BaseService


class CartPerfumeService(BaseService):
    _repository = CartPerfumeRepository()
    _serializer = CartPerfumeRead
    _depth_serializer = CartPerfumeDepthRead