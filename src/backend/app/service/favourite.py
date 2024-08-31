from uuid import UUID

from pydantic import create_model
from repository.favourite import FavouriteRepository

from app.schemas.favourite import (
    FavouriteDepthRead,
    FavouriteRead,
    UserFavouriteDepthRead,
)
from app.schemas.response import ErrorResponse, PaginateBase

from ._base_service import BaseService


class FavouriteService(BaseService):
    _repository = FavouriteRepository()
    _depth_serializer = FavouriteDepthRead
    _serializer = FavouriteRead

    async def toggle(self, user_id: UUID, perfume_id: UUID):
        result = await self._repository.toggle(user_id=user_id, perfume_id=perfume_id)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return result

    async def user_favorites(
        self, request, user_id: UUID, page_num: int, quantity: int
    ):
        result = await self._repository.get_user_favorites(user_id, page_num, quantity)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        page, next_page, prev_page = self._paginate_data(
            request, len(result.data), page_num, quantity
        )

        PaginateResponse = create_model(
            "PaginateResponse",
            data=(list[UserFavouriteDepthRead], None),
            __base__=PaginateBase,
        )
        return PaginateResponse(
            data=result.data, next_page=next_page, previous_page=prev_page, page=page
        )
