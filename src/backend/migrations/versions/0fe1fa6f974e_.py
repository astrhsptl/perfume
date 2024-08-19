"""empty message

Revision ID: 0fe1fa6f974e
Revises: f3bb1e3984df
Create Date: 2024-07-18 05:02:52.828131

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '0fe1fa6f974e'
down_revision: Union[str, None] = 'f3bb1e3984df'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('cart', 'is_approved')
    op.drop_column('cart', 'is_delivered')
    op.drop_column('cart', 'is_closed')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cart', sa.Column('is_closed', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.add_column('cart', sa.Column('is_delivered', sa.BOOLEAN(), autoincrement=False, nullable=False))
    op.add_column('cart', sa.Column('is_approved', sa.BOOLEAN(), autoincrement=False, nullable=False))
    # ### end Alembic commands ###