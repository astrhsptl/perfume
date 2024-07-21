from core.models.file import File

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class FileRepository(BaseSQLAlchemyRepository):
    model = File