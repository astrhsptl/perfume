from repository.perfume_type import PerfumeTypeRepository

from app.schemas.perfume_type import PerfumeTypeRead, PerfumeDepthRead

from ._base_service import BaseService


class PerfumeTypeService(BaseService):
    _repository = PerfumeTypeRepository()
    _serializer = PerfumeTypeRead
    _depth_serializer = PerfumeDepthRead
