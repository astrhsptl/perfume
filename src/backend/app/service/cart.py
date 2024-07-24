from repository.cart import CartRepository

from app.schemas.cart import CartRead

from ._base_service import BaseService


class CartService(BaseService):
    _repository = CartRepository()
    _serializer = CartRead
