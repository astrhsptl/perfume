"""empty message

Revision ID: e86acdf3d928
Revises: 047479cdbafb
Create Date: 2024-07-23 02:14:40.979717

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e86acdf3d928'
down_revision: Union[str, None] = '047479cdbafb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('perfume_volume', sa.Column('volume', sa.Integer(), nullable=False))


def downgrade() -> None:
    pass
