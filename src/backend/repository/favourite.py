from core.models.favourite import Favourite

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class FavouriteRepository(BaseSQLAlchemyRepository):
    model = Favourite