import psycopg2

products = [
    ("Wireless Mouse", 25, "Ergonomic wireless mouse"),
    ("Mechanical Keyboard", 120, "RGB keyboard"),
    ("Gaming Headset", 80, "Surround sound"),
]

conn = psycopg2.connect(
    host="postgres",
    database="ecommerce",
    user="admin",
    password="admin",
    port=5432
)

cur = conn.cursor()

# 🧠 مهم: شوف هل الجدول فاضي ولا لا
cur.execute("SELECT COUNT(*) FROM products")
count = cur.fetchone()[0]

# لو فاضي بس → اعمل seed
if count == 0:
    for name, price, desc in products:
        cur.execute(
            "INSERT INTO products (name, price, description) VALUES (%s, %s, %s)",
            (name, price, desc)
        )
    print("✅ Seeded initial products")
else:
    print("ℹ️ Data already exists, skipping seed")

conn.commit()
cur.close()
conn.close()