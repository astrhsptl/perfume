from uuid import UUID

from core.database import SESSION
from core.models.favourite import Favourite
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import delete, exists, select
from sqlalchemy.exc import DBAPIError

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class FavouriteRepository(BaseSQLAlchemyRepository):
    model = Favourite
    additional_tables = ["perfume"]

    async def toggle(self, user_id: UUID, perfume_id: UUID):
        try:
            async with SESSION() as session:
                exist_statement = select(
                    exists().where(
                        self.model.user_id == user_id,
                        self.model.perfume_id == perfume_id,
                    )
                )

                result = await session.execute(exist_statement)
                data = result.scalar()

                if not data:
                    insert_data = self.model(user_id=user_id, perfume_id=perfume_id)
                    session.add(insert_data)
                    await session.commit()
                    return SuccessDTO("Entity created")

                statement = delete(self.model).where(
                    self.model.user_id == user_id,
                    self.model.perfume_id == perfume_id,
                )
                await session.execute(statement)
                await session.commit()

                return SuccessDTO("Entity deleted")

        except DBAPIError:
            return ErrorDTO("Database error", 500)
