from core.models.perfume_type import PerfumeType
from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class PerfumeTypeRepository(BaseSQLAlchemyRepository):
    model = PerfumeType
    additional_tables = ["perfume"]
    soft_deletion = True
