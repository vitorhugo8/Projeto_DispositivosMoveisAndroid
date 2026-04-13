from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from pathlib import Path
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os

# =========================
# CONFIG INICIAL
# =========================
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ.get("MONGO_URL")
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get("DB_NAME")]

app = FastAPI()

# Router com prefixo
api_router = APIRouter(prefix="/api")

# =========================
# ROTAS
# =========================

# 🔥 ROTA RAIZ (IMPORTANTE)
@app.get("/")
async def root():
    return {"message": "Backend rodando :)"}

# Rota dentro do /api
@api_router.get("/")
async def api_root():
    return {"message": "API funcionando! :)"}

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