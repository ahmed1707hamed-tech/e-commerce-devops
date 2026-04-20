import psycopg2

conn = psycopg2.connect(
    host="postgres",
    database="ecommerce",
    user="admin",
    password="admin",
    port=5432
)

cur = conn.cursor()

# اعمل الجدول لو مش موجود
cur.execute("""
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    price INT,
    description TEXT
)
""")

# check
cur.execute("SELECT COUNT(*) FROM products")
count = cur.fetchone()[0]

if count == 0:
    for i in range(1, 101):
        cur.execute(
            "INSERT INTO products (name, price, description) VALUES (%s, %s, %s)",
            (
                f"Product {i}",
                i * 10,
                f"Description for product {i}"
            )
        )
    print("✅ Seeded 100 products")
else:
    print("ℹ️ Data already exists")

conn.commit()
cur.close()
conn.close()