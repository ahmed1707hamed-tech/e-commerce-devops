from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login(data: dict):
    if data["email"] == "admin@gmail.com" and data["password"] == "1234":
        return {"message": "Login success"}
    return {"error": "Invalid credentials"}