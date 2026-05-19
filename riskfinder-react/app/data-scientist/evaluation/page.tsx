"use client";
import Link from "next/link";
import { useState } from "react";

export default function EvalPage() {
  const [model, setModel] = useState("LightGBM_Optuna");
  const [valid, setValid] = useState("Holdout (20%)");

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <span className="font-mono text-xs text-steel tracking-widest">— 05 / MODEL EVALUATION</span>
          <h1 className="font-display text-4xl font-bold text-navy mt-1">Evaluasi Model</h1>
          <p className="text-steel mt-1">
            Visualisasi performa untuk kombinasi <span className="font-mono text-navy">Model × Hyperparameter</span>.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <select className="field !py-2 !w-auto" value={model} onChange={e => setModel(e.target.value)}>
            <option>LightGBM_Optuna</option>
            <option>XGBoost_Bayesian</option>
            <option>RandomForest_RandomSearch</option>
          </select>
          <select className="field !py-2 !w-auto" value={valid} onChange={e => setValid(e.target.value)}>
            <option>Holdout (20%)</option>
            <option>K-Fold CV (k=5)</option>
            <option>LOO CV</option>
          </select>
        </div>
      </div>

      {/* TOP METRIC CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="card p-5 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-mint/15 rounded-full" />
          <div className="text-xs font-mono uppercase tracking-widest text-steel">ROC-AUC</div>
          <div className="font-display text-4xl font-bold text-navy mt-1">0.842</div>
          <div className="text-xs text-mint mt-1">▲ +0.018 vs baseline</div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">Accuracy</div>
          <div className="font-display text-4xl font-bold text-navy mt-1">81.3%</div>
          <div className="text-xs text-steel mt-1">5-fold mean</div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">Recall (default)</div>
          <div className="font-display text-4xl font-bold text-navy mt-1">64.1%</div>
          <div className="text-xs text-warn mt-1">Critical for bank</div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">F1-Score</div>
          <div className="font-display text-4xl font-bold text-navy mt-1">0.68</div>
          <div className="text-xs text-steel mt-1">Balanced</div>
        </div>
      </div>

      {/* ROC + CM */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-lg font-bold text-navy">Learning Curve — ROC-AUC (train vs test)</h3>
            <span className="chip bg-paperdark text-steel">function: learning_curve_train_test_auc_flex()</span>
          </div>
          <svg viewBox="0 0 600 280" className="w-full h-auto">
            <defs>
              <linearGradient id="trainG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E5AA8" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#1E5AA8" stopOpacity="0"/>
              </linearGradient>
              <linearGradient id="testG" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00C49A" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="#00C49A" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <g stroke="rgba(10,37,64,0.07)">
              <line x1="40" y1="40"  x2="580" y2="40"/>
              <line x1="40" y1="100" x2="580" y2="100"/>
              <line x1="40" y1="160" x2="580" y2="160"/>
              <line x1="40" y1="220" x2="580" y2="220"/>
            </g>
            <g fontFamily="monospace" fontSize="10" fill="#5B6B7F">
              <text x="10" y="44">1.00</text><text x="10" y="104">0.85</text>
              <text x="10" y="164">0.70</text><text x="10" y="224">0.55</text>
            </g>
            <path d="M40,80 C120,75 200,68 280,65 C360,62 440,60 580,58 L580,220 L40,220 Z" fill="url(#trainG)"/>
            <path d="M40,80 C120,75 200,68 280,65 C360,62 440,60 580,58" fill="none" stroke="#1E5AA8" strokeWidth="2.5"/>
            <path d="M40,170 C120,140 200,120 280,110 C360,102 440,98 580,94 L580,220 L40,220 Z" fill="url(#testG)"/>
            <path d="M40,170 C120,140 200,120 280,110 C360,102 440,98 580,94" fill="none" stroke="#00C49A" strokeWidth="2.5"/>
            <g fill="#0A2540">
              <circle cx="40" cy="170" r="3"/><circle cx="180" cy="125" r="3"/><circle cx="320" cy="106" r="3"/><circle cx="460" cy="98" r="3"/><circle cx="580" cy="94" r="3"/>
            </g>
            <g fontSize="11" fill="#0A2540">
              <rect x="430" y="244" width="12" height="3" fill="#1E5AA8"/><text x="448" y="248">Train AUC</text>
              <rect x="520" y="244" width="12" height="3" fill="#00C49A"/><text x="538" y="248">Test AUC</text>
            </g>
            <text x="40"  y="270" fontFamily="monospace" fontSize="9" fill="#5B6B7F">10%</text>
            <text x="180" y="270" fontFamily="monospace" fontSize="9" fill="#5B6B7F">30%</text>
            <text x="320" y="270" fontFamily="monospace" fontSize="9" fill="#5B6B7F">50%</text>
            <text x="460" y="270" fontFamily="monospace" fontSize="9" fill="#5B6B7F">75%</text>
            <text x="560" y="270" fontFamily="monospace" fontSize="9" fill="#5B6B7F">100%</text>
          </svg>
        </div>

        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-4">Confusion Matrix</h3>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="cm-cell bg-mint/20 text-navy">
              <div className="text-xs font-sans font-medium text-steel">TN</div>
              <div className="text-2xl">4,201</div>
            </div>
            <div className="cm-cell bg-warn/20 text-navy">
              <div className="text-xs font-sans font-medium text-steel">FP</div>
              <div className="text-2xl">478</div>
            </div>
            <div className="cm-cell bg-danger/20 text-navy">
              <div className="text-xs font-sans font-medium text-steel">FN</div>
              <div className="text-2xl">395</div>
            </div>
            <div className="cm-cell bg-mint/20 text-navy">
              <div className="text-xs font-sans font-medium text-steel">TP</div>
              <div className="text-2xl">926</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-steel grid grid-cols-2 gap-2">
            <div>Predicted →</div><div className="text-right">0 &nbsp;&nbsp; 1</div>
          </div>
        </div>
      </div>

      {/* CLASSIFICATION REPORT */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-navy/10 flex justify-between items-center">
          <h3 className="font-display text-lg font-bold text-navy">Classification Report</h3>
          <span className="chip bg-navy text-white">support: 6,000</span>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl w-full text-sm">
            <thead><tr><th>Class</th><th>Precision</th><th>Recall</th><th>F1-Score</th><th>Support</th></tr></thead>
            <tbody>
              <tr><td><span className="chip bg-mint/15 text-navy border border-mint/30">0 · No Default</span></td><td>0.91</td><td>0.90</td><td>0.90</td><td>4,679</td></tr>
              <tr><td><span className="chip bg-danger/15 text-danger border border-danger/30">1 · Default</span></td><td>0.66</td><td>0.70</td><td>0.68</td><td>1,321</td></tr>
              <tr className="bg-paperdark/50"><td><b>macro avg</b></td><td>0.78</td><td>0.80</td><td>0.79</td><td>6,000</td></tr>
              <tr className="bg-paperdark/50"><td><b>weighted avg</b></td><td>0.85</td><td>0.85</td><td>0.85</td><td>6,000</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/data-scientist/build-model" className="btn-ghost">← Kembali</Link>
        <Link href="/credit-analysis" className="btn-primary">Lanjut ke Credit Analysis →</Link>
      </div>
    </div>
  );
}
