from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import joblib
import cv2

app = FastAPI(title="Brain Tumor Detection API")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Load Brain Model
BRAIN_MODEL_PATH = "models/brain_tumor_model.pkl"
brain_model = joblib.load(BRAIN_MODEL_PATH)

# Class Labels (Mapped: 0 -> No Tumor, 1 -> Glioma, 2 -> Meningioma, 3 -> Pituitary)
BRAIN_CLASSES = ["No Tumor", "Glioma", "Meningioma", "Pituitary"]

# 2. Image Preprocessing Function

def preprocess_for_ml(image_bytes: bytes, target_size=(64, 64)) -> np.ndarray:
    """Preprocesses image into a 1D feature vector for Scikit-Learn (.pkl) models.
    Matches training pipeline: Grayscale -> Resize -> Median Blur -> Raw Flatten (0-255).
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)

    if img is None:
        raise ValueError("Could not decode image.")

    # 1. Resize to (64, 64)
    img = cv2.resize(img, target_size)

    # 2. Noise reduction: Median Blur (kernel size 3)
    denoised = cv2.medianBlur(img, 3)

    # 3. Flatten raw pixel values (0-255, no division by 255)
    return denoised.flatten().reshape(1, -1)

# 3. Prediction Endpoint

@app.post("/predict/brain")
async def predict_brain(file: UploadFile = File(...)):
    contents = await file.read()

    try:
        # ML (.pkl) Pipeline
        features = preprocess_for_ml(contents, target_size=(64, 64))
        
        # Predict class
        pred = brain_model.predict(features)[0]
        
        # Get probability score if supported
        if hasattr(brain_model, "predict_proba"):
            probs = brain_model.predict_proba(features)[0]
            confidence = float(np.max(probs))
        else:
            confidence = 1.0

        # Safe label lookup
        if isinstance(pred, (int, np.integer, float)):
            pred_idx = int(pred)
            if 0 <= pred_idx < len(BRAIN_CLASSES):
                label = BRAIN_CLASSES[pred_idx]
            else:
                label = f"Class {pred_idx}"
        else:
            label = str(pred)

        return {
            "model": "Brain Tumor Detection (Machine Learning)",
            "prediction": label,
            "confidence": round(confidence, 4),
            "details": f"Machine Learning model classified scan as '{label}'."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Brain Model Error: {str(e)}")