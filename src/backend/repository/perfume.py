import datetime

from core.database import SESSION
from core.models._base import BaseModel
from core.models.perfume import Perfume
from core.models.perfume_volume import PerfumeVolume
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import select
from sqlalchemy.exc import DBAPIError
from sqlalchemy.orm import selectinload
from sqlalchemy.sql.expression import func

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository


class PerfumeRepository(BaseSQLAlchemyRepository):
    model = Perfume
    additional_tables = ["file", "perfume_volume"]
    soft_deletion = True

    async def get_all(
        self, page: int = 0, limit: int = 30, order_by: str | None = None, **kwargs
    ) -> SuccessDTO[BaseModel] | ErrorDTO[str | int]:
        statement = select(self.model)

        if self.additional_tables:
            _nested = []

            for additional_table in self.additional_tables:
                current_model = additional_table

                if isinstance(additional_table, str):
                    current_model = getattr(self.model, additional_table)

                _nested.append(selectinload(current_model))

            statement = statement.options(*_nested)

        statement = (
            statement.select_from(self.model).offset((page - 1) * limit).limit(limit)
        )

        search_fields: dict | None = kwargs.get("search_fields", False)
        volume_search_params: dict | None = kwargs.get("search_volume", False)

        if volume_search_params and len(volume_search_params) > 0:
            statement = statement.join(PerfumeVolume)

            for key, value in volume_search_params.items():
                if key == "cost_from":
                    statement = statement.filter(PerfumeVolume.cost >= value)
                elif key == "cost_to":
                    statement = statement.filter(PerfumeVolume.cost <= value)

        if search_fields:
            for key, value in search_fields.items():
                if not hasattr(self.model, key):
                    continue

                if isinstance(value, str):
                    statement = statement.filter(
                        getattr(self.model, key).ilike(f"%{value}%")
                    )
                elif isinstance(value, datetime.date):
                    statement = statement.filter(
                        func.date(getattr(self.model, key)) == value
                    )
                else:
                    statement = statement.filter(*[getattr(self.model, key) == value])

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
