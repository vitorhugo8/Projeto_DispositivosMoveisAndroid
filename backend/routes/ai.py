from fastapi import APIRouter, UploadFile, File
from services.analyzer_service import analyze_product
from services.scraper_service import extract_product_data

router = APIRouter(prefix="/api/ai")


# =========================
# ANALISANDO IMAGEM
# =========================
@router.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    filename = file.filename.lower()

    product_name = "Produto desconhecido"
    price = 100

    # Regras simples baseadas no nome da imagem
    if "ps4" in filename:
        product_name = "Controle PS4"

    elif "mouse" in filename:
        product_name = "Mouse Gamer"

    elif "fone" in filename:
        product_name = "Fone Bluetooth"

    result = await analyze_product(
        product_name,
        price
    )

    return {
        "result": result
    }


# =========================
# ANALISANDO LINK
# =========================
@router.post("/analyze-link")
async def analyze_link(data: dict):

    link = data.get("link")

    product_data = extract_product_data(link)

    result = await analyze_product(
        product_data["title"],
        product_data["price"]
    )

    return {
        "result": result
    }