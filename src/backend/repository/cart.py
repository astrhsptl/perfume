from uuid import UUID

from core.database import SESSION
from core.models._base import BaseModel
from core.models.cart import Cart
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import select, update
from sqlalchemy.exc import DBAPIError, IntegrityError
from sqlalchemy.orm import selectinload
from sqlalchemy.orm.attributes import flag_modified

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class CartRepository(BaseSQLAlchemyRepository):
    model = Cart
    
    async def get_all(self, page: int = 0, limit: int = 30, order_by: str | None = None) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = (
            select(self.model)
            # .options(selectinload(self.model.status))
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

    async def get_by_condition(self, **kwargs) -> SuccessDTO[Cart] | ErrorDTO[str | int]:
        statement = (
            select(self.model)
            .options(selectinload(self.model.status))
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
    
    async def update(self, id: UUID, data: dict) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = (
                    update(self.model)
                    .options(selectinload(self.model.status))
                    .values(**data.model_dump(exclude_unset=True))
                    .where(self.model.id == str(id))
                    .returning(self.model)
                )
        
        try:
            async with SESSION() as session:
                data = (await session.execute(statement)).unique().scalar()
                
                if data is None:
                    return ErrorDTO("Data not found", 404)
                
                flag_modified(data, "status_id")
                await session.commit()
                
                await session.refresh(data)
                
                return SuccessDTO[self.model](data)
                    
        except IntegrityError:
            return ErrorDTO("Data already exists", 400)
        
        except DBAPIError:
            return ErrorDTO("Database error", 500)
    # @event.listens_for(Cart.status_id, "append")
    # def receive_append(target, initiator):
    #     print("penis")
    #     # return requests.post("127.0.0.0/api/v1/perfume/create", {"name": "string2", "description": "xmxmx", "hidden": False})
    # @event.listens_for(Cart.status_id, "modified")
    # def receive_modified(target, initiator):
    #     print("penis")
    #     # return requests.post("127.0.0.0/api/v1/perfume/create", {"name": "string2", "description": "xmxmx", "hidden": False})
    # @event.listens_for(Cart.status_id, "set")
    # def receive_set(target, value, old, initiator):
    #     print("penis")