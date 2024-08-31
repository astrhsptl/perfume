from repository.favourite import FavouriteRepository

from app.schemas.favourite import FavouriteDepthRead, FavouriteRead
from app.schemas.response import ErrorResponse

from ._base_service import BaseService


class FavouriteService(BaseService):
    _repository = FavouriteRepository()
    _depth_serializer = FavouriteDepthRead
    _serializer = FavouriteRead

    async def toggle(self, user_id: str, perfume_id: str):
        result = await self._repository.toggle(user_id=user_id, perfume_id=perfume_id)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return result
