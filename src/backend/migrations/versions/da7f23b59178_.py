"""empty message

Revision ID: da7f23b59178
Revises: 9b88f58aef8d
Create Date: 2024-07-19 11:12:56.551821

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'da7f23b59178'
down_revision: Union[str, None] = '9b88f58aef8d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
