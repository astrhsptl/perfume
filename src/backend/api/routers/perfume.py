from typing import Annotated
from uuid import UUID

from app.schemas.perfume import (
    PerfumeCreate,
    PerfumeDepthOnID,
    PerfumeRead,
    PerfumeSearch,
    PerfumeUpdate,
    PerfumeVolumeSearch,
)
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.perfume import PerfumeService
from fastapi import APIRouter, Depends, HTTPException, Request

perfume_router = APIRouter(prefix="/perfume", tags=["Perfume"])

service = PerfumeService()


@perfume_router.get("/get_all")
async def get_all(
    request: Request,
    page: int = 1,
    quantity: int = 50,
    order_by: str | None = None,
    search_field: Annotated[PerfumeSearch, Depends()] = None,
    search_volume: Annotated[PerfumeVolumeSearch, Depends()] = None,
):
    data = await service.get_all(
        request=request,
        page=page,
        quantity=quantity,
        order_by=order_by,
        search_fields=search_field.model_dump(exclude_none=True),
        search_volume=search_volume.model_dump(exclude_none=True),
    )

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@perfume_router.get("/{id}", response_model=PerfumeDepthOnID)
async def get_by_id(id: UUID) -> PerfumeDepthOnID:
    data = await service.get_by_id(id=id)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@perfume_router.post("/create", response_model=PerfumeRead, status_code=201)
async def create(data: PerfumeCreate) -> PerfumeRead:
    data = await service.create(data=data)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@perfume_router.patch("/update/{id}", response_model=PerfumeRead)
async def update(id: UUID, data: PerfumeUpdate) -> PerfumeRead:
    data = await service.update(id=id, data=data)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@perfume_router.delete("/delete/{id}", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data
