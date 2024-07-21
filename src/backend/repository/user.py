from uuid import UUID

from core.database import SESSION
from core.models.user import User
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import update
from sqlalchemy.exc import DBAPIError, IntegrityError

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class UserRepository(BaseSQLAlchemyRepository):
    model = User
    
    async def delete(self, id: UUID) -> SuccessDTO[str] | ErrorDTO[str | int]:
        statement = (
            update(self.model)
            .values(is_active=False)
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
