
import psycopg2
import os

# =========================
# إعدادات الاتصال بالداتابيز
# =========================
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_NAME = os.getenv("DB_NAME", "ecommerce")
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")

def seed_database():
    try:
        # الاتصال بقاعدة البيانات
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD
        )
        cur = conn.cursor()

        print("✅ Connected to database")

        cur.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name TEXT,
                price NUMERIC,
                description TEXT
            );
        """)
        cur.execute("DELETE FROM products")

        products = [
            ("iPhone 15", 999, "Apple smartphone"),
            ("Samsung Galaxy S24", 850, "Android flagship"),
            ("MacBook Pro", 1800, "Apple laptop"),
            ("Dell XPS 13", 1400, "Ultrabook"),
            ("Sony Headphones", 300, "Noise cancelling"),
            ("Logitech Mouse", 50, "Wireless mouse"),
            ("Mechanical Keyboard", 120, "RGB keyboard"),
            ("Gaming Chair", 250, "Ergonomic chair"),
            ("Smart Watch", 200, "Fitness tracking"),
            ("4K Monitor", 400, "Ultra HD display"),
        ]

        # إدخال البيانات
        for i in range(10):
            for name, price, desc in products:
                cur.execute(
                    "INSERT INTO products (name, price, description) VALUES (%s, %s, %s)",
                    (f"{name} {i+1}", price, desc)
                )

        conn.commit()
        print("🎉 Data inserted successfully!")

        cur.close()
        conn.close()

    except Exception as e:
        print("❌ Error:", e)


if __name__ == "__main__":
    seed_database()

