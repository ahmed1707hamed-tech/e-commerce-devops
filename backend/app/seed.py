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

# 🟢 create users table لو مش موجود
cur.execute("""
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
)
""")

# 🟢 add admin user
cur.execute("SELECT COUNT(*) FROM users")
user_count = cur.fetchone()[0]

if user_count == 0:
    cur.execute(
        "INSERT INTO users (email, password) VALUES (%s, %s)",
        ("admin@gmail.com", "123456")
    )
    print("✅ Admin user created")
else:
    print("ℹ️ User already exists")

# 🟢 products
cur.execute("""
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price INTEGER,
    description TEXT
)
""")

cur.execute("SELECT COUNT(*) FROM products")
count = cur.fetchone()[0]

if count == 0:
    for name, price, desc in products:
        cur.execute(
            "INSERT INTO products (name, price, description) VALUES (%s, %s, %s)",
            (name, price, desc)
        )
    print("✅ Seeded products")
else:
    print("ℹ️ Products already exist")

conn.commit()
cur.close()
conn.close()