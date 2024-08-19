from uuid import UUID, uuid4

from app.schemas.file import FileCreate, FileRead
from app.schemas.response import ErrorResponse, SuccessResponse
from app.service.file import FileService
from fastapi import APIRouter, HTTPException, Request, UploadFile, File, Depends

file_router = APIRouter(prefix="/file", tags=["File"])

service = FileService()

@file_router.get("/get/{id}", response_model=FileRead)
async def get_by_id(id: UUID) -> FileRead:
    data = await service.get_by_id(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@file_router.post("/create", response_model=FileRead, status_code=201)
async def create(request: Request, data: FileCreate = Depends(), file: UploadFile = File(...)) -> FileRead:
    try:
        extension = file.filename.split(".")[-1]
    except:
        extension = ""

    file.filename = f"{str(uuid4())}.{extension}"

    data = await service.create(data=data, request=request, file=file)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data

@file_router.delete("/delete/{id}", response_model=SuccessResponse)
async def delete(id: UUID) -> SuccessResponse:
    data = await service.delete(id=id)
    
    if isinstance(data, ErrorResponse):
        raise HTTPException(status_code=data.status_code, detail=data.detail)
    
    return data
