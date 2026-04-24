from fastapi import APIRouter, HTTPException, Path
from pydantic import BaseModel, Field
import psycopg2

router = APIRouter()


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120, description="Product name")
    price: float = Field(..., gt=0, description="Product price")
    description: str | None = Field(None, max_length=500, description="Optional product description")


class ProductUpdate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120, description="Updated product name")
    price: float = Field(..., gt=0, description="Updated product price")
    description: str | None = Field(None, max_length=500, description="Updated optional product description")

def get_connection():
    return psycopg2.connect(
        host="postgres",
        database="ecommerce",
        user="admin",
        password="admin",
        port=5432
    )

@router.get(
    "",
    summary="List all products",
    description="Returns all products currently stored in the database."
)
@router.get(
    "/",
    summary="List all products",
    description="Returns all products currently stored in the database."
)
def get_products():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, name, price FROM products")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    products = []
    for row in rows:
        products.append({
            "id": row[0],
            "name": row[1],
            "price": row[2]
        })

    return products


@router.post(
    "",
    status_code=200,
    summary="Create a new product",
    description="Creates a product record and returns the created product payload.",
    responses={
        200: {"description": "Product created successfully."},
        400: {"description": "Invalid product payload."}
    }
)
@router.post(
    "/",
    status_code=200,
    summary="Create a new product",
    description="Creates a product record and returns the created product payload.",
    responses={
        200: {"description": "Product created successfully."},
        400: {"description": "Invalid product payload."}
    }
)
def add_product(product: ProductCreate):
    payload = product.model_dump()
    if not payload["name"].strip() or payload["price"] <= 0:
        raise HTTPException(status_code=400, detail="Name and price must be valid.")

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO products (name, price, description) VALUES (%s, %s, %s) RETURNING id",
        (payload["name"].strip(), payload["price"], payload.get("description") or "Added from API")
    )

    new_id = cur.fetchone()[0]

    conn.commit()
    cur.close()
    conn.close()

    return {
        "id": new_id,
        "name": payload["name"].strip(),
        "price": payload["price"]
    }


@router.put(
    "/{id}",
    summary="Update an existing product",
    description="Updates product fields by product ID. Returns 404 if product does not exist.",
    responses={
        200: {"description": "Product updated successfully."},
        400: {"description": "Invalid request body."},
        404: {"description": "Product not found."}
    }
)
def update_product(
    product: ProductUpdate,
    id: int = Path(..., ge=1, description="Product ID")
):
    payload = product.model_dump()
    if not payload["name"].strip() or payload["price"] <= 0:
        raise HTTPException(status_code=400, detail="Name and price must be valid.")

    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        """
        UPDATE products
        SET name = %s, price = %s, description = %s
        WHERE id = %s
        RETURNING id, name, price
        """,
        (payload["name"].strip(), payload["price"], payload.get("description"), id)
    )
    updated = cur.fetchone()

    if not updated:
        conn.rollback()
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found.")

    conn.commit()
    cur.close()
    conn.close()

    return {"id": updated[0], "name": updated[1], "price": updated[2]}


@router.delete(
    "/{id}",
    summary="Delete a product",
    description="Deletes a product by ID. Returns 404 if the product is not found.",
    responses={
        200: {"description": "Product deleted successfully."},
        400: {"description": "Invalid product id."},
        404: {"description": "Product not found."}
    }
)
def delete_product(id: int = Path(..., ge=1, description="Product ID")):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM products WHERE id = %s RETURNING id", (id,))
    deleted = cur.fetchone()

    if not deleted:
        conn.rollback()
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Product not found.")

    conn.commit()
    cur.close()
    conn.close()
    return {"message": "Product deleted successfully.", "id": deleted[0]}