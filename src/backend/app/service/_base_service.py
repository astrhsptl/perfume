from math import ceil
from uuid import UUID

from fastapi import Request
from pydantic import create_model
from repository._base_repository import IBaseRepository

from app.schemas._base import BaseSchema
from app.schemas.response import ErrorResponse, PaginateBase, SuccessResponse


class BaseService():
    _repository: IBaseRepository
    _serializer: BaseSchema
    _depth_serializer: BaseSchema | None = None
    _depth_serializer_for_id: BaseSchema | None = None
    
    async def get_all(
        self,
        request: Request,
        page: int = 1,
        quantity: int = 50,
        order_by: str | None = None,
        **kwargs
    ) -> PaginateBase | ErrorResponse:
        result = await self._repository.get_all(page=page, 
                                                limit=quantity, 
                                                order_by=order_by, 
                                                **kwargs)
        
        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._paginate(
            request=request,
            count=len(result.data),
            data=result.data,
            page=page,
            quantity=quantity)

    async def get_by_id(self, id: str | UUID) -> BaseSchema | ErrorResponse:
        result = await self._repository.get_by_condition(id=id)
        
        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)
        
        if self._depth_serializer_for_id:
            return self._depth_serializer_for_id.model_validate(result.data)
        elif self._depth_serializer:
            return self._depth_serializer.model_validate(result.data)
        else:
            return self._serializer.model_validate(result.data)
    
    async def create(self, data: BaseSchema) -> BaseSchema | ErrorResponse:
        result = await self._repository.create(data=data)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._serializer.model_validate(result.data)
    
    async def update(self, id: str | UUID, data: BaseSchema) -> BaseSchema | ErrorResponse:
        result = await self._repository.update(id=id, data=data)
        
        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)
        
        return self._serializer.model_validate(result.data)
    
    async def delete(self, id: str | UUID) -> SuccessResponse | ErrorResponse:
        result = await self._repository.delete(id=id)
        
        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return SuccessResponse(detail=result.data)
    
    def _paginate(self, request: Request, count: int, data, page: int, quantity: int) -> PaginateBase:
        page = max(page, 1)
        url = request.url
        base_url = f"{url.scheme}://{url.netloc}{url.path}"
        next_page = (
            f"{base_url}?page={page + 1}&quantity={quantity}"
            if count > page * quantity
            else None
        )
        
        prev_page = (
            f"{base_url}?page={page - 1}&quantity={quantity}" if page > 1 else None
        )
        
        page = ceil(count / quantity)

        if self._depth_serializer:
            PaginateResponse = create_model("PaginateResponse", data=(list[self._depth_serializer], None), __base__=PaginateBase)
            return PaginateResponse(
            data=data, next_page=next_page, previous_page=prev_page, page=page
            )
        
        PaginateResponse = create_model("PaginateResponse", data=(list[self._serializer], None), __base__=PaginateBase)
        return PaginateResponse(
        data=data, next_page=next_page, previous_page=prev_page, page=page
        )



