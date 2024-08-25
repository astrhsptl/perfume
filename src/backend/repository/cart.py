from uuid import UUID

from core.config import CART_STATUS_CLOSE
from core.database import SESSION
from core.models.cart import Cart
from dto.exception_dto import ErrorDTO
from dto.success_dto import SuccessDTO
from sqlalchemy.exc import DBAPIError, IntegrityError

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
                    perfume_volume = (await self._perfume_volume_repository.get_by_condition(
                        id=str(cart_perfume.perfume_volume_id)
                    )).data
                    await self._perfume_volume_repository.update(
                        str(cart_perfume.id),
                        {
                            "quantity": perfume_volume.quantity - cart_perfume.quantity 
                        }
                    )

                await self.update(str(cart_id), {"status_id": CART_STATUS_CLOSE})

                await session.commit()
                return SuccessDTO("Cart  successfully closed")

        except IntegrityError:
            return ErrorDTO("Data already exists", 400)

        except DBAPIError:
            return ErrorDTO("Database error", 500)

