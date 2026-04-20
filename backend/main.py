from fastapi import FastAPI, UploadFile, File
import shutil
import os
import json
from fastapi.middleware.cors import CORSMiddleware

from ocr_models.easyocr_model import run_easyocr
from ocr_models.tesseract_model import run_tesseract

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "database", "feedback.json")
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOAD_DIR, exist_ok=True)

# ensure DB exists
if not os.path.exists(DB_PATH):
    with open(DB_PATH, "w") as f:
        json.dump([], f)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_path = f"{UPLOAD_DIR}/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result1 = run_easyocr(file_path)
    result2 = run_tesseract(file_path)

    return {
        "model1": result1,
        "model2": result2,
        "filename": file.filename
    }

@app.post("/feedback/")
async def save_feedback(data: dict):
    with open(DB_PATH, "r") as f:
        db = json.load(f)

    db.append(data)

    with open(DB_PATH, "w") as f:
        json.dump(db, f, indent=4)

    return {"status": "saved"}