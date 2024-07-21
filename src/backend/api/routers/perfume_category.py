from uuid import UUID

from app.schemas.perfume_category import (
    PerfumeCategoryCreate,
    PerfumeCategoryRead,
    PerfumeCategoryUpdate,
)
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.perfume_category import PerfumeCategoryService
from fastapi import APIRouter, HTTPException, Request

perfume_category_router = APIRouter(prefix="/perfume_category", tags=["Perfume Category"])

service = PerfumeCategoryService()

@perfume_category_router.get("/get_all")
async def get_all(request: Request, page: int = 1, quantity: int = 50, order_by: str | None = None):
    data = await service.get_all(request=request, page=page, quantity=quantity, order_by=order_by)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_category_router.get("/get_by_condition", response_model=PerfumeCategoryRead)
async def get_by_id(id: UUID) -> PerfumeCategoryRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_category_router.post("/create", response_model=PerfumeCategoryRead, status_code=201)
async def create(data: PerfumeCategoryCreate) -> PerfumeCategoryRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_category_router.post("/update", response_model=PerfumeCategoryRead)
async def update(id: UUID, data: PerfumeCategoryUpdate) -> PerfumeCategoryRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_category_router.post("/delete", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data