from fastapi import APIRouter, UploadFile, File
from services.gemini_service import analyze_product_image

router = APIRouter(prefix="/api/ai")

# ANALIZANDO IMAGEM 
@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    image_bytes = await file.read()

    result = await analyze_product_image(image_bytes)

    return {"result": result}

# ANALISANDO LINK
@router.post("/analyze-link")
async def analyze_link(data: dict):
    print(data)

    return {
        "result":data
    }