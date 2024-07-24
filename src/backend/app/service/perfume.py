
from repository.perfume import PerfumeRepository

from app.schemas.perfume import PerfumeRead, PerfumeDepthRead, PerfumeDepthForIdRead

from ._base_service import BaseService


class PerfumeService(BaseService):
    _repository = PerfumeRepository()
    _serializer = PerfumeRead
    _depth_serializer = PerfumeDepthRead
    _depth_serializer_for_id = PerfumeDepthForIdRead
    # _serializer_on_id = PerfumeDepthOnID
    
    # async def get_by_id(self, id: str | UUID) -> BaseSchema | ErrorResponse:
    #     result = await self._repository.get_by_condition(id=id)
        
    #     if hasattr(result, "detail"):
    #         return ErrorResponse(detail=result.detail, status_code=result.status_code)
    #     print(result.data.perfume_volume)
    #     print(result.data.file)
    #     return self._serializer_on_id.model_validate(result.data)