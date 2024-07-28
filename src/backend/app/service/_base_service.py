from math import ceil
from os import fstat
from urllib.parse import unquote
from uuid import UUID

from core.config import S3_BUCKET_NAME, S3_URL
from core.s3_store import minio_client
from fastapi import Request
from minio.error import S3Error
from pydantic import create_model
from repository._base_repository import IBaseRepository

from app.schemas._base import BaseSchema
from app.schemas.response import ErrorResponse, PaginateBase, SuccessResponse


class BaseFileService:
    _bucket_name = S3_BUCKET_NAME
    _minio_host = S3_URL
    _minio_client = minio_client

    async def remove_file_from_s3(self, url) -> None:
        part_of_path = url.split("/")
        try:
            self._minio_client.remove_object(part_of_path[3], unquote(part_of_path[4]))
        except S3Error as e:
            return ErrorResponse(detail={"error": str(e)})

    async def upload_file_to_s3(self, file, request: Request) -> str | ErrorResponse:
        try:
            result = self._minio_client.put_object(
                self._bucket_name,
                file.filename,
                file.file,
                fstat(file.file.fileno()).st_size,
            )

            result = await self._create_path_file(result, request)
        except Exception as e:
            return ErrorResponse(detail={"error": str(e)}, status_code=400)

        return result

    async def _create_path_file(self, file, request: Request) -> str | ErrorResponse:
        try:
            response_file = self._minio_client.get_object(
                file._bucket_name, file.__dict__.get("_object_name")
            )
            files_path = f"{request.url.scheme}s://{self._minio_host}{response_file.__dict__.get('_request_url')}"
        except S3Error as e:
            return ErrorResponse(detail={"error": str(e)}, status_code=404)

        return files_path


class BaseService(BaseFileService):
    _repository: IBaseRepository
    _serializer: BaseSchema
    _depth_serializer: BaseSchema | None = None
    _depth_serializer_for_id: BaseSchema | None = None

    async def get_all(
        self,
        request: Request,
        page: int = 1,
        quantity: int = 50,
        order_by: str | None = None,
        **kwargs,
    ) -> PaginateBase | ErrorResponse:
        result = await self._repository.get_all(
            page=page, limit=quantity, order_by=order_by, **kwargs
        )

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._paginate(
            request=request,
            count=len(result.data),
            data=result.data,
            page=page,
            quantity=quantity,
        )

    async def get_by_id(self, id: str | UUID) -> BaseSchema | ErrorResponse:
        result = await self._repository.get_by_condition(id=id)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        if self._depth_serializer_for_id:
            return self._depth_serializer_for_id.model_validate(result.data)
        elif self._depth_serializer:
            return self._depth_serializer.model_validate(result.data)
        else:
            return self._serializer.model_validate(result.data)

    async def create(self, data: BaseSchema, **kwargs) -> BaseSchema | ErrorResponse:
        if kwargs.get("file", False):
            file_url = await self.upload_file_to_s3(kwargs["file"], kwargs["request"])

            if hasattr(file_url, "detail"):
                return ErrorResponse(
                    detail=file_url.detail, status_code=file_url.status_code
                )

            result = await self._repository.create(data=data, file=file_url)

        else:
            result = await self._repository.create(data=data)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._serializer.model_validate(result.data)

    async def update(
        self, id: str | UUID, data: BaseSchema
    ) -> BaseSchema | ErrorResponse:
        result = await self._repository.update(id=id, data=data)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        return self._serializer.model_validate(result.data)

    async def delete(self, id: str | UUID) -> SuccessResponse | ErrorResponse:
        result = await self._repository.delete(id=id)

        if hasattr(result, "detail"):
            return ErrorResponse(detail=result.detail, status_code=result.status_code)

        if result.url:
            await self.remove_file_from_s3(result.url)

        return SuccessResponse(detail=result.data)

    def _paginate(
        self, request: Request, count: int, data, page: int, quantity: int
    ) -> PaginateBase:
        page = max(page, 1)
        url = request.url
        base_url = f"{url.scheme}://{url.netloc}{url.path}"
        next_page = (
            f"{base_url}?page={page + 1}&quantity={quantity}"
            if count > page * quantity
            else None
        )

        prev_page = (
            f"{base_url}?page={page - 1}&quantity={quantity}" if page > 1 else None
        )

        page = ceil(count / quantity)

        if self._depth_serializer:
            PaginateResponse = create_model(
                "PaginateResponse",
                data=(list[self._depth_serializer], None),
                __base__=PaginateBase,
            )
            return PaginateResponse(
                data=data, next_page=next_page, previous_page=prev_page, page=page
            )

        PaginateResponse = create_model(
            "PaginateResponse",
            data=(list[self._serializer], None),
            __base__=PaginateBase,
        )
        return PaginateResponse(
            data=data, next_page=next_page, previous_page=prev_page, page=page
        )
