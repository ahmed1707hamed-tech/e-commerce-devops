from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import products, auth

app = FastAPI()

# 👇 ده أهم جزء
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ممكن بعدين تخليها localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router, prefix="/api/products")
app.include_router(auth.router, prefix="/api/auth")

@app.get("/")
def root():
    return {"message": "API is running 🚀"}