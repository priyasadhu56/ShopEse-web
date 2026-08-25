from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from typing import List


# =========================================================
# DATABASE
# =========================================================

DATABASE_URL = "sqlite:///./shop.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# =========================================================
# DATABASE MODELS
# =========================================================

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    oldPrice = Column(Float, nullable=True)
    discount = Column(Float, nullable=True)
    rating = Column(Float, nullable=True)
    image = Column(String, nullable=False)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    pin_code = Column(String, nullable=False)
    payment_method = Column(String, nullable=False)
    total = Column(Float, nullable=False)


# Create tables
Base.metadata.create_all(bind=engine)


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="ShopEase API",
    description="Backend API for ShopEase ecommerce website",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATABASE DEPENDENCY
# =========================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# =========================================================
# PYDANTIC SCHEMAS
# =========================================================

class ProductCreate(BaseModel):
    name: str
    price: float
    oldPrice: float | None = None
    discount: float | None = None
    rating: float | None = None
    image: str


class OrderItem(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    mobile: str
    address: str
    city: str
    pin_code: str
    payment_method: str
    items: List[OrderItem]


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def home():
    return {
        "message": "ShopEase Backend is running!"
    }


# =========================================================
# PRODUCT APIs
# =========================================================

@app.get("/products")
def get_products(
    db: Session = Depends(get_db)
):
    products = db.query(Product).all()

    return products


@app.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product


@app.post("/products")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(
        name=product.name,
        price=product.price,
        oldPrice=product.oldPrice,
        discount=product.discount,
        rating=product.rating,
        image=product.image
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product


@app.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }


# =========================================================
# ORDER APIs
# =========================================================

@app.post("/orders")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    """
    Create a new order.

    The backend calculates the total from the
    actual product prices in the database.
    """

    if len(order.items) == 0:
        raise HTTPException(
            status_code=400,
            detail="Order must contain at least one product"
        )

    total = 0.0

    # Check every product
    for item in order.items:

        if item.quantity <= 0:
            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than 0"
            )

        product = (
            db.query(Product)
            .filter(Product.id == item.product_id)
            .first()
        )

        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Product {item.product_id} not found"
            )

        total += float(product.price) * item.quantity

    # Create order
    new_order = Order(
        customer_name=order.customer_name,
        mobile=order.mobile,
        address=order.address,
        city=order.city,
        pin_code=order.pin_code,
        payment_method=order.payment_method,
        total=total
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "customer_name": new_order.customer_name,
        "total": new_order.total
    }


@app.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):
    orders = db.query(Order).order_by(
        Order.id.desc()
    ).all()

    return orders


@app.get("/orders/{order_id}")
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    order = (
        db.query(Order)
        .filter(Order.id == order_id)
        .first()
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order