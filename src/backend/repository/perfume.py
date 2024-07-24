from core.models.perfume import Perfume
from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class PerfumeRepository(BaseSQLAlchemyRepository):
    model = Perfume
    additional_tables = ['file', 'perfume_volume']
    soft_deletion = True