from uuid import UUID

from core.database import SESSION
from core.models._base import BaseModel
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import Select, delete, select, update
from sqlalchemy.exc import DBAPIError, IntegrityError

from ._base_repository import IBaseRepository


class BaseSQLAlchemyRepository(IBaseRepository):
    model: BaseModel
    
    async def get_all(self, page: int = 0, limit: int = 30, order_by: str | None = None) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = (
            select(self.model)
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

    async def get_by_condition(self, **kwargs) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = (
            select(self.model)
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

    async def create(self, data: dict) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        insert_data = self.model(**data.model_dump(exclude_unset=True))
        
        try:
            async with SESSION() as session:
                session.add(insert_data)
                await session.commit()
                await session.refresh(insert_data)
                return SuccessDTO[self.model](insert_data)
                
        except IntegrityError:
            return ErrorDTO("Data already exists", 400)
        
        except DBAPIError:
            return ErrorDTO("DataBase Error",500)
    
    async def update(self, id: UUID, data: dict) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = (
                    update(self.model)
                    .values(**data.model_dump(exclude_unset=True))
                    .where(self.model.id == str(id))
                    .returning(self.model)
                )
        
        try:
            async with SESSION() as session:
                data = (await session.execute(statement)).unique().scalar()
                
                if data is None:
                    return ErrorDTO("Data not found", 404)
                
                await session.commit()
                await session.refresh(data)
                return SuccessDTO[self.model](data)
                    
        except IntegrityError:
            return ErrorDTO("Data already exists", 400)
        
        except DBAPIError:
            return ErrorDTO("Database error", 500)
    
    async def delete(self, id: UUID) -> SuccessDTO[str] | ErrorDTO[str | int]:
        statement = (
            delete(self.model)
            .where(self.model.id == id)
            .returning(self.model)
        )
        
        try:
            async with SESSION() as session:
                data = (await session.execute(statement)).unique().scalar()

                if data is None:
                    return ErrorDTO("Data not found", 404)
                
                await session.commit()
                return SuccessDTO("Entity success deleted")
        
        except IntegrityError as e:
            print(e)
            return ErrorDTO("data is not exists", 400)
        
        except DBAPIError:
            return ErrorDTO("Database error", 500)
    
    
    def _ordering_statement(self, statement, order_colomn: str | None = None) -> Select:
        
        if order_colomn is None:
                return statement
        
        if not hasattr(self.model, order_colomn):
            return statement
        
        reverse = False
        
        if order_colomn.startswith('-'):
            reverse = True
            order_colomn = order_colomn[1:]
        
        attribute = getattr(self.model, order_colomn)
        return statement.order_by(attribute.desc() if reverse else attribute.asc())