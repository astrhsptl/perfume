from core.models.brand import Brand
from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class BrandRepository(BaseSQLAlchemyRepository):
    model = Brand
    additional_tables = ["perfume"]
    soft_deletion = True