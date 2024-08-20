from uuid import UUID

from app.schemas.favourite import FavouriteCreate, FavouriteRead, FavouriteUpdate
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.favourite import FavouriteService
from fastapi import APIRouter, HTTPException, Request

favourite_router = APIRouter(prefix="/favourite", tags=["Favourite"])

service = FavouriteService()

@favourite_router.get("/get_all")
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

@favourite_router.get("/{id}", response_model=FavouriteRead)
async def get_by_id(id: UUID) -> FavouriteRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@favourite_router.post("/create", response_model=FavouriteRead, status_code=201)
async def create(data: FavouriteCreate) -> FavouriteRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@favourite_router.patch("/update/{id}", response_model=FavouriteRead)
async def update(id: UUID, data: FavouriteUpdate) -> FavouriteRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@favourite_router.delete("/delete/{id}", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data