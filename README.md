# Prompt Engineering with Google Gemini

A comprehensive collection of prompt engineering techniques, examples, and best practices for optimizing AI model interactions using Google Gemini 2.5 Flash.

## Table of Contents

- [Overview](#overview)
- [Techniques](#techniques)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

## Overview

This repository contains practical examples and techniques for effective prompt engineering, helping you get the most out of AI language models through carefully crafted prompts.

## Techniques Covered

### Prompting Principles
- **Clear and Specific Instructions**: Using delimiters, structured outputs, and condition checking
- **Give Model Time to Think**: Step-by-step processes and multi-task approaches

### Practical Applications
- **Chat Format**: Multi-turn conversations and context management
- **Expanding**: Customized responses based on sentiment analysis
- **Inferring**: Sentiment analysis, emotion detection, and topic extraction
- **Summarizing**: Focused summaries with specific constraints
- **Iterative Development**: Refining prompts through systematic improvement
- **Translation Systems**: Building multilingual chatbot applications with structured translation workflows

## Projects and Examples

### [guidelines_PEG_gemini.ipynb](./notebooks/guidelines_PEG_gemini.ipynb)
- Introduction to prompting principles
- Delimiters and structured output techniques
- Step-by-step instruction following
- Model limitations and hallucinations

### [chatbot-gemini.ipynb](./notebooks/chatbot-gemini.ipynb)
- Chat format implementation
- Multi-turn conversation handling
- OrderBot example for pizza restaurant
- Context management in conversations

### [expanding-gemini.ipynb](./notebooks/expanding-gemini.ipynb)
- Customized email responses
- Sentiment-based reply generation
- Customer service automation

### [inferring-gemini.ipynb](./notebooks/inferring-gemini.ipynb)
- Sentiment analysis from reviews
- Emotion detection
- Product and company extraction
- Topic inference and classification

### [summarizing-gemini.ipynb](./notebooks/summarizing-gemini.ipynb)
- Focused summarization techniques
- Shipping and delivery summaries
- Price and value analysis
- Multiple review processing

### [iterative-PEG-development-gemini.ipynb](./notebooks/iterative-PEG-development-gemini.ipynb)
- Marketing copy generation
- Prompt refinement process
- Technical specification handling
- HTML output formatting

## Applications

### [Rouf Translator Chatbot](./rouf_translator_chabot/)
A multilingual translation chatbot built with FastAPI and Google Gemini, featuring:
- **Web Interface**: Interactive chat interface with real-time translation
- **Multiple Language Support**: Translation between various language pairs
- **Structured Translation Workflow**: Agent-based architecture with prompt engineering
- **RESTful API**: Clean API endpoints for integration
- **Modern Frontend**: Responsive design with TailwindCSS

#### Key Features
- Real-time translation using Google Gemini 2.5 Flash
- Structured prompt engineering for consistent translation quality
- Agent-based architecture for extensible translation workflows
- Web-based chat interface with WebSocket support
- Comprehensive error handling and logging

#### Quick Start
```bash
cd rouf_translator_chabot
pip install -r requirements.txt
copy .env.example .env
# Edit .env with your GEMINI_API_KEY
python main.py
```

## Project Structure

```
PEG/
|
|--- notebooks/                              # Jupyter notebooks with examples
|    |--- guidelines_PEG_gemini.ipynb        # Prompting principles and techniques
|    |--- chatbot-gemini.ipynb               # Chat format and conversation handling
|    |--- expanding-gemini.ipynb             # Customized response generation
|    |--- inferring-gemini.ipynb             # Sentiment analysis and topic extraction
|    |--- iterative-PEG-development-gemini.ipynb  # Prompt refinement process
|    |--- summarizing-gemini.ipynb           # Focused summarization techniques
|
|--- rouf_translator_chabot/                # Multilingual translation chatbot application
|    |--- agents/                           # Translation agent implementations
|    |--- config/                           # Configuration and logging utilities
|    |--- models/                           # Data models and schemas
|    |--- static/                           # Frontend assets (CSS, JavaScript)
|    |--- main.py                           # FastAPI web application
|    |--- requirements.txt                  # Project dependencies
|    |--- README.md                         # Project documentation
|    |--- .env.example                      # Environment variables template
|
|--- .gitignore                    # Git ignore rules
|--- LICENSE.txt                   # MIT License file
|--- README.md                     # This file
```

## Setup Instructions

### Prerequisites
```bash
pip install -U google-generativeai python-dotenv panel jupyter_bokeh fastapi uvicorn
```

### API Configuration
1. Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a `.env` file with your API key:
```
GEMINI_API_KEY=your_api_key_here
```
3. See `.env.example` for reference

## Best Practices

- **Use clear delimiters** to separate different parts of your prompt
- **Ask for structured output** (JSON, HTML, etc.) when needed
- **Provide step-by-step instructions** for complex tasks
- **Iteratively refine prompts** based on model responses
- **Handle rate limiting** with appropriate delays between requests
- **Use temperature=0** for consistent, deterministic results

## Resources

- [Google AI Studio](https://aistudio.google.com/app/apikey) - Get your API key
- [Google Gemini Documentation](https://ai.google.dev/docs/prompt_best_practices)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Google Generative AI Python SDK](https://github.com/google/generative-ai-python)

## Contributing

1. Fork this repository
2. Create a feature branch
3. Add your examples and techniques
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.txt](./LICENSE.txt) file for details.