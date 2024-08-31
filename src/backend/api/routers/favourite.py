from uuid import UUID

from app.schemas.auth import (
    AccessToken,
)
from app.schemas.favourite import (
    FavouriteCreate,
    FavouriteRead,
    FavouriteToggle,
    FavouriteUpdate,
)
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.auth.auth import auth_dependency
from app.service.auth.jwt import JWTAuth
from app.service.favourite import FavouriteService
from fastapi import APIRouter, HTTPException, Request

favourite_router = APIRouter(prefix="/favourite", tags=["Favourite"])

service = FavouriteService()


@favourite_router.get("/get_all")
async def get_all(
    request: Request, page: int = 1, quantity: int = 50, order_by: str | None = None
):
    data = await service.get_all(
        request=request, page=page, quantity=quantity, order_by=order_by
    )

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@favourite_router.get("/user", status_code=200)
async def user_favorites(
    request: Request,
    token: AccessToken = auth_dependency,
    page: int = 1,
    quantity: int = 50,
):
    _jwt_auth = JWTAuth()
    result = _jwt_auth.decode_token(token.access_token)
    user_id = UUID(result.data.get("sub"))

    data = await service.user_favorites(request, user_id, page, quantity)

    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)

    return data


@favourite_router.get("/{id}")
async def get_by_id(id: UUID):
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


@favourite_router.post("/check/toggle", status_code=201)
async def toggle(perfume_data: FavouriteToggle, token: AccessToken = auth_dependency):
    _jwt_auth = JWTAuth()
    result = _jwt_auth.decode_token(token.access_token)
    user_id = UUID(result.data.get("sub"))

    data = await service.toggle(user_id=user_id, perfume_id=perfume_data.perfume_id)

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
