"""empty message

Revision ID: 24a5093f29cf
Revises: da38c2eff764
Create Date: 2024-07-23 03:14:00.463550

"""
from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = '24a5093f29cf'
down_revision: Union[str, None] = 'da38c2eff764'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table('cart_perfume')
    op.drop_table('perfume_category')
    op.drop_table('file')
    op.drop_table('favourite')
    op.drop_table('perfume_volume')
    op.drop_table('category')
    op.drop_table('cart')
    op.drop_table('user')
    op.drop_table('perfume')
    op.drop_table('status')
    op.drop_table('brand')

def downgrade() -> None:
    pass
