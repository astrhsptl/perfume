from core.models.status import Status
from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class StatusRepository(BaseSQLAlchemyRepository):
    model = Status
    additional_tables = ["cart"]
    soft_deletion = True