from uuid import UUID

from app.schemas.cart_perfume import (
    CartPerfumeCreate,
    CartPerfumeRead,
    CartPerfumeUpdate,
)
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.cart_perfume import CartPerfumeService
from fastapi import APIRouter, HTTPException, Request

cart_perfume_router = APIRouter(prefix="/cart-perfume", tags=["Cart Perfume"])

service = CartPerfumeService()

@cart_perfume_router.get("/get_all")
async def get_all(request: Request, 
                page: int = 1, 
                quantity: int = 50, 
                order_by: str | None = None):
    data = await service.get_all(request=request, 
                                page=page, 
                                quantity=quantity, 
                                order_by=order_by)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@cart_perfume_router.get("/{id}", response_model=CartPerfumeRead)
async def get_by_id(id: UUID) -> CartPerfumeRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@cart_perfume_router.post("/create", response_model=CartPerfumeRead, status_code=201)
async def create(data: CartPerfumeCreate) -> CartPerfumeRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@cart_perfume_router.patch("/update", response_model=CartPerfumeRead)
async def update(id: UUID, data: CartPerfumeUpdate) -> CartPerfumeRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@cart_perfume_router.delete("/delete", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data