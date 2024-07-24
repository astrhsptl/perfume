"""empty message

Revision ID: 6e781289f7e9
Revises: 24a5093f29cf
Create Date: 2024-07-23 03:23:51.870185

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6e781289f7e9'
down_revision: Union[str, None] = '24a5093f29cf'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table('pefume_type')
    




def downgrade() -> None:
    pass
