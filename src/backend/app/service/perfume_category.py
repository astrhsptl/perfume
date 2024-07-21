from repository.perfume_category import PerfumeCategoryRepository

from app.schemas.perfume_category import PerfumeCategoryRead

from ._base_service import BaseService


class PerfumeCategoryService(BaseService):
    _repository = PerfumeCategoryRepository()
    _serializer = PerfumeCategoryRead