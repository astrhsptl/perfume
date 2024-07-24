from repository.status import StatusRepository

from app.schemas.status import StatusRead, StatusDepthRead

from ._base_service import BaseService


class StatusService(BaseService):
    _repository = StatusRepository()
    _serializer = StatusRead
    _depth_serializer = StatusDepthRead