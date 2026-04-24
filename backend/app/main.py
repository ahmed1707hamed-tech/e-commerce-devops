from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import products, auth

app = FastAPI(
    title="E-Commerce API",
    description="Backend API for product and authentication management.",
    version="1.0.0"
)

# 👇 ده أهم جزء
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ممكن بعدين تخليها localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

@app.get("/")
def root():
    return {"message": "API is running 🚀"}