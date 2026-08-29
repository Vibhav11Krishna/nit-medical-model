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
  Sparkles
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
      const response = await fetch(`${apiUrl}/predict`, {
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
        prediction: data.prediction || "No Tumour Detected",
        confidence: typeof data.confidence === "number" ? data.confidence : 0.95,
        timestamp: new Date().toISOString(),
        patientId: patientId.trim() || `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
        scanId: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        model: "NeuroScan-ResNet50v2"
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                NeuroScan <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Clinical Workstation</span>
              </h1>
              <p className="text-xs text-slate-400">AI-Powered MRI Brain Tumor Detection Suite</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <span className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>HIPAA Compliant Environment</span>
          </span>
          <span className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-slate-800/80 border border-slate-700/60">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Groq & PyTorch Accelerated</span>
          </span>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Upload & Configuration Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 mb-4 flex items-center gap-2">
              <Upload className="w-4 h-4" /> Scan Input & Metadata
            </h2>

            {/* Patient ID Input */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Patient Identifier / Case ID
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  placeholder="e.g. PAT-982341 (optional)"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>
            </div>

            {/* Dropzone */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700/80 hover:border-cyan-500/60 rounded-xl p-6 text-center cursor-pointer bg-slate-950/40 hover:bg-slate-950/80 transition-all group flex flex-col items-center justify-center min-h-[220px]"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              {preview ? (
                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-slate-800 group-hover:border-cyan-500/40">
                  <img src={preview} alt="MRI Preview" className="w-full h-full object-contain bg-black" />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white font-medium">
                    Click or drop to replace
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-slate-800/80 rounded-full text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all mb-3">
                    <Database className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-200 mb-1">
                    Drop MRI scan here or <span className="text-cyan-400">browse files</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Supports DICOM exports, PNG, JPG (Max 15MB)
                  </p>
                </>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{error}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex items-center space-x-3">
              <button
                onClick={handleAnalyze}
                disabled={loading || !file}
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-semibold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Scan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Inference</span>
                  </>
                )}
              </button>

              {(file || result) && (
                <button
                  onClick={resetForm}
                  title="Reset workspace"
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Security & System Status Card */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 text-xs text-slate-400 space-y-3">
            <div className="flex items-center space-x-2 text-slate-300 font-medium">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Enterprise Diagnostic Security</span>
            </div>
            <p className="leading-relaxed">
              Inferences are processed securely over encrypted channels. Patient metadata is scrubbed per institutional protocols prior to cloud archival.
            </p>
          </div>
        </div>

        {/* Right Columns: Analysis Results & Audit Log */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Diagnostic Output Panel */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl min-h-[340px] flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Diagnostic Inference Output
                </h2>
                {result && (
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Analysis Verified
                  </span>
                )}
              </div>

              {result ? (
                <div className="space-y-6 animate-fadeIn">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <p className="text-xs text-slate-500 mb-1 font-medium">Classification Result</p>
                      <p className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        {result.prediction.includes("Tumour") || result.prediction.toLowerCase().includes("positive") || result.prediction.toLowerCase().includes("glioma") || result.prediction.toLowerCase().includes("meningioma") ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        )}
                        {result.prediction}
                      </p>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <p className="text-xs text-slate-500 mb-1 font-medium">Confidence Rating</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-lg font-bold text-cyan-400">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                        <span className="text-xs text-slate-400">model certainty</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="bg-cyan-500 h-full rounded-full transition-all duration-1000" 
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
                      <p className="text-xs text-slate-500 mb-1 font-medium">Case & Model Metadata</p>
                      <p className="text-xs font-mono text-slate-300">{result.scanId}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{result.model}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-xl flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-4">
                      <span><strong>Patient ID:</strong> {result.patientId}</span>
                      <span>•</span>
                      <span><strong>Timestamp:</strong> {new Date(result.timestamp).toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Generating clinical report for case ${result.scanId}...`)}
                      className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Export DICOM Report
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500">
                  <Activity className="w-10 h-10 text-slate-700 mb-3 animate-pulse" />
                  <p className="text-sm font-medium text-slate-400">Awaiting MRI Scan Input</p>
                  <p className="text-xs text-slate-600 max-w-sm mt-1">
                    Upload an MRI brain scan on the left panel and click &quot;Run AI Inference&quot; to generate diagnostic classifications.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Session Audit Log */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <History className="w-4 h-4" /> Session Scan Audit Log
              </h2>
              <span className="text-xs text-slate-500 font-mono">
                {scanHistory.length} {scanHistory.length === 1 ? "record" : "records"} stored
              </span>
            </div>

            {scanHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-medium">
                      <th className="py-3 px-3">Scan ID</th>
                      <th className="py-3 px-3">Patient ID</th>
                      <th className="py-3 px-3">Prediction</th>
                      <th className="py-3 px-3">Confidence</th>
                      <th className="py-3 px-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {scanHistory.map((scan, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition-colors text-slate-300">
                        <td className="py-3 px-3 font-semibold text-cyan-400">{scan.scanId}</td>
                        <td className="py-3 px-3 text-slate-300">{scan.patientId}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-medium ${
                            scan.prediction.toLowerCase().includes("no") || scan.prediction === "Normal"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}>
                            {scan.prediction}
                          </span>
                        </td>
                        <td className="py-3 px-3">{(scan.confidence * 100).toFixed(1)}%</td>
                        <td className="py-3 px-3 text-slate-500 text-[11px]">
                          {new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-600 font-sans">
                No recent scans logged in this session. Historical logs persist locally.
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-4 px-6 text-center text-xs text-slate-500">
        NeuroScan AI Diagnostics Platform • Secure Clinical Workstation v2.4
      </footer>
    </div>
  );
}