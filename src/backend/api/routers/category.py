# from uuid import UUID

# from app.schemas.category import CategoryCreate, CategoryRead, CategoryUpdate
# from app.schemas.response import ErrorResponse, SuccessResponse
# from app.service.category import CategoryService
# from fastapi import APIRouter, HTTPException, Request

# category_router = APIRouter(prefix="/category", tags=["Category"])

# service = CategoryService()

# @category_router.get("/get_all")
# async def get_all(request: Request, page: int = 1, quantity: int = 50, order_by: str | None = None):
#     data = await service.get_all(request=request, page=page, quantity=quantity, order_by=order_by)
    
#     if isinstance(data, ErrorResponse):
#         raise HTTPException(status_code=data.status_code, detail=data.detail)
    
#     return data

# @category_router.get("/get_by_condition", response_model=CategoryRead)
# async def get_by_id(id: UUID) -> CategoryRead:
#     data = await service.get_by_id(id=id)
    
#     if isinstance(data, ErrorResponse):
#         raise HTTPException(status_code=data.status_code, detail=data.detail)
    
#     return data

# @category_router.post("/create", response_model=CategoryRead, status_code=201)
# async def create(data: CategoryCreate) -> CategoryRead:
#     data = await service.create(data=data)
    
#     if isinstance(data, ErrorResponse):
#         raise HTTPException(status_code=data.status_code, detail=data.detail)
    
#     return data

# @category_router.post("/update", response_model=CategoryRead)
# async def update(id: UUID, data: CategoryUpdate) -> CategoryRead:
#     data = await service.update(id=id, data=data)
    
#     if isinstance(data, ErrorResponse):
#         raise HTTPException(status_code=data.status_code, detail=data.detail)
    
#     return data

# @category_router.post("/delete", response_model=SuccessResponse)
# async def delete(id: UUID) -> SuccessResponse:
#     data = await service.delete(id=id)
    
#     if isinstance(data, ErrorResponse):
#         raise HTTPException(status_code=data.status_code, detail=data.detail)
    
#     return data