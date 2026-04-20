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

# نكررهم لحد ما يبقوا 100
for i in range(10):
    for name, price, desc in products:
        cur.execute(
            "INSERT INTO products (name, price, description) VALUES (%s, %s, %s)",
            (f"{name} {i+1}", price, desc)
        )