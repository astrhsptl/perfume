from repository.perfume_volume import PerfumeVolumeRepository

from app.schemas.perfume_volume import PerfumeVolumeRead

from ._base_service import BaseService


class PerfumeVolumeService(BaseService):
    _repository = PerfumeVolumeRepository()
    _serializer = PerfumeVolumeRead