"""empty message

Revision ID: b7d512d81d2f
Revises: 7f56ad7886e7
Create Date: 2024-07-22 23:41:00.762736

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b7d512d81d2f'
down_revision: Union[str, None] = '7f56ad7886e7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
