# 🌍 Rouf_Translator — AI Translation Service

AI-powered multilingual translator with **beautiful GUI** and **REST API** built with **FastAPI** and **Google Gemini 2.5 Flash**.

## Project Structure

```
rouf_translator_chabot/
│
├── agents/
│   ├── prompts/
│   │   ├── __init__.py
│   │   └── translation_prompt.py   # System prompt + prompt builder
│   ├── __init__.py
│   └── gemini_client.py            # Gemini API wrapper
│
├── config/
│   ├── __init__.py
│   └── logging_utils.py            # File + console logger setup
│
├── models/
│   ├── __init__.py
│   └── translation_schema.py       # Pydantic request/response models
│
├── static/                         # CSS and JavaScript files
│   ├── styles.css
│   └── script.js
├── templates/                      # HTML templates
│   └── index.html                  # Main GUI interface
├── logs/                           # Auto-created at runtime
│   └── rouf_translator.log
│
├── .env                            # Your API key (never commit)
├── .env.example                    # Template for .env
├── main.py                         # FastAPI app entry point
├── requirements.txt                # Python dependencies
└── README.md                       # This file
```

## Setup

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Configure your environment
```bash
cp .env.example .env
# Edit .env and add your configuration:
# - GEMINI_API_KEY (required)
# - LOG_LEVEL (default: INFO)
# - LOG_FILE (default: rouf_translator.log)
```

Get your free Gemini API key at: https://aistudio.google.com/app/apikey

### 3. Run the server
```bash
uvicorn main:app --reload --port 8000
```

Then open your browser:
```
http://127.0.0.1:8000
```

## API Endpoints

| Method | Path         | Description              |
|--------|--------------|--------------------------|
| GET    | `/`          | Web GUI interface        |
| POST   | `/translate` | Translate text           |
| GET    | `/health`    | Health check             |
| GET    | `/docs`      | Swagger UI (auto-generated) |

### POST `/translate` — Request Body
```json
{
  "text": "Hello, how are you?",
  "target_language": "Arabic"
}
```

### POST `/translate` — Response
```json
{
  "translated_text": "مرحباً، كيف حالك؟",
  "target_language": "Arabic",
  "original_text": "Hello, how are you?"
}
```

## Supported Languages (60+)

Arabic, French, Spanish, German, Japanese, Korean, Chinese, Hindi, Portuguese, Russian, Italian, Turkish, Polish, Dutch, Swedish, and many more.

## Features

- 🎨 **Beautiful Web GUI** - Modern chat-style interface
- 🤖 Powered by Gemini 2.5 Flash
- 🌍 60+ languages supported
- 📝 Configurable logging (level and file)
- ⚙️ Environment-based configuration
- 🔥 Auto-generated API docs at `/docs`
- 🏥 Health check endpoint
- 📊 Request/response logging
- 🚀 FastAPI + Jinja2 templates
- 💾 Static file serving