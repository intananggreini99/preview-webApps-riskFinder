"use client";
import Link from "next/link";
import { useState } from "react";

const compareData = [
  { m: "LightGBM",      acc: 0.821, auc: 0.842, rec: 0.641, prec: 0.661, f1: 0.68, tt: 1.2 },
  { m: "XGBoost",       acc: 0.819, auc: 0.839, rec: 0.633, prec: 0.658, f1: 0.67, tt: 2.4 },
  { m: "Random Forest", acc: 0.812, auc: 0.829, rec: 0.610, prec: 0.643, f1: 0.65, tt: 1.8 },
  { m: "CatBoost",      acc: 0.811, auc: 0.835, rec: 0.622, prec: 0.651, f1: 0.66, tt: 3.1 },
  { m: "Logistic Reg.", acc: 0.789, auc: 0.768, rec: 0.534, prec: 0.598, f1: 0.59, tt: 0.3 },
  { m: "Decision Tree", acc: 0.733, auc: 0.671, rec: 0.512, prec: 0.488, f1: 0.50, tt: 0.4 },
  { m: "KNN",           acc: 0.751, auc: 0.701, rec: 0.488, prec: 0.521, f1: 0.51, tt: 0.9 },
  { m: "Naive Bayes",   acc: 0.701, auc: 0.692, rec: 0.499, prec: 0.474, f1: 0.49, tt: 0.2 },
];

const tuningMethods = [
  { v: "Grid Search",           d: "Exhaustive — semua kombinasi parameter." },
  { v: "Random Search",         d: "Sampling acak — cepat & cukup akurat." },
  { v: "Bayesian Optimization", d: "Probabilistik — pintar memilih kandidat." },
  { v: "Optuna",                d: "Framework modern dengan pruning otomatis." },
];

export default function BuildModelPage() {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [running, setRunning] = useState(false);
  const [tuning, setTuning] = useState<string[]>(["Random Search"]);
  const [validation, setValidation] = useState<string[]>(["Holdout"]);
  const [holdoutSize, setHoldoutSize] = useState(20);
  const [manualPicks, setManualPicks] = useState<string[]>([]);

  function runCompare() {
    setRunning(true);
    setTimeout(() => setRunning(false), 1200);
  }

  function toggle(arr: string[], v: string, setter: (a: string[]) => void) {
    if (arr.includes(v)) setter(arr.filter(x => x !== v));
    else setter([...arr, v]);
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-up">
      <div className="mb-8">
        <span className="font-mono text-xs text-steel tracking-widest">— 04 / MODEL BUILDING</span>
        <h1 className="font-display text-4xl font-bold text-navy mt-1">Build Model</h1>
        <p className="text-steel mt-1">Bandingkan model klasifikasi dengan PyCaret, lalu konfigurasi hyperparameter tuning &amp; validation.</p>
      </div>

      {/* COMPARE */}
      <div className="card overflow-hidden mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
          <h3 className="font-display text-lg font-bold text-navy">Compare Models (PyCaret)</h3>
          <button className="btn-accent text-xs" onClick={runCompare}>Run compare_models()</button>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl w-full text-sm">
            <thead>
              <tr><th>#</th><th>Model</th><th>Accuracy</th><th>AUC</th><th>Recall</th><th>Precision</th><th>F1</th><th>TT (s)</th></tr>
            </thead>
            <tbody>
              {running ? (
                <tr><td colSpan={8} className="text-center py-8 text-steel">
                  <span className="inline-block animate-pulse">⚙ Running compare_models()…</span>
                </td></tr>
              ) : compareData.map((r, i) => (
                <tr key={i} className={i < 3 ? "bg-mint/5" : ""}>
                  <td>{i < 3 ? <span className="chip bg-mint/15 text-navy border border-mint/30">TOP {i+1}</span> : i+1}</td>
                  <td className="font-semibold text-navy">{r.m}</td>
                  <td className="font-mono">{r.acc.toFixed(3)}</td>
                  <td className={`font-mono ${i<3?"text-mint font-bold":""}`}>{r.auc.toFixed(3)}</td>
                  <td className="font-mono">{r.rec.toFixed(3)}</td>
                  <td className="font-mono">{r.prec.toFixed(3)}</td>
                  <td className="font-mono">{r.f1.toFixed(2)}</td>
                  <td className="font-mono">{r.tt.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP-3 */}
      <div className="card p-5 mb-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">Pemilihan 3 Model Terbaik</h3>
            <p className="text-sm text-steel">Pilih bagaimana 3 model terbaik akan ditentukan.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMode("auto")}
              className={`btn-ghost text-sm ${mode === "auto" ? "!bg-navy !text-white !border-navy" : ""}`}
            >⚡ Otomatis oleh Sistem</button>
            <button
              onClick={() => setMode("manual")}
              className={`btn-ghost text-sm ${mode === "manual" ? "!bg-navy !text-white !border-navy" : ""}`}
            >Eksplisit oleh User</button>
          </div>
        </div>

        {mode === "auto" ? (
          <div className="mt-4 grid sm:grid-cols-3 gap-3">
            {compareData.slice(0, 3).map((m, i) => (
              <div key={i} className="p-4 rounded-lg bg-gradient-to-br from-mint/10 to-cyan2/10 border border-mint/30">
                <div className="text-xs font-mono text-steel">TOP {i+1}</div>
                <div className="font-display text-xl font-bold text-navy">{m.m}</div>
                <div className="text-xs text-steel mt-1">
                  AUC <span className="font-mono text-navy">{m.auc.toFixed(3)}</span> · F1 <span className="font-mono text-navy">{m.f1.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4 p-3 rounded-lg border border-navy/15 bg-white">
            <p className="text-sm text-steel mb-2">Centang 3 model yang ingin Anda gunakan:</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {compareData.map((m, i) => {
                const checked = manualPicks.includes(m.m);
                return (
                  <label key={i} className={`cbx !p-2 ${checked ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(manualPicks, m.m, setManualPicks)}
                    />
                    <span className="text-sm font-semibold text-navy">{m.m}</span>
                  </label>
                );
              })}
            </div>
            {manualPicks.length > 0 && (
              <div className="mt-3 text-xs text-steel">
                Terpilih: <span className="font-mono text-navy">{manualPicks.join(", ")}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TUNING + VALIDATION */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-1">Metode Hyperparameter Tuning</h3>
          <p className="text-sm text-steel mb-4">Pilih satu atau lebih metode untuk dijalankan.</p>
          <div className="space-y-2">
            {tuningMethods.map(t => {
              const checked = tuning.includes(t.v);
              return (
                <label key={t.v} className={`cbx ${checked ? "checked" : ""}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(tuning, t.v, setTuning)} />
                  <div><b className="text-navy">{t.v}</b><br/><span className="text-xs text-steel">{t.d}</span></div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-1">Metode Validasi Model</h3>
          <p className="text-sm text-steel mb-4">Pilih satu atau lebih metode validasi.</p>
          <div className="space-y-2">
            <label className={`cbx ${validation.includes("Holdout") ? "checked" : ""}`}>
              <input type="checkbox" checked={validation.includes("Holdout")}
                onChange={() => toggle(validation, "Holdout", setValidation)} />
              <div className="w-full">
                <b className="text-navy">Holdout method</b>
                <div className="text-xs text-steel mb-2">Bagi data menjadi train/test sederhana.</div>
                <input type="range" min={10} max={40} value={holdoutSize}
                  onChange={(e) => setHoldoutSize(Number(e.target.value))}
                  className="w-full accent-royal"/>
                <span className="text-xs font-mono text-royal">{holdoutSize}%</span>
              </div>
            </label>
            <label className={`cbx ${validation.includes("K-Fold CV") ? "checked" : ""}`}>
              <input type="checkbox" checked={validation.includes("K-Fold CV")}
                onChange={() => toggle(validation, "K-Fold CV", setValidation)} />
              <div><b className="text-navy">K-Fold Cross Validation</b><br/><span className="text-xs text-steel">Default k = 5 fold.</span></div>
            </label>
            <label className={`cbx ${validation.includes("LOO CV") ? "checked" : ""}`}>
              <input type="checkbox" checked={validation.includes("LOO CV")}
                onChange={() => toggle(validation, "LOO CV", setValidation)} />
              <div><b className="text-navy">Leave-One-Out CV</b><br/><span className="text-xs text-steel">Validasi paling teliti, namun mahal komputasi.</span></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/data-scientist" className="btn-ghost">← Kembali</Link>
        <Link href="/data-scientist/evaluation" className="btn-primary">Train &amp; Lihat Evaluasi →</Link>
      </div>
    </div>
  );
}
