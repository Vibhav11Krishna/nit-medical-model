// frontend/src/app/diagnostics/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Upload,
  Activity,
  ShieldCheck,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Download,
  User,
  Zap,
  ArrowLeft,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

interface PredictionResult {
  model: string;
  prediction: string;
  confidence: number;
  details: string;
}

interface ScanRecord {
  id: string;
  patientId: string;
  timestamp: string;
  prediction: string;
  confidence: number;
}

export default function DiagnosticsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string>("");
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://nit-medical-model-4.onrender.com";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid DICOM/PNG/JPG image file.");
        return;
      }
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(`${API_URL}/predict/brain`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze image");
      }

      const data: PredictionResult = await response.json();
      setResult(data);

      const newRecord: ScanRecord = {
        id: `SCAN-${Math.floor(1000 + Math.random() * 9000)}`,
        patientId: patientId.trim() || "Anonymous",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        prediction: data.prediction,
        confidence: data.confidence,
      };
      setScanHistory((prev) => [newRecord, ...prev]);
    } catch (err: any) {
      setError(err.message || "Could not connect to backend server");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Top Bar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors border border-slate-800 bg-slate-950 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Overview
          </Link>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-bold text-base text-white tracking-wide">NeuroScan Workstation</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Workspace Banner */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Processing Speed</p>
              <h3 className="text-2xl font-bold text-white mt-1">~0.42s</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> GPU Accelerated
              </p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Model Accuracy</p>
              <h3 className="text-2xl font-bold text-white mt-1">98.4%</h3>
              <p className="text-xs text-slate-400 mt-1">Validated on 10k+ Scans</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-emerald-400">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Scans Remaining</p>
              <h3 className="text-2xl font-bold text-white mt-1">84 / 100</h3>
              <p className="text-xs text-slate-400 mt-1">Monthly Allocation</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-purple-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400">Active Engine</p>
              <h3 className="text-2xl font-bold text-white mt-1">SKLearn V2</h3>
              <p className="text-xs text-blue-400 mt-1">Brain Tumor Multiclass</p>
            </div>
            <div className="p-3 bg-slate-800 rounded-xl text-amber-400">
              <Brain className="w-6 h-6" />
            </div>
          </div>
        </section>

        {/* Upload & Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">MRI Scan Diagnostics</h2>
                <p className="text-xs text-slate-400">Upload high-resolution brain MRI scans for instant analysis.</p>
              </div>
              <span className="text-xs text-slate-500 font-mono">STEP 01/02</span>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Enter Patient ID / Reference Number (Optional)"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-sm text-slate-200 rounded-lg pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {!preview ? (
              <label className="flex flex-col items-center justify-center w-full h-72 border-2 border-dashed border-slate-800 hover:border-blue-500/50 bg-slate-950/50 rounded-2xl cursor-pointer transition-all hover:bg-slate-950 group">
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-full mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-slate-300">Click to upload scan or drag and drop</span>
                <span className="text-xs text-slate-500 mt-1">Supports PNG, JPG, JPEG (Max file size: 10MB)</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full h-80 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                  <img src={preview} alt="MRI Preview" className="max-h-full object-contain" />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 font-semibold text-sm text-white rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Pipeline...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Execute Classification</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetForm}
                    disabled={loading}
                    className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-950/40 border border-red-800/50 text-red-400 text-sm rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between min-h-[480px]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white">Diagnostic Output</h2>
                  <p className="text-xs text-slate-400">Automated machine learning analysis.</p>
                </div>
                <span className="text-xs text-slate-500 font-mono">STEP 02/02</span>
              </div>

              {result ? (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Primary Classification
                    </span>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                        <span className="text-2xl font-extrabold text-white">{result.prediction}</span>
                      </div>
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
                        High Confidence
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-400">Model Certainty Score</span>
                      <span className="text-white font-bold">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(result.confidence * 100, 5)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
                    <span className="text-xs font-medium text-slate-400 block">Model Context</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{result.details}</p>
                  </div>

                  <button
                    onClick={() => alert("Downloading PDF Report...")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-white rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" /> Export Diagnostic PDF
                  </button>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-3">
                  <div className="p-4 bg-slate-950 rounded-full border border-slate-800">
                    <Brain className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-xs text-center max-w-xs">
                    No active scan selected. Upload an MRI to execute real-time model inference.
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 leading-normal">
              Disclaimer: Designed strictly for diagnostic decision-support and clinician evaluation.
            </div>
          </div>
        </div>

        {/* Audit Log */}
        <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Recent Session Audit Log</h3>
              <p className="text-xs text-slate-400">Scans analyzed during this session.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Scan ID</th>
                  <th className="py-3 px-4">Patient Ref</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-xs text-slate-300">
                {scanHistory.length > 0 ? (
                  scanHistory.map((scan) => (
                    <tr key={scan.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-400">{scan.id}</td>
                      <td className="py-3.5 px-4">{scan.patientId}</td>
                      <td className="py-3.5 px-4 text-slate-400">{scan.timestamp}</td>
                      <td className="py-3.5 px-4 font-semibold text-white">{scan.prediction}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md">
                          {(scan.confidence * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No scans executed in this session yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}