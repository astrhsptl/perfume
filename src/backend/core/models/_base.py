from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from core.database import BASE


class BaseModel(BASE):
    __abstract__ = True
    
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4, unique=True)
    hidden: Mapped[bool] = mapped_column(default=False)
    create_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())