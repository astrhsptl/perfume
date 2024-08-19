from uuid import UUID
from typing import Annotated
from app.schemas.brand import BrandCreate, BrandRead, BrandUpdate, BrandSearch
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.brand import BrandService
from fastapi import APIRouter, HTTPException, Request, Depends


brand_router = APIRouter(prefix="/brand", tags=["Brand"])

service = BrandService()

@brand_router.get("/get_all")
async def get_all(request: Request, 
                page: int = 1, 
                quantity: int = 50, 
                order_by: str | None = None,
                search_field: Annotated[BrandSearch, Depends()] = None):
    data = await service.get_all(request=request, 
                                page=page, 
                                quantity=quantity, 
                                order_by=order_by,
                                search_fields=search_field.model_dump(exclude_none=True))
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@brand_router.get("/{id}", response_model=BrandRead)
async def get_by_id(id: UUID) -> BrandRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@brand_router.post("/create", response_model=BrandRead, status_code=201)
async def create(data: BrandCreate) -> BrandRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@brand_router.patch("/update", response_model=BrandRead)
async def update(id: UUID, data: BrandUpdate) -> BrandRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@brand_router.post("/delete", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data