from fastapi import APIRouter
import psycopg2

router = APIRouter()

def get_connection():
    return psycopg2.connect(
        host="postgres",
        database="ecommerce",
        user="admin",
        password="admin",
        port=5432
    )

# ✅ GET (من الداتا بيز)
@router.get("/")
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


# ✅ POST (يضيف في الداتا بيز)
@router.post("/")
def add_product(product: dict):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        "INSERT INTO products (name, price, description) VALUES (%s, %s, %s) RETURNING id",
        (product["name"], product["price"], "Added from API")
    )

    new_id = cur.fetchone()[0]

    conn.commit()
    cur.close()
    conn.close()

    return {
        "id": new_id,
        "name": product["name"],
        "price": product["price"]
    }