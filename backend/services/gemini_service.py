import os
from dotenv import load_dotenv

from google import genai
from google.genai import types
from google.genai.errors import ClientError

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

async def analyze_product_image(image_bytes):

    prompt = """
    Analise este produto e diga:
    - se parece confiável
    - possíveis golpes
    - qualidade aparente
    """

    try:

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=[
                prompt,
                types.Part.from_bytes(
                    data=image_bytes,
                    mime_type="image/jpeg"
                )
            ]
        )

        return response.text

    except ClientError as e:
        return f"Erro Gemini: {str(e)}"