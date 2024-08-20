from uuid import UUID
from typing import Annotated
from app.schemas.perfume_type import PerfumeTypeCreate, PerfumeTypeRead, PerfumeTypeUpdate, PerfumeDepthRead, PerfumeTypeSearch
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.perfume_type import PerfumeTypeService
from fastapi import APIRouter, HTTPException, Request, Depends

perfume_type_router = APIRouter(prefix="/perfume-type", tags=["Perfume Type"])

service = PerfumeTypeService()

@perfume_type_router.get("/get_all")
async def get_all(request: Request, 
                page: int = 1, 
                quantity: int = 50, 
                order_by: str | None = None,
                search_field: Annotated[PerfumeTypeSearch, Depends()] = None):
    data = await service.get_all(request=request, 
                                page=page, 
                                quantity=quantity, 
                                order_by=order_by,
                                search_fields=search_field.model_dump(exclude_none=True))
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_type_router.get("/{id}", response_model=PerfumeDepthRead)
async def get_by_id(id: UUID) -> PerfumeDepthRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_type_router.post("/create", response_model=PerfumeTypeRead, status_code=201)
async def create(data: PerfumeTypeCreate) -> PerfumeTypeRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_type_router.patch("/update/{id}", response_model=PerfumeTypeRead)
async def update(id: UUID, data: PerfumeTypeUpdate) -> PerfumeTypeRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_type_router.delete("/delete/{id}", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data