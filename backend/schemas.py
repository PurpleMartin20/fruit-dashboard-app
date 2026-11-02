from pydantic import BaseModel
from enums import FruitStatus

class FruitCreate(BaseModel):
    name: str
    price: float
    status: FruitStatus = FruitStatus.AVAILABLE

class FruitResponse(BaseModel):
    id: int
    name: str
    price: float
    status: FruitStatus