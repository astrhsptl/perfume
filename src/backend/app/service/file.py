from repository.file import FileRepository

from app.schemas.file import FileRead

from ._base_service import BaseService


class FileService(BaseService):
    _repository = FileRepository()
    _serializer = FileRead