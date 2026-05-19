"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Result = {
  id: string;
  score: number;
  pred: number;
  confidence: number;
  topFactor: string;
  age: string;
  limit: string;
};

const DEMO: Result[] = [
  { id: "APP-0001", age: "32", limit: "50000",  score: 0.27, pred: 0, confidence: 0.46, topFactor: "PAY_0 delay" },
  { id: "APP-0002", age: "45", limit: "120000", score: 0.18, pred: 0, confidence: 0.64, topFactor: "Low utilization" },
  { id: "APP-0003", age: "28", limit: "20000",  score: 0.78, pred: 1, confidence: 0.56, topFactor: "High utilization" },
];

function recoOf(r: Result) {
  if (r.pred === 1 && r.score > 0.75) return "Tolak / minta jaminan tambahan";
  if (r.pred === 1) return "Review manual + plafon dikurangi";
  if (r.score > 0.35) return "Setujui dengan monitoring ketat";
  return "Setujui sesuai pengajuan";
}

export default function ResultPage() {
  const [results, setResults] = useState<Result[]>(DEMO);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("rf_results");
      if (stored) {
        try { setResults(JSON.parse(stored)); } catch {}
      }
    }
  }, []);

  const totalDefault = results.filter(r => r.pred === 1).length;
  const totalSafe = results.length - totalDefault;
  const avgScore = (results.reduce((a, b) => a + b.score, 0) / results.length * 100).toFixed(1);

  function exportCsv() {
    alert("CSV diunduh (mock). Pada implementasi real, file akan dihasilkan dari hasil analisis.");
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-3">
        <div>
          <span className="font-mono text-xs text-steel tracking-widest">— 07 / ANALYSIS RESULT</span>
          <h1 className="font-display text-4xl font-bold text-navy mt-1">Hasil Analisis Kredit</h1>
          <p className="text-steel mt-1">Prediksi gagal bayar untuk setiap peminjam yang dientry.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost text-sm" onClick={exportCsv}>⤓ Export CSV</button>
          <Link href="/credit-analysis" className="btn-primary text-sm">+ Analisis Baru</Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">Total Peminjam</div>
          <div className="font-display text-3xl font-bold text-navy mt-1">{results.length}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">Prediksi Default</div>
          <div className="font-display text-3xl font-bold text-danger mt-1">{totalDefault}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">Prediksi Lancar</div>
          <div className="font-display text-3xl font-bold text-mint mt-1">{totalSafe}</div>
        </div>
        <div className="card p-5">
          <div className="text-xs font-mono uppercase tracking-widest text-steel">Avg. Risk Score</div>
          <div className="font-display text-3xl font-bold text-navy mt-1">{avgScore}%</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {results.map((r, i) => {
          const pct = (r.score * 100).toFixed(1);
          const color = r.pred === 1 ? "#E04A5F" : r.score > 0.35 ? "#F2A341" : "#00C49A";
          return (
            <div key={i} className="card p-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color }} />
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-mono text-steel">{r.id}</div>
                  <h3 className="font-display text-xl font-bold text-navy">Applicant #{i + 1}</h3>
                  <p className="text-xs text-steel">
                    AGE {r.age} · LIMIT {Number(r.limit).toLocaleString()}
                  </p>
                </div>
                <span
                  className="chip"
                  style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}
                >
                  {r.pred === 1 ? "⚠ DEFAULT" : "✓ LANCAR"}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <svg viewBox="0 0 200 110" className="w-full max-w-[220px]">
                  <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="rgba(10,37,64,0.08)" strokeWidth="14" strokeLinecap="round"/>
                  <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"
                    strokeDasharray={`${r.score * 251.3} 251.3`}/>
                  <text x="100" y="85" textAnchor="middle" fontFamily="Georgia, serif" fontSize="32" fontWeight="700" fill="#0A2540">{pct}%</text>
                  <text x="100" y="103" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#5B6B7F">RISK SCORE</text>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div className="p-2 rounded bg-paperdark/60">
                  <div className="text-steel">Top Factor</div>
                  <div className="font-semibold text-navy">{r.topFactor}</div>
                </div>
                <div className="p-2 rounded bg-paperdark/60">
                  <div className="text-steel">Confidence</div>
                  <div className="font-semibold text-navy">{(r.confidence * 100).toFixed(0)}%</div>
                </div>
              </div>

              <div className="mt-3 text-sm">
                <span className="text-steel text-xs uppercase tracking-widest">Rekomendasi</span>
                <p className="font-semibold text-navy">{recoOf(r)}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card overflow-hidden mt-8">
        <div className="px-5 py-4 border-b border-navy/10 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-navy">Tabel Hasil Detail</h3>
          <span className="chip bg-navy text-white">Model: LightGBM_Optuna</span>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl w-full text-sm">
            <thead>
              <tr><th>ID</th><th>Risk Score</th><th>Prediksi</th><th>Confidence</th><th>Top Factor</th><th>Rekomendasi</th></tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={i}>
                  <td className="font-mono">{r.id}</td>
                  <td className="font-mono font-bold">{(r.score * 100).toFixed(1)}%</td>
                  <td>
                    {r.pred === 1
                      ? <span className="chip bg-danger/15 text-danger border border-danger/30">1 · Default</span>
                      : <span className="chip bg-mint/15 text-navy border border-mint/30">0 · Lancar</span>}
                  </td>
                  <td className="font-mono">{(r.confidence * 100).toFixed(0)}%</td>
                  <td>{r.topFactor}</td>
                  <td>{recoOf(r)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/credit-analysis" className="btn-ghost">← Kembali ke Entry</Link>
        <Link href="/login" className="btn-primary">Selesai · Logout →</Link>
      </div>
    </div>
  );
}
