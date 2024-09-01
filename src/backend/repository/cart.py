from datetime import date
from uuid import UUID

from core.database import SESSION
from core.models import CartPerfume
from core.models.cart import Cart
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy import String, cast, func, select
from sqlalchemy.exc import DBAPIError, IntegrityError
from sqlalchemy.orm import joinedload

from ._base_sqlalchemy_repository import BaseSQLAlchemyRepository
from .perfume_volume import PerfumeVolumeRepository


class CartRepository(BaseSQLAlchemyRepository):
    model = Cart
    additional_tables = [
        "cart_perfume",
        "status",
    ]
    _perfume_volume_repository = PerfumeVolumeRepository()
    soft_deletion = True

    async def close(self, cart_id: str | UUID):
        cart: Cart = (await self.get_by_condition(id=str(cart_id))).data

        try:
            async with SESSION() as session:
                for cart_perfume in cart.cart_perfume:
                    perfume_volume = (
                        await self._perfume_volume_repository.get_by_condition(
                            id=str(cart_perfume.perfume_volume_id)
                        )
                    ).data
                    await self._perfume_volume_repository.update(
                        str(cart_perfume.id),
                        {"quantity": perfume_volume.quantity - cart_perfume.quantity},
                    )

                await session.commit()
                return SuccessDTO("Cart successfully closed")

        except IntegrityError:
            return ErrorDTO("Data already exists", 400)

        except DBAPIError:
            return ErrorDTO("Database error", 500)

    async def admin_list(
        self, page: int = 0, limit: int = 30, order_by: str | None = None, **kwargs
    ):
        statement = (
            select(self.model)
            .options(
                joinedload(self.model.user),
                joinedload(self.model.cart_perfume),
                joinedload(self.model.cart_perfume, CartPerfume.perfume_volume),
            )
            .where()
            .offset((page - 1) * limit)
            .limit(limit)
        )

        for key, value in kwargs.items():
            if not hasattr(self.model, key):
                continue

            if isinstance(value, date):
                statement = statement.filter(
                    func.date(getattr(self.model, key)) == value
                )
                continue

            statement = statement.filter(
                cast(getattr(self.model, key), String).ilike(f"%{value}%")
            )

        statement = self._ordering_statement(statement, order_by)

        try:
            async with SESSION() as session:
                statement = await session.execute(statement)
                data = statement.scalars().unique().all()

                if data is None:
                    return ErrorDTO("Data not found", 404)

                return SuccessDTO[self.model](data)
        except DBAPIError as e:
            print(e)
            return ErrorDTO("Database error", 500)
