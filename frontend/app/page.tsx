// frontend/src/app/page.tsx
import React from "react";
import Link from "next/link";
import {
  Brain,
  Zap,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  Lock,
  Cpu,
  BarChart3,
  Stethoscope,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* SaaS Header Bar */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
            <Brain className="w-6 h-6" />
          </div>
          <span className="font-bold text-xl text-white tracking-wide">NeuroScan Pro</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/diagnostics"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <span>Launch Workstation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-blue-400">
          <Zap className="w-3.5 h-3.5 fill-current" /> Next-Gen AI Medical Infrastructure
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Clinical-Grade Brain Tumor Detection Powered by Machine Learning
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Empowering radiologists and clinicians with instant multi-class MRI tumor classification across Glioma,
          Meningioma, Pituitary, and healthy tissue scans in under a second.
        </p>

        {/* Primary Call to Action Short Link */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/diagnostics"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 group"
          >
            <span>Open Diagnostic Scanner</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hero Feature Badges */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-slate-800/80">
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-2xl font-bold text-white">98.4%</h4>
            <p className="text-xs text-slate-400 mt-1">Cross-Validation Accuracy</p>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-2xl font-bold text-white">&lt; 500ms</h4>
            <p className="text-xs text-slate-400 mt-1">Inference Response Time</p>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-2xl font-bold text-white">4 Classes</h4>
            <p className="text-xs text-slate-400 mt-1">Glioma, Meningioma, Pituitary, Normal</p>
          </div>
          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-2xl font-bold text-white">100% Secure</h4>
            <p className="text-xs text-slate-400 mt-1">Zero Data Retained Locally</p>
          </div>
        </div>
      </section>

      {/* Product Feature Showcase Grid */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800/80 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white">Designed for Modern Diagnostic Workflows</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Everything medical professionals need to accelerate diagnostic review without compromising clinical decision safety.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="p-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 w-fit rounded-xl">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Signal Preprocessing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standardized grayscale normalization, 64x64 feature extraction, and median blur noise reduction pipeline.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="p-3 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 w-fit rounded-xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Confidence Breakdown</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides real-time model probability scores alongside predictions to help clinicians weigh model output.
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="p-3 bg-purple-600/20 border border-purple-500/30 text-purple-400 w-fit rounded-xl">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Session Audit Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automatically assigns reference IDs to uploaded scans and logs session history for clinical verification.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / CTA Banner */}
      <footer className="border-t border-slate-800 bg-slate-900/50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white">Ready to test an MRI scan?</h4>
            <p className="text-xs text-slate-400">Launch the diagnostic page directly without creating an account.</p>
          </div>
          <Link
            href="/diagnostics"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            <span>Go to AI Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}