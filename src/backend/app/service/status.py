from repository.status import StatusRepository

from app.schemas.status import StatusRead

from ._base_service import BaseService


class StatusService(BaseService):
    _repository = StatusRepository()
    _serializer = StatusRead