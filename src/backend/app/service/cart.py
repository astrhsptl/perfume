from repository.cart import CartRepository

from app.schemas.cart import CartRead
from app.schemas.response import ErrorResponse, SuccessResponse

from ._base_service import BaseService


class CartService(BaseService):
    _repository = CartRepository()
    _serializer = CartRead

    async def close(self, cart_id) -> SuccessResponse | ErrorResponse:
        result = await self._repository.close(cart_id=cart_id)
        
        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)
        
        return SuccessResponse(detail=result.data, status_code=200)