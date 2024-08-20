from uuid import UUID

from app.schemas.perfume_volume import (
    PerfumeVolumeCreate,
    PerfumeVolumeRead,
    PerfumeVolumeUpdate,
)
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.perfume_volume import PerfumeVolumeService
from fastapi import APIRouter, HTTPException, Request


perfume_volume_router = APIRouter(prefix="/perfume-volume", tags=["Perfume Volume"])

service = PerfumeVolumeService()

@perfume_volume_router.get("/get_all")
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

@perfume_volume_router.get("/{id}", response_model=PerfumeVolumeRead)
async def get_by_id(id: UUID) -> PerfumeVolumeRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_volume_router.post("/create", response_model=PerfumeVolumeRead, status_code=201)
async def create(data: PerfumeVolumeCreate) -> PerfumeVolumeRead:
    data = await service.create(data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_volume_router.patch("/update/{id}", response_model=PerfumeVolumeRead)
async def update(id: UUID, data: PerfumeVolumeUpdate) -> PerfumeVolumeRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@perfume_volume_router.delete("/delete/{id}", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data