from repository.brand import BrandRepository

from app.schemas.brand import BrandRead, BrandDepthRead

from ._base_service import BaseService


class BrandService(BaseService):
    _repository = BrandRepository()
    _serializer = BrandRead
    _depth_serializer = BrandDepthRead