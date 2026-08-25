from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    Float,
)
from sqlalchemy.orm import (
    declarative_base,
    sessionmaker,
    Session,
)

from pydantic import BaseModel


# ============================================================
# DATABASE
# ============================================================

DATABASE_URL = "sqlite:///./shopease.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


# ============================================================
# DATABASE MODELS
# ============================================================

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    oldPrice = Column(Float, nullable=True)
    discount = Column(Integer, nullable=True)
    rating = Column(Float, nullable=True)
    image = Column(String, nullable=True)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=False
    )

    address = Column(
        String,
        nullable=False
    )

    total = Column(
        Float,
        nullable=False
    )


# Create database tables
Base.metadata.create_all(bind=engine)


# ============================================================
# PYDANTIC SCHEMAS
# ============================================================

class ProductCreate(BaseModel):
    name: str
    price: float
    oldPrice: float | None = None
    discount: int | None = None
    rating: float | None = None
    image: str | None = None


class OrderCreate(BaseModel):
    customer_name: str
    email: str
    address: str
    total: float


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="ShopEase API",
    description="Backend API for ShopEase ecommerce website",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE DEPENDENCY
# ============================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ============================================================
# HOME
# ============================================================

@app.get("/")
def home():
    return {
        "message": "ShopEase backend is running!"
    }


# ============================================================
# GET ALL PRODUCTS
# ============================================================

@app.get("/products")
def get_products(
    db: Session = Depends(get_db)
):
    products = db.query(Product).all()

    return [
        {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "oldPrice": product.oldPrice,
            "discount": product.discount,
            "rating": product.rating,
            "image": product.image,
        }
        for product in products
    ]


# ============================================================
# GET SINGLE PRODUCT
# ============================================================

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
        return {
            "error": "Product not found"
        }

    return {
        "id": product.id,
        "name": product.name,
        "price": product.price,
        "oldPrice": product.oldPrice,
        "discount": product.discount,
        "rating": product.rating,
        "image": product.image,
    }


# ============================================================
# CREATE PRODUCT
# ============================================================

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
        image=product.image,
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Product created successfully",
        "product": {
            "id": new_product.id,
            "name": new_product.name,
            "price": new_product.price,
            "oldPrice": new_product.oldPrice,
            "discount": new_product.discount,
            "rating": new_product.rating,
            "image": new_product.image,
        },
    }


# ============================================================
# DELETE PRODUCT
# ============================================================

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
        return {
            "error": "Product not found"
        }

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }


# ============================================================
# CREATE ORDER
# ============================================================

@app.post("/orders")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):
    new_order = Order(
        customer_name=order.customer_name,
        email=order.email,
        address=order.address,
        total=order.total,
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return {
        "message": "Order placed successfully",
        "order_id": new_order.id,
        "customer_name": new_order.customer_name,
        "email": new_order.email,
        "address": new_order.address,
        "total": new_order.total,
    }


# ============================================================
# GET ALL ORDERS
# ============================================================

@app.get("/orders")
def get_orders(
    db: Session = Depends(get_db)
):
    orders = db.query(Order).all()

    return [
        {
            "id": order.id,
            "customer_name": order.customer_name,
            "email": order.email,
            "address": order.address,
            "total": order.total,
        }
        for order in orders
    ]


# ============================================================
# GET SINGLE ORDER
# ============================================================

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
        return {
            "error": "Order not found"
        }

    return {
        "id": order.id,
        "customer_name": order.customer_name,
        "email": order.email,
        "address": order.address,
        "total": order.total,
    }