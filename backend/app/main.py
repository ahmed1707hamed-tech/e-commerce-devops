from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from app.routes import products, auth

# 👇 Prometheus
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST

app = FastAPI(
    title="E-Commerce API",
    description="Backend API for product and authentication management.",
    version="1.0.0"
)

# 👇 Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 👇 Routers
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])

# 👇 Metric (عدد الطلبات)
REQUEST_COUNT = Counter('request_count', 'Total number of requests')

@app.get("/")
def root():
    REQUEST_COUNT.inc()
    return {"message": "API is running 🚀"}

# 👇 أهم endpoint (Prometheus)
@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)