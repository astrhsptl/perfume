from uuid import UUID
from typing import Annotated
from app.schemas.response import ErrorResponse, SuccessResponse
from app.schemas.user import UserRead, UserUpdate, UserSearch
from app.service.user import UserService
from fastapi import APIRouter, HTTPException, Request, Depends

user_router = APIRouter(prefix="/user", tags=["User"])

service = UserService()

@user_router.get("/get_all")
async def get_all(request: Request, 
                page: int = 1, 
                quantity: int = 50, 
                order_by: str | None = None,
                search_field: Annotated[UserSearch, Depends()] = None):
    data = await service.get_all(request=request, 
                                page=page, 
                                quantity=quantity, 
                                order_by=order_by,
                                search_fields=search_field.model_dump(exclude_none=True))
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@user_router.get("/get_by_condition", response_model=UserRead)
async def get_by_id(id: UUID) -> UserRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@user_router.patch("/update", response_model=UserRead)
async def update(id: UUID, data: UserUpdate) -> UserRead:
    data = await service.update(id=id, data=data)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@user_router.delete("/delete", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data