
from uuid import UUID

from core.database import SESSION
from core.models.perfume import Perfume
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import select, update
from sqlalchemy.exc import DBAPIError, IntegrityError
from sqlalchemy.orm import selectinload

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class PerfumeRepository(BaseSQLAlchemyRepository):
    model = Perfume
    
    async def delete(self, id: UUID) -> SuccessDTO[str] | ErrorDTO[str | int]:
        statement = (
            update(self.model)
            .values(hidden=True)
            .where(self.model.id == id)
            .returning(self.model)
        )
        
        try:
            async with SESSION() as session:
                data = await session.execute(statement)
                
                if data is None:
                    return ErrorDTO("Data is not exists", 400)
                
                await session.commit()
                return SuccessDTO[str]("Entity success deleted")
        
        except IntegrityError:
            return ErrorDTO("data is not exists", 400)
        
        except DBAPIError:
            return ErrorDTO("Database error", 500)
        
    async def get_all(self, page: int = 0, limit: int = 30, order_by: str | None = None) -> SuccessDTO[Perfume] | ErrorDTO[str | int]:
        statement = (
            select(self.model)
            .options(selectinload(self.model.file))
            .select_from(self.model)
            .offset((page-1) * limit)
            .limit(limit)
        )
        
        statement = self._ordering_statement(statement, order_by)
        
        try:
            async with SESSION() as session:
                statement = await session.execute(statement)
                data = statement.scalars().unique().all()
                
                if data is None:
                    return ErrorDTO("Data not found", 404)
                return SuccessDTO[self.model](data)
            
        except DBAPIError:
            return ErrorDTO("Database error", 500)

    async def get_by_condition(self, **kwargs) -> SuccessDTO[Perfume] | ErrorDTO[str | int]:
        statement = (
            select(self.model)
            .options(selectinload(self.model.perfume_volume))
            .options(selectinload(self.model.file))
            .select_from(self.model)
            .filter(
                *[getattr(self.model, key) == value for key, value in kwargs.items()]
            )
        )
        
        try:
            async with SESSION() as session:
                statement = await session.execute(statement)
                data = statement.scalar()

                if not data:
                    return ErrorDTO("Data not found", 404)
                    
                return SuccessDTO[self.model](data)
            
        except DBAPIError:
            return ErrorDTO("Database error", 500)