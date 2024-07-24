from pydantic import BaseModel, Field
from datetime import date


class DateToFromSearch(BaseModel):
    date_search_field: str | None = Field(default=None)
    date_to: date | None = Field(default=None)
    date_from: date | None = Field(default=None)