"""empty message

Revision ID: da38c2eff764
Revises: df90d6221b1e
Create Date: 2024-07-23 02:49:40.392286

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'da38c2eff764'
down_revision: Union[str, None] = 'df90d6221b1e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # op.drop_table('pefume_type')
    pass


def downgrade() -> None:
    pass
