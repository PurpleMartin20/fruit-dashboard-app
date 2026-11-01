import uvicorn
import uuid
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List



class Fruit(BaseModel):
    _id: str
    name: str
    price: float


class Fruits(BaseModel):
    fruits: List[Fruit]

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

memory_db ={"fruits": []}

@app.get("/fruits", response_model=Fruits)
async def get_fruits():
    return Fruits(fruits=memory_db["fruits"])

@app.post("/fruits", response_model=Fruit)
def add_fruit(fruit: Fruit):
    fruit._id = str(uuid.uuid4())

    print(fruit._id)

    memory_db["fruits"].append(fruit)
    
    return fruit

@app.delete("/fruits/{fruit_id}")
def delete_fruit(fruit_id: str):
    for fruit in memory_db["fruits"]:
        if fruit._id == fruit_id:
            memory_db["fruits"].remove(fruit)

            return {
                "message": "Fruit deleted successfully",
                "id": fruit_id
            }

    raise HTTPException(
        status_code=404,
        detail="Fruit not found"
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)