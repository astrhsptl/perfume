from typing import Annotated
from uuid import UUID

from app.schemas.cart import (
    CartCreate,
    CartRead,
    CartReadBase,
    CartSearch,
    CartUpdate,
)
from app.schemas.response import ErrorResponse, SuccessResponse
from app.schemas.search import DateToFromSearch
from app.service.cart import CartService
from fastapi import APIRouter, Depends, HTTPException, Request

cart_router = APIRouter(prefix="/cart", tags=["Cart"])

service = CartService()


@cart_router.get(
    "/get_all",
)
async def get_all(
    request: Request,
    page: int = 1,
    quantity: int = 50,
    order_by: str | None = None,
    search_fields: Annotated[CartSearch, Depends()] = None,
    search_date_to_from: Annotated[DateToFromSearch, Depends()] = None,
):
    data = await service.get_all(
        request=request,
        page=page,
        quantity=quantity,
        order_by=order_by,
        search_fields=search_fields.model_dump(exclude_none=True),
        search_date_to_from=search_date_to_from.model_dump(exclude_none=True),
    )

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.get("/admin/list")
async def admin_list(
    request: Request,
    page: int = 1,
    quantity: int = 50,
    order_by: str | None = None,
    search_fields: Annotated[CartSearch, Depends()] = None,
):
    data = await service.admin_list(
        request, page, quantity, order_by, **search_fields.model_dump(exclude_none=True)
    )

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.get("/admin/{cart_id}")
async def admin_once(cart_id: UUID):
    data = await service.admin_once(cart_id)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.get("/{id}", response_model=CartRead)
async def get_by_id(id: UUID) -> CartRead:
    data = await service.get_by_id(id=id)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.post("/create", response_model=CartReadBase, status_code=201)
async def create(data: CartCreate) -> CartReadBase:
    data = await service.create(data=data)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.post("/close/{cart_id}", response_model=SuccessResponse, status_code=201)
async def close(cart_id: UUID) -> SuccessResponse:
    data = await service.close(cart_id=str(cart_id))

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.patch("/update/{id}", response_model=CartRead)
async def update(id: UUID, data: CartUpdate) -> CartRead:
    data = await service.update(id=id, data=data)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@cart_router.delete("/delete/{id}", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data
