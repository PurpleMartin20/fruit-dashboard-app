from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import FruitCreate, FruitResponse
from enums import FruitStatus

app = FastAPI()

origins = [
    "http://localhost:8081",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fruits = []
next_id = 1


@app.post("/fruits", response_model=FruitResponse)
def create_fruit(fruit: FruitCreate):
    global next_id

    new_fruit = {
        "id": next_id,
        **fruit.model_dump()
    }

    fruits.append(new_fruit)
    next_id += 1

    return new_fruit


@app.get("/fruits", response_model=list[FruitResponse])
def get_fruits():
    return fruits


@app.patch("/fruits/{fruit_id}/buy", response_model=FruitResponse)
def buy_fruit(fruit_id: int):
    fruit = next(
        (f for f in fruits if f["id"] == fruit_id),
        None
    )

    if not fruit:
        raise HTTPException(status_code=404, detail="Fruit not found")

    if fruit["status"] != FruitStatus.AVAILABLE:
        raise HTTPException(status_code=400, detail="Fruit is not available")

    fruit["status"] = FruitStatus.SOLD

    return fruit


@app.delete("/fruits/{fruit_id}")
def delete_fruit(fruit_id: int ):
    fruit = next(
        (f for f in fruits if f["id"] == fruit_id),
        None
    )

    if not fruit:
        raise HTTPException(status_code=404, detail="Fruit not found")

    fruits.remove(fruit)

    return {"message": "Fruit deleted successfully", "id": fruit_id}
