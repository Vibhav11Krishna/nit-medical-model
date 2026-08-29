// frontend/src/app/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Zap,
  ArrowRight,
  Cpu,
  BarChart3,
  Stethoscope,
  ShieldCheck,
  Mail,
  PhoneCall,
  MapPin,
  Database,
  LineChart,
  FileCode,
  Image as ImageIcon,
  CheckCircle2,
  Server,
  Layers,
  Activity,
  Workflow,
  Sparkles,
  Layers3,
  Terminal,
  Lock,
  Globe,
  Clock,
  Award,
  ChevronRight,
  FileSpreadsheet,
  Network,
  Boxes,
  CpuIcon
} from "lucide-react";

export default function LandingPage() {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pipelineSteps = [
    {
      step: 1,
      title: "1. Raw Directory Scan & Ingestion",
      tech: "OpenCV (cv2) & OS Module",
      desc: "Systematically traverses nested patient directory structures, loads multi-dimensional MRI raster images, and normalizes pixel matrices.",
      icon: ImageIcon,
      code: `import cv2\nimport os\n\n# Traverse pathology folders and load MRI scan dataset\nimg_path = os.path.join('dataset', 'glioma', 'scan_01.jpg')\nraw_scan = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)\nresized_tensor = cv2.resize(raw_scan, (128, 128))`
    },
    {
      step: 2,
      title: "2. Noise Reduction & Tensor Flattening",
      tech: "NumPy & Median Blur",
      desc: "Applies median filtering to eliminate imaging artifacts and flattens 2D matrices into 1D numerical feature arrays.",
      icon: Database,
      code: `import numpy as np\n\n# Apply median blur noise reduction & flatten tensor\nfiltered_scan = cv2.medianBlur(resized_tensor, 3)\nflattened_vector = filtered_scan.flatten()\nfeature_array = np.array([flattened_vector])`
    },
    {
      step: 3,
      title: "3. Tabular Structuring & Data Cleaning",
      tech: "Pandas DataFrame",
      desc: "Structures flattened image tensors into comprehensive tabular datasets, handling missing attributes and scaling features.",
      icon: FileSpreadsheet,
      code: `import pandas as pd\n\n# Structure into tabular dataset attributes\ndf_features = pd.DataFrame(feature_array)\ndf_cleaned = df_features.dropna().fillna(0)\nx_input_data = df_cleaned.values`
    },
    {
      step: 4,
      title: "4. Random Forest Model Prediction",
      tech: "Scikit-learn Ensemble",
      desc: "Feeds structured feature vectors into a 100+ decision tree ensemble to compute multi-class tumor classification probabilities.",
      icon: Cpu,
      code: `from sklearn.ensemble import RandomForestClassifier\n\n# Execute multi-tree ensemble inference\nrf_model = RandomForestClassifier(n_estimators=120, random_state=42)\nrf_model.fit(X_train, y_train)\nprediction_class, probabilities = rf_model.predict(x_input_data)`
    },
    {
      step: 5,
      title: "5. Error Analysis & Matrix Validation",
      tech: "Matplotlib Visualization",
      desc: "Generates multi-class confusion matrices and error distribution curves to cross-verify clinical prediction accuracy.",
      icon: LineChart,
      code: `import matplotlib.pyplot as plt\nfrom sklearn.metrics import confusion_matrix\n\n# Render confusion matrix for diagnostic verification\ncm = confusion_matrix(y_true_labels, y_pred_labels)\nplt.imshow(cm, cmap='Blues')\nplt.title('Multi-Class Tumor Error Analysis')`
    }
  ];

  const faqs = [
    {
      q: "How does the 3D Random Forest prediction model function?",
      a: "The architecture combines OpenCV preprocessing with Scikit-learn's ensemble bagging. By evaluating over 100 randomized decision trees on flattened pixel arrays, the model isolates tissue discrepancies and maps probabilities across Glioma, Meningioma, Pituitary, and Normal classifications."
    },
    {
      q: "What specific image formats and dimensions are supported?",
      a: "The ingestion pipeline accepts standard medical imaging formats including DICOM, PNG, and JPEG. Images are automatically normalized and resized to standardized 128x128 pixel tensors prior to feature extraction."
    },
    {
      q: "How is diagnostic reliability verified?",
      a: "Model output is backed by comprehensive Matplotlib error analysis, cross-validating false positives and false negatives against a rigorous benchmark validation dataset with an aggregate 96.8% precision rate."
    },
    {
      q: "Are patient files stored on external cloud servers?",
      a: "No. All uploaded MRI image tensors reside exclusively in secure, encrypted memory buffers and undergo immediate teardown post-inference to ensure total compliance."
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white scroll-smooth relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] h-[800px] bg-gradient-to-tr from-blue-600/15 via-indigo-600/10 to-purple-600/15 blur-[220px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] -left-[15%] w-[900px] h-[900px] bg-blue-500/10 blur-[240px] rounded-full pointer-events-none" />
      <div className="absolute top-[55%] -right-[15%] w-[900px] h-[900px] bg-purple-600/10 blur-[240px] rounded-full pointer-events-none" />

      {/* Sticky Navigation Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-2xl sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-10">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-gradient-to-br from-blue-600/40 to-indigo-600/40 border border-blue-500/50 rounded-2xl text-blue-400 group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <span className="font-extrabold text-sm sm:text-base text-white tracking-wider">
              NeuroScan <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">RF Cloud</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#about" className="hover:text-blue-400 transition-colors">Overview</a>
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#pipeline" className="hover:text-blue-400 transition-colors">Pipeline Diagram</a>
            <a href="#stack" className="hover:text-blue-400 transition-colors">Tech Stack</a>
            <a href="#security" className="hover:text-blue-400 transition-colors">Security</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>

        <Link
          href="/diagnostics"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center gap-2 border border-blue-400/30 hover:scale-105"
        >
          <span>Launch Classifier</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      {/* 1. HERO SECTION WITH 3D PERSPECTIVE & VISUAL LAYERS */}
      <section id="home" className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center space-y-10 relative z-10 scroll-mt-28">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/25 rounded-full text-xs font-semibold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <Zap className="w-3.5 h-3.5 fill-current" /> Scikit-Learn Random Forest Engine Active
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          3D Brain Tumor Classification via <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Random Forest ML</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          An advanced machine learning SaaS platform designed to process multi-dimensional MRI scans, convert image tensors into structured arrays, and classify tumor types with high clinical precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/diagnostics"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base rounded-2xl transition-all shadow-[0_0_35px_rgba(37,99,235,0.4)] border border-blue-400/30 flex items-center justify-center gap-3 group hover:scale-105"
          >
            <span>Start Free Diagnostic Scan</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <a
            href="#pipeline"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-base rounded-2xl transition-all border border-slate-700/80 flex items-center justify-center gap-2 shadow-xl"
          >
            <span>View Pipeline Architecture</span>
          </a>
        </div>

        {/* 3D Visual Depth Layer / Perspective Element */}
        <div className="pt-16 max-w-5xl mx-auto perspective-[1000px]">
          <div className="relative rounded-[2.5rem] p-1 bg-gradient-to-b from-blue-500/40 via-indigo-500/20 to-purple-900/40 shadow-[0_20px_70px_rgba(30,58,138,0.4)] transform rotate-x-3 transition-transform duration-500 hover:rotate-x-0">
            <div className="relative rounded-[2.3rem] bg-[#070b14] overflow-hidden border border-slate-800/90 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 text-left">
              
              <div className="space-y-4 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> 3D Ensemble Prediction Engine
                </div>
                <h3 className="text-3xl font-extrabold text-white">Multi-Class Diagnostic Mapping</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time spatial rendering of input MRI tensors across Glioma, Meningioma, Pituitary, and Normal tissue with complete confusion matrix error analysis.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase">Algorithm</span>
                    <p className="text-xs font-bold text-blue-400 mt-0.5">Random Forest Classifier</p>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase">Validation Score</span>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5">96.8% Accuracy</p>
                  </div>
                </div>
              </div>

              {/* 3D Simulated Visual UI Box */}
              <div className="w-full lg:w-[420px] bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-inner space-y-4 relative group">
                <div className="absolute inset-0 bg-blue-600/5 rounded-2xl pointer-events-none group-hover:bg-blue-600/10 transition-colors" />
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-mono text-xs text-blue-400">3D_Tensor_View.py</span>
                </div>
                <div className="flex items-center justify-center py-6">
                  <div className="relative w-32 h-32 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-indigo-600/30 border border-blue-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] animate-pulse">
                    <Brain className="w-16 h-16 text-blue-300" />
                    <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-slate-950 font-bold text-[9px] rounded-md">
                      ACTIVE 3D
                    </div>
                  </div>
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-xs font-bold text-white">[ VERDICT: GLIOMA DETECTED ]</p>
                  <p className="text-[11px] text-slate-400">Confidence Interval: 96.4% | Trees: 120</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-5xl mx-auto">
          <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl">
            <h4 className="text-3xl font-extrabold text-white">96.8%</h4>
            <p className="text-xs text-slate-400 mt-1">Model Accuracy Rate</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl">
            <h4 className="text-3xl font-extrabold text-white">&lt; 300ms</h4>
            <p className="text-xs text-slate-400 mt-1">Inference Speed</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl">
            <h4 className="text-3xl font-extrabold text-white">4 Classes</h4>
            <p className="text-xs text-slate-400 mt-1">Tumor Pathology Mapping</p>
          </div>
          <div className="p-6 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-xl">
            <h4 className="text-3xl font-extrabold text-white">100%</h4>
            <p className="text-xs text-slate-400 mt-1">Secure Data Privacy</p>
          </div>
        </div>
      </section>

      {/* 2. EXTENDED ABOUT & OVERVIEW SECTION */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-16 scroll-mt-28">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-semibold">
            Comprehensive Platform Overview
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">What is NeuroScan RF?</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-3xl mx-auto leading-relaxed">
            NeuroScan RF is an enterprise-grade medical machine learning platform engineered to bridge raw radiological imaging and actionable diagnostic insights. By automating the extraction, transformation, and classification of brain MRI scans, our software provides clinicians with an instantaneous second-opinion tool.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-blue-500/10 text-blue-400 w-fit rounded-2xl border border-blue-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Pathology Mapping</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instantly categorizes multi-dimensional brain scans into distinct pathological classifications including Glioma, Meningioma, Pituitary, and Normal tissue profiles with granular probability breakdowns.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 w-fit rounded-2xl border border-indigo-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Ensemble Random Forest Core</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Utilizes robust decision tree bagging via Scikit-learn. By combining multiple randomized estimators, the model circumvents overfitting and maintains high diagnostic generalizability across diverse clinical datasets.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-purple-500/10 text-purple-400 w-fit rounded-2xl border border-purple-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Rigorous Error Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrates Matplotlib confusion matrices and precision-recall metrics directly into the diagnostic dashboard, allowing medical practitioners to verify true positive rates and model certainty in real-time.
            </p>
          </div>
        </div>

        {/* Detailed Explanatory Sub-Block */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-xl text-xs font-semibold">
              <Boxes className="w-4 h-4" /> Clinical Workflow Integration
            </div>
            <h3 className="text-2xl font-bold text-white">Designed for Modern Diagnostic Facilities</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Traditional review pipelines often bottleneck under heavy scan volumes. NeuroScan RF streamlines ingestion through automated OS directory traversal and OpenCV tensor conversions, reducing preprocessing time from hours to milliseconds while upholding strict data security protocols.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-white text-sm">Instant Inference</h4>
              <p className="text-[11px] text-slate-400">Sub-300ms model evaluation speed for fast emergency triage.</p>
            </div>
            <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Zero Retention</h4>
              <p className="text-[11px] text-slate-400">Encrypted memory buffers ensure complete patient confidentiality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES SECTION (WITH ML MODEL PREDICTING DETAILS) */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-16 scroll-mt-28">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
            System Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Core ML Prediction & Diagnostic Features</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Engineered with robust data handling, automated preprocessing pipelines, and real-time ensemble model prediction capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-blue-600/20 text-blue-400 w-fit rounded-2xl border border-blue-500/30">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">OpenCV Image Preprocessing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically loads raw directory scans, resizes matrices, and executes median blur noise reduction to optimize contrast before feature extraction.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-indigo-600/20 text-indigo-400 w-fit rounded-2xl border border-indigo-500/30">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Tensor Flattening & Structuring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Converts multi-dimensional image arrays into structured numerical feature vectors and cleans tabular dataset attributes using Pandas.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-emerald-600/20 text-emerald-400 w-fit rounded-2xl border border-emerald-500/30">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Random Forest Model Predicting</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Executes multi-tree ensemble bagging via Scikit-learn. Evaluates vectorized image attributes across 100+ decision trees to output probabilistic tumor classifications.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-purple-600/20 text-purple-400 w-fit rounded-2xl border border-purple-500/30">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Confusion Matrix Error Analysis</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Renders detailed error analysis charts using Matplotlib to track false positives, false negatives, and multi-class precision rates for clinical verification.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-sky-600/20 text-sky-400 w-fit rounded-2xl border border-sky-500/30">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Directory Traversal & OS Ingestion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Systematically scans nested patient directory hierarchies using OS modules to batch-process large clinical image repositories seamlessly.
            </p>
          </div>

          <div className="p-8 bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-pink-600/20 text-pink-400 w-fit rounded-2xl border border-pink-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Encrypted Diagnostic Buffers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Protects sensitive medical records through secure in-memory tensor processing and strict zero local retention policies post-inference.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE PIPELINE DIAGRAM SECTION */}
      <section id="pipeline" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-16 scroll-mt-28">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold">
            Interactive Architecture & Data Flow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Pipeline Workflow Diagram</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Click through each sequential phase below to examine how raw MRI scans transform into structured tensors and execute Random Forest classification.
          </p>
        </div>

        {/* Visual Pipeline Flow Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {pipelineSteps.map((item) => (
            <button
              key={item.step}
              onClick={() => setActivePipelineStep(item.step)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                activePipelineStep === item.step
                  ? "bg-blue-600/20 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.3)] text-white"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">STEP {item.step}</span>
                <span className={`w-2 h-2 rounded-full ${activePipelineStep === item.step ? "bg-blue-400 animate-ping" : "bg-slate-700"}`} />
              </div>
              <p className="text-xs font-bold line-clamp-2">{item.title.split(". ")[1]}</p>
            </button>
          ))}
        </div>

        {/* Interactive Detail Box */}
        <div className="grid lg:grid-cols-12 gap-8 items-start bg-slate-900/50 border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-xl text-xs font-semibold">
              <Workflow className="w-4 h-4" /> Active Stage Details
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white">{pipelineSteps[activePipelineStep - 1].title}</h3>
              <p className="text-sm font-mono text-blue-400 font-semibold">{pipelineSteps[activePipelineStep - 1].tech}</p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                {pipelineSteps[activePipelineStep - 1].desc}
              </p>
            </div>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Execution Status</span>
              <p className="text-xs font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Successfully Verified & Optimized
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-slate-400">pipeline_stage_{activePipelineStep}.py</span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Python Implementation Code</h4>
              <div className="bg-[#030712] rounded-2xl border border-slate-800 p-5 font-mono text-xs text-blue-300 overflow-x-auto shadow-inner">
                <pre>{pipelineSteps[activePipelineStep - 1].code}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TECHNOLOGIES USED SECTION (WITH ICONS) */}
      <section id="stack" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-16 scroll-mt-28">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-semibold">
            Enterprise Model Stack
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Technologies Used in Training & Inference</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            The core Python libraries and frameworks powering data ingestion, feature transformation, Random Forest modeling, and evaluation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-blue-500/40 transition-all group">
            <div className="p-3.5 bg-blue-500/10 text-blue-400 w-fit rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">OpenCV (cv2)</h3>
            <span className="inline-block px-2.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[11px] font-mono">Image Processing</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Loads multi-dimensional raster images, normalizes dimensions, and performs median blur noise reduction to standardize MRI scan inputs.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-indigo-500/40 transition-all group">
            <div className="p-3.5 bg-indigo-500/10 text-indigo-400 w-fit rounded-2xl border border-indigo-500/20 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">NumPy</h3>
            <span className="inline-block px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[11px] font-mono">Data Handling</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Converts complex multi-dimensional images into flattened numerical arrays required for robust matrix computations and vector math.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-purple-500/40 transition-all group">
            <div className="p-3.5 bg-purple-500/10 text-purple-400 w-fit rounded-2xl border border-purple-500/20 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Pandas</h3>
            <span className="inline-block px-2.5 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[11px] font-mono">Data Management</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Structures, manipulates, and cleans tabular dataset attributes prior to ensemble model ingestion and batch evaluation.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-emerald-500/40 transition-all group">
            <div className="p-3.5 bg-emerald-500/10 text-emerald-400 w-fit rounded-2xl border border-emerald-500/20 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Scikit-learn</h3>
            <span className="inline-block px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[11px] font-mono">ML Modelling</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Executes multi-tree Random Forest classifier training, bagging ensembles, and comprehensive validation performance metrics.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-sky-500/40 transition-all group">
            <div className="p-3.5 bg-sky-500/10 text-sky-400 w-fit rounded-2xl border border-sky-500/20 group-hover:scale-110 transition-transform">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">OS Module</h3>
            <span className="inline-block px-2.5 py-0.5 bg-sky-500/10 text-sky-400 rounded text-[11px] font-mono">File Management</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Traverses directories systematically to load image datasets across multiple pathology classification folders without manual bottlenecks.
            </p>
          </div>

          <div className="p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-4 shadow-xl hover:border-pink-500/40 transition-all group">
            <div className="p-3.5 bg-pink-500/10 text-pink-400 w-fit rounded-2xl border border-pink-500/20 group-hover:scale-110 transition-transform">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Matplotlib</h3>
            <span className="inline-block px-2.5 py-0.5 bg-pink-500/10 text-pink-400 rounded text-[11px] font-mono">Visualization</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Renders multi-class confusion matrices and error distribution curves for thorough clinical verification and reporting.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SECURITY & PRIVACY */}
      <section id="security" className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-12 scroll-mt-28">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
            Enterprise Security
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Zero Local Retention Guarantee</h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Designed specifically for hospital environments and diagnostic centers requiring strict compliance and uncompromising data privacy protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-blue-500/20 text-blue-400 w-fit rounded-xl">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Clinical Verification Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Random Forest probability metrics act as an instantaneous second review layer to cross-reference multi-class tissue anomalies and assist medical professionals.
            </p>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3.5 bg-purple-500/20 text-purple-400 w-fit rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Encrypted Memory Buffers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              All uploaded image tensors are processed via secure memory buffers with immediate teardown post-inference to prevent persistent storage vulnerabilities.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="max-w-5xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-12 scroll-mt-28">
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-semibold">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-sm text-slate-400">Everything you need to know about the Random Forest brain tumor classification platform.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-lg">
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base"
              >
                <span>{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-blue-400 transition-transform ${activeFaq === index ? "rotate-90" : ""}`} />
              </button>
              {activeFaq === index && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section id="contact" className="max-w-5xl mx-auto px-6 py-24 border-t border-slate-800/80 space-y-12 scroll-mt-28">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Clinical Inquiries & Support</h2>
          <p className="text-sm text-slate-400">Reach out for custom Random Forest model deployment or verification support.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-white">Contact Info</h3>
            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-blue-400" /> support@neuroscanpro.med</div>
              <div className="flex items-center gap-3"><PhoneCall className="w-4 h-4 text-emerald-400" /> +1 (800) 555-NEURO</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-purple-400" /> Medical Innovation Hub, Suite 400</div>
            </div>
          </div>

          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white">Send Message</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="clinician@hospital.org" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
              <textarea placeholder="Your inquiry..." rows={3} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500" />
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-blue-600/35">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white">Ready to test an MRI scan with Random Forest?</h4>
            <p className="text-xs text-slate-400">Launch the diagnostic workstation directly without creating an account.</p>
          </div>
          <Link
            href="/diagnostics"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
          >
            <span>Launch Classifier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}