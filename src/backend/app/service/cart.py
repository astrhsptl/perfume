from repository.cart import CartRepository

from app.schemas.cart import CartDepthRead, CartRead

from ._base_service import BaseService


class CartService(BaseService):
    _repository = CartRepository()
    _serializer = CartRead
    _depth_serializer = CartDepthRead