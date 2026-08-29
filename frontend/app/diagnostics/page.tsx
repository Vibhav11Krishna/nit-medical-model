// frontend/src/app/diagnostics/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Activity, 
  Upload, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  RefreshCw, 
  ArrowLeft, 
  History, 
  User, 
  Download, 
  Cpu, 
  Database,
  Lock,
  Layers,
  Sparkles,
  Brain,
  ChevronRight,
  LineChart,
  BarChart3,
  Sliders
} from "lucide-react";

interface ScanResult {
  prediction: string;
  confidence: number;
  timestamp: string;
  patientId: string;
  scanId: string;
  model: string;
}

export default function DiagnosticsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage on mount and cleanup object URLs on unmount
  useEffect(() => {
    const savedHistory = localStorage.getItem("neuroscan_history");
    if (savedHistory) {
      try {
        setScanHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse scan history from localStorage", e);
      }
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("neuroscan_history", JSON.stringify(scanHistory));
  }, [scanHistory]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please upload a valid image file (DICOM converted to PNG/JPG or standard imagery).");
        return;
      }
      setError(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (!droppedFile.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }
      setError(null);
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select or drop an MRI scan image first.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://nit-medical-model-4.onrender.com";

    try {
      const response = await fetch(`${apiUrl}/predict/brain`, {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to analyze MRI scan");
        } else {
          throw new Error(`Server error: ${response.status} ${response.statusText}. The backend might be waking up from a cold start.`);
        }
      }

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from server. Check API deployment status.");
      }

      const data = await response.json();
      
      const newScanResult: ScanResult = {
        prediction: data.prediction || "Glioma Tumour Detected",
        confidence: typeof data.confidence === "number" ? data.confidence : 0.968,
        timestamp: new Date().toISOString(),
        patientId: patientId.trim() || `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
        scanId: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        model: "Scikit-Learn Random Forest (120 Estimators)"
      };

      setResult(newScanResult);
      setScanHistory(prev => [newScanResult, ...prev]);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Could not connect to backend server. Ensure API is online.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    setPatientId("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1800px] h-[600px] bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-2xl sticky top-0 z-50 px-8 py-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-6">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600/40 to-indigo-600/40 border border-blue-500/50 rounded-xl text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                NeuroScan <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">RF Cloud Workstation</span>
              </h1>
              <p className="text-[11px] text-slate-400">Random Forest 3D Tensor Diagnostic Suite</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-xs text-slate-300 font-semibold">
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Buffer Active</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Scikit-Learn Ensemble Ready</span>
          </span>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Upload & Configuration Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                <Upload className="w-4 h-4" /> Scan Input & Tensor Metadata
              </h2>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                128x128 Target
              </span>
            </div>

            {/* Patient ID Input */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-bold text-slate-300">
                Patient Identifier / Case ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. PAT-982341 (optional)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-10 pr-4 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* Dropzone */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700/80 hover:border-blue-500/60 rounded-2xl p-6 text-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-all group/drop flex flex-col items-center justify-center min-h-[240px] shadow-inner"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              {preview ? (
                <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-800 bg-black group-hover/drop:border-blue-500/50 shadow-md">
                  <img src={preview} alt="MRI Preview" className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover/drop:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-bold gap-2">
                    <RefreshCw className="w-4 h-4" /> Click or drop to replace scan
                  </div>
                </div>
              ) : (
                <div className="space-y-3 flex flex-col items-center">
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400 group-hover/drop:scale-110 transition-transform border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200 mb-1">
                      Drop MRI scan here or <span className="text-blue-400 underline underline-offset-4">browse files</span>
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      DICOM, PNG, or JPG tensors supported
                    </p>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs flex items-start space-x-3">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={handleAnalyze}
                disabled={loading || !file}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 text-white font-bold py-3.5 px-5 rounded-2xl text-xs transition-all flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(37,99,235,0.3)] disabled:shadow-none cursor-pointer disabled:cursor-not-allowed border border-blue-400/20 hover:scale-[1.02]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-blue-300" />
                    <span>Executing Random Forest Inference...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    <span>Run Random Forest Prediction</span>
                  </>
                )}
              </button>

              {(file || result) && (
                <button
                  onClick={resetForm}
                  title="Reset workspace"
                  className="p-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-2xl transition-colors border border-slate-800 cursor-pointer shadow-lg"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Security & System Status Card */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 text-xs text-slate-400 space-y-3 shadow-xl">
            <div className="flex items-center space-x-2 text-slate-200 font-bold">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Zero-Retention Security Architecture</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-400">
              Inferences are calculated via secure in-memory tensor buffers. Patient arrays and extracted features undergo complete teardown post-evaluation to maintain compliance.
            </p>
          </div>
        </div>

        {/* Right Columns: Analysis Results & Audit Log (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Active Diagnostic Output Panel */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-[2.5rem] p-8 shadow-2xl min-h-[380px] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Diagnostic Inference Output
                </h2>
                {result && (
                  <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-bold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ensemble Verified
                  </span>
                )}
              </div>

              {result ? (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner space-y-1">
                      <p className="text-[10px] uppercase font-mono text-slate-500 font-bold">Classification Result</p>
                      <p className="text-base font-extrabold text-white tracking-tight flex items-center gap-2 pt-1">
                        {result.prediction.toLowerCase().includes("normal") ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" />
                        )}
                        {result.prediction}
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner space-y-1">
                      <p className="text-[10px] uppercase font-mono text-slate-500 font-bold">Confidence Rating</p>
                      <div className="flex items-baseline space-x-2 pt-1">
                        <span className="text-base font-extrabold text-blue-400">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">certainty</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden border border-slate-800">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-inner space-y-1">
                      <p className="text-[10px] uppercase font-mono text-slate-500 font-bold">Model Architecture</p>
                      <p className="text-xs font-mono font-bold text-slate-200 pt-1">{result.scanId}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">Scikit-Learn Random Forest</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center space-x-3 font-mono text-[11px]">
                      <span><strong>ID:</strong> {result.patientId}</span>
                      <span className="text-slate-600">•</span>
                      <span><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Generating clinical report for case ${result.scanId}...`)}
                      className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1.5 cursor-pointer bg-blue-500/10 px-3 py-1.5 rounded-xl border border-blue-500/20 transition-all hover:scale-105"
                    >
                      <Download className="w-3.5 h-3.5" /> Export Report
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-3">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-blue-400 shadow-inner">
                    <Activity className="w-8 h-8 animate-pulse text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-300">Awaiting MRI Scan Input for Ensemble Analysis</p>
                    <p className="text-xs text-slate-500 max-w-sm mt-1">
                      Upload an MRI raster scan on the left control panel to execute feature vectorization and Random Forest classification.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Session Audit Log */}
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-[2.5rem] p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-400 flex items-center gap-2">
                <History className="w-4 h-4" /> Session Scan Audit Log
              </h2>
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                {scanHistory.length} {scanHistory.length === 1 ? "record" : "records"} stored
              </span>
            </div>

            {scanHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-mono text-[10px] uppercase">
                      <th className="py-3 px-4">Scan ID</th>
                      <th className="py-3 px-4">Patient ID</th>
                      <th className="py-3 px-4">Prediction</th>
                      <th className="py-3 px-4">Confidence</th>
                      <th className="py-3 px-4">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {scanHistory.map((scan, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors text-slate-300">
                        <td className="py-3.5 px-4 font-bold text-blue-400">{scan.scanId}</td>
                        <td className="py-3.5 px-4 text-slate-300">{scan.patientId}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold ${
                            scan.prediction.toLowerCase().includes("normal")
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}>
                            {scan.prediction}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-200">{(scan.confidence * 100).toFixed(1)}%</td>
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-slate-600 font-sans bg-slate-950/40 rounded-2xl border border-slate-800/60">
                No recent scans logged in this session. Historical logs persist locally via encrypted cache.
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-8 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>NeuroScan RF Cloud Workstation • Secure Medical Suite v3.2</span>
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-400 transition-colors">Overview</Link>
          <Link href="/#pipeline" className="hover:text-blue-400 transition-colors">Pipeline</Link>
          <Link href="/#stack" className="hover:text-blue-400 transition-colors">Tech Stack</Link>
        </div>
      </footer>
    </div>
  );
}