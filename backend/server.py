from fastapi import FastAPI, APIRouter, HTTPException, Response, Request
from dotenv import load_dotenv
from pathlib import Path
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
import os
import bcrypt
import jwt
from datetime import datetime, timedelta

# =========================
# CONFIG INICIAL
# =========================
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ.get("MONGO_URL")
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get("DB_NAME")]

JWT_SECRET = os.environ.get("JWT_SECRET", "dev_secret")
JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

# =========================
# MODELOS
# =========================

class UserRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# =========================
# FUNÇÕES AUXILIARES
# =========================

def create_token(data: dict):
    payload = data.copy()
    payload["exp"] = datetime.utcnow() + timedelta(days=1)
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def hash_password(password: str):
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

def verify_password(password: str, hashed: bytes):
    return bcrypt.checkpw(password.encode(), hashed)

# =========================
# ROTAS
# =========================

@app.get("/")
async def root():
    return {"message": "Backend rodando :)"}


@api_router.get("/")
async def api_root():
    return {"message": "API funcionando!"}


# =========================
# REGISTER
# =========================
@api_router.post("/auth/register")
async def register(user: UserRegister, response: Response):

    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    hashed = hash_password(user.password)

    new_user = {
        "email": user.email,
        "name": user.name,
        "password": hashed,
        "created_at": datetime.utcnow()
    }

    await db.users.insert_one(new_user)

    token = create_token({"email": user.email})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True
    )

    return {
        "email": user.email,
        "name": user.name
    }


# =========================
# LOGIN
# =========================
@api_router.post("/auth/login")
async def login(user: UserLogin, response: Response):

    db_user = await db.users.find_one({"email": user.email})

    if not db_user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Senha incorreta")

    token = create_token({"email": user.email})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True
    )

    return {
        "email": db_user["email"],
        "name": db_user["name"]
    }


# =========================
# ME (usuário logado)
# =========================
@api_router.get("/auth/me")
async def get_me(request: Request):

    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Não autenticado")

    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"email": payload["email"]})

        if not user:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")

        return {
            "email": user["email"],
            "name": user["name"]
        }

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except:
        raise HTTPException(status_code=401, detail="Token inválido")


# =========================
# LOGOUT
# =========================
@api_router.post("/auth/logout")
async def logout(response: Response):

    response.delete_cookie("access_token")
    return {"message": "Logout realizado"}


# =========================
# REGISTRO DO ROUTER
# =========================
app.include_router(api_router)

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)