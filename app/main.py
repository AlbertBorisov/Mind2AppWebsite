from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from app.code_engine import generate_html_code_from_prompt
import os
from datetime import datetime

app = FastAPI()

# Static content bereitstellen
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def form():
    return """
    <h2>Mind2App – GPT App Generator</h2>
    <form action='/generate' method='post'>
        <textarea name='user_text' rows='10' cols='60' placeholder='Beschreibe deine App-Idee...'></textarea><br><br>
        <input type='submit' value='App generieren'>
    </form>
    """

@app.post("/generate")
async def generate(user_text: str = Form(...)):
    html_code = generate_html_code_from_prompt(user_text)
    os.makedirs("static/apps", exist_ok=True)
    filename = f"app_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"
    filepath = os.path.join("static", "apps", filename)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html_code)

    return FileResponse(filepath, filename=filename, media_type="text/html")
