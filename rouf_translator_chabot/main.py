from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from agents import translate
from models.translation_schema import TranslateRequest, TranslateResponse
from config.logging_utils import setup_ai_logger
import os
from dotenv import load_dotenv

load_dotenv()

# Configuration from environment variables
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", "rouf_translator.log")

logger = setup_ai_logger("main", log_file=LOG_FILE, level=LOG_LEVEL)
app = FastAPI(title="Rouf Translator")

# Static files & templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# GUI Route
@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    """Serve the main chat UI."""
    return templates.TemplateResponse("index.html", {"request": request})

# Endpoint for translation
@app.post("/translate", response_model=TranslateResponse)
async def translate_text(payload: TranslateRequest):
    logger.info("Translation request | target=%s | chars=%d", payload.target_language, len(payload.text))

    try:
        result = translate(payload.text, payload.target_language)
        return TranslateResponse(
            translated_text=result,
            target_language=payload.target_language,
            original_text=payload.text,
        )
    except RuntimeError as exc:
        logger.error("Translation endpoint error: %s", exc)
        raise HTTPException(status_code=500, detail=str(exc))

# Endpoint for health check
@app.get("/health")
async def health():
    return {"status": "ok", "service": "Rouf Translator"}
