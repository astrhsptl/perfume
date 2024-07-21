from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar("T")


@dataclass
class SuccessDTO(Generic[T]):
    data: T | None = None

    def __init__(self, data: T):
        self.data = data