from enum import IntEnum

class FruitStatus(IntEnum):
    AVAILABLE = 0
    RESERVED = 1
    SOLD = 2
    OUT_OF_STOCK = 3