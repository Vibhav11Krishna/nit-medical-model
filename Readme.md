<div align="center">

#  NeuroScan RF Cloud
### Enterprise-Grade Brain Tumor Classification & Diagnostic Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://nit-medical-model.vercel.app/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Scikit-learn](https://img.shields.io/badge/ML-Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)

*An advanced medical machine learning application engineered to bridge raw radiological imaging and actionable diagnostic insights using a Random Forest ensemble core.*

</div>

---

##  Overview

**NeuroScan RF** is an end-to-end full-stack AI platform built to process multi-dimensional brain MRI scans, convert image tensors into structured arrays, and classify tumor types with high clinical precision. Originally developed during an internship training program as a local machine learning script, the project has since evolved into a production-ready cloud application featuring a decoupled **Next.js** frontend and an asynchronous **FastAPI** inference engine.



---

##  Key Features

* **Automated Pathology Mapping:** Instantly categorizes multi-dimensional brain scans into distinct classifications (**Glioma, Meningioma, Pituitary, and Normal**) with granular probability breakdowns.
* **Ensemble Random Forest Core:** Utilizes robust decision tree bagging via Scikit-learn, preventing overfitting and maintaining high diagnostic generalizability.
* **OpenCV Preprocessing Pipeline:** Automatically loads raw scans, resizes matrices, and executes median blur noise reduction to optimize contrast before feature extraction.
* **Rigorous Error Analysis:** Integrates confusion matrices and precision-recall metrics to verify true positive rates and model certainty in real-time.
* **Zero Local Retention Guarantee:** Processes all uploaded image tensors via secure memory buffers with immediate teardown post-inference to protect patient confidentiality.

---

##  Tech Stack

* **Frontend:** Next.js, React, Tailwind CSS, TypeScript
* **Backend & API:** Python, FastAPI, Uvicorn
* **Machine Learning & Data:** Scikit-learn, NumPy, Pandas
* **Image Processing:** OpenCV (`cv2`), Matplotlib
* **Deployment:** Vercel (Cloud Hosting) , Render (Backend) .

---

##  System Architecture & Data Flow

```text
[ Raw MRI Scan ] 
       │
       ▼ (OpenCV & OS Module)
[ Directory Scan & Normalization ]
       │
       ▼ (NumPy / Pandas)
[ Tensor Flattening & Structuring ]
       │
       ▼ (FastAPI Backend)
[ Scikit-learn Random Forest Engine ]
       │
       ▼
[ Multi-Class Diagnostic Result & Confidence Score ]
```

---

##  Local Installation & Setup

If you want to run this project locally, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Vibhav11Krishna/nit-medical-model.git
cd nit-medical-model
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts ctivate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

##  Future Roadmap

* **Deep Learning Integration:** Transitioning from baseline Random Forest models to advanced Convolutional Neural Networks (CNNs) and Vision Transformers (ViTs) for enhanced feature extraction.
* **Secure Role-Based Access Control (RBAC):** Implementing authentication layers tailored for clinical staff and administrators.
* **DICOM File Support:** Expanding file format handling beyond standard raster images to natively support raw clinical DICOM imaging standards.

---

## 👤 Author

**Pulkit Krishna**
* GitHub: [@Vibhav11Krishna](https://github.com/Vibhav11Krishna)
* Portfolio Project: [NeuroScan RF Live Demo](https://nit-medical-model.vercel.app/)
