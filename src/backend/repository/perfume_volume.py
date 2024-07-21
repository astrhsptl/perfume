from core.models.perfume_volume import PerfumeVolume

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class PerfumeVolumeRepository(BaseSQLAlchemyRepository):
    model = PerfumeVolume