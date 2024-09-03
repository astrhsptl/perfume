from uuid import UUID

from pydantic import create_model
from repository.cart import CartRepository

from app.schemas._base import BaseSchema
from app.schemas.cart import CartAdminRead, CartRead, CartReadBase
from app.schemas.response import ErrorResponse, PaginateBase, SuccessResponse

from ._base_service import BaseService


class CartService(BaseService):
    _repository = CartRepository()
    _serializer = CartRead
    _base_serializer = CartReadBase

    async def close(self, cart_id) -> SuccessResponse | ErrorResponse:
        result = await self._repository.close(cart_id=cart_id)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return SuccessResponse(detail=result.data, status_code=200)

    async def create(self, data: BaseSchema, **kwargs) -> BaseSchema | ErrorResponse:
        result = await self._repository.create(data=data)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._base_serializer.model_validate(result.data)

    async def admin_list(
        self,
        request,
        page_num: int,
        quantity: int,
        order_by: str | None = None,
        **kwargs,
    ):
        result = await self._repository.admin_list(
            page_num, quantity, order_by, **kwargs
        )

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        page, next_page, prev_page = self._paginate_data(
            request, len(result.data), page_num, quantity
        )

        PaginateResponse = create_model(
            "PaginateResponse",
            data=(list[CartAdminRead], None),
            __base__=PaginateBase,
        )
        return PaginateResponse(
            data=result.data, next_page=next_page, previous_page=prev_page, page=page
        )

    async def admin_once(self, cart_id: UUID):
        result = await self._repository.admin_once(cart_id)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return CartAdminRead.model_validate(result.data)
