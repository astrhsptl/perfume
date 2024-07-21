from repository.favourite import FavouriteRepository

from app.schemas.favourite import FavouriteRead

from ._base_service import BaseService


class FavouriteService(BaseService):
    _repository = FavouriteRepository()
    _serializer = FavouriteRead