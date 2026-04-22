import os
import google.generativeai as genai
from agents.prompts import SYSTEM_PROMPT, build_translation_prompt

def translate(text: str, target_language: str, temperature =0.0):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise EnvironmentError("GEMINI_API_KEY is not set")
    genai.configure(api_key=api_key)
    try:
        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=SYSTEM_PROMPT,
            generation_config={"temperature": temperature},
        )
        prompt = build_translation_prompt(text, target_language)
        response = model.generate_content(prompt)
        result = response.text.strip()
        return result

    except Exception as exc:
        raise RuntimeError(f"Translation failed: {exc}") from exc
