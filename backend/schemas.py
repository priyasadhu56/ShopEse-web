from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    price: float
    oldPrice: float
    discount: int
    rating: float
    image: str