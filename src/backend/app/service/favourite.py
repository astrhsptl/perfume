from repository.favourite import FavouriteRepository

from app.schemas.favourite import FavouriteRead, FavouriteDepthRead

from ._base_service import BaseService


class FavouriteService(BaseService):
    _repository = FavouriteRepository()
    _depth_serializer = FavouriteDepthRead
    _serializer = FavouriteRead