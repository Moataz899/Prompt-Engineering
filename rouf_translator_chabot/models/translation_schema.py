from pydantic import BaseModel, Field

# Request / Response schemas
class TranslateRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000, description="Text to translate")
    target_language: str = Field(..., min_length=1, description="Target language name")

class TranslateResponse(BaseModel):
    translated_text: str
    target_language: str
    original_text: str
