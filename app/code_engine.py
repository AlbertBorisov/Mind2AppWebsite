def generate_html_code_from_prompt(prompt: str) -> str:
    # Aufgaben aus dem Prompt extrahieren
    tasks = [t.strip().capitalize() for t in prompt.split("mit")[-1].split(",") if t.strip()]
    items = "\n".join([f"<li><input type='checkbox'> {t}</li>" for t in tasks])

    # HTML-Ausgabe
    return f"""<!DOCTYPE html>
<html lang=\"de\">
<head>
    <meta charset=\"UTF-8\">
    <title>To-Do-Liste</title>
    <style>
        body {{ font-family: Arial, sans-serif; background: #f0f0f0; color: #333; padding: 2rem; }}
        h1 {{ color: #007acc; }}
        ul {{ list-style: none; padding: 0; }}
        li {{ margin: 0.5rem 0; }}
    </style>
</head>
<body>
    <h1>To-Do-Liste</h1>
    <ul>{items}</ul>
</body>
</html>"""
