"use client";
import Link from "next/link";
import { useState } from "react";

const datasets = [
  { name: "UCI Credit Default",   rows: "30K",   cols: 23, defaultPct: "22.1%", color: "mint",    version: "v1.2", status: "ACTIVE" },
  { name: "SME Loan Portfolio",   rows: "12K",   cols: 18, defaultPct: "14.8%", color: "warn",    version: "v0.4", status: "DRAFT" },
  { name: "Retail Microcredit",   rows: "8.2K",  cols: 15, defaultPct: "31.7%", color: "danger",  version: "v0.1", status: "DRAFT" },
];

export default function DatasetPage() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="mb-8">
        <span className="font-mono text-xs text-steel tracking-widest">— 03 / DATASET SELECTION</span>
        <h1 className="font-display text-4xl font-bold text-navy mt-1">Pilih Dataset</h1>
        <p className="text-steel mt-1">Pilih dataset yang akan digunakan untuk training & evaluasi model.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {datasets.map((d, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={`card p-5 cursor-pointer transition ${selected === i ? "ring-2 ring-mint" : "hover:ring-2 hover:ring-royal/40"}`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`chip ${d.status === "ACTIVE" ? "bg-mint/15 text-navy border border-mint/30" : "bg-paperdark text-steel"}`}>
                {d.status}
              </span>
              <span className="font-mono text-xs text-steel">{d.version}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-navy">{d.name}</h3>
            <p className="text-sm text-steel mt-1">{d.rows} obs · {d.cols} fitur · target biner</p>
            <div className="mt-4 grid grid-cols-3 text-center text-xs">
              <div><div className="font-bold text-navy">{d.rows}</div><div className="text-steel">rows</div></div>
              <div><div className="font-bold text-navy">{d.cols}</div><div className="text-steel">cols</div></div>
              <div><div className={`font-bold text-${d.color}`}>{d.defaultPct}</div><div className="text-steel">default</div></div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
          <h3 className="font-display text-lg font-bold text-navy">
            Preview Data — <span className="text-royal">{datasets[selected].name}</span>
          </h3>
          <span className="chip bg-navy text-white">Showing 5 / {datasets[selected].rows}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="tbl w-full text-sm font-mono">
            <thead>
              <tr>
                <th>ID</th><th>LIMIT_BAL</th><th>SEX</th><th>AGE</th><th>PAY_0</th><th>BILL_AMT1</th><th>PAY_AMT1</th><th className="text-mint">DEFAULT</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>20,000</td><td>2</td><td>24</td><td>2</td><td>3,913</td><td>0</td><td className="text-danger font-bold">1</td></tr>
              <tr><td>2</td><td>120,000</td><td>2</td><td>26</td><td>-1</td><td>2,682</td><td>0</td><td className="text-mint font-bold">0</td></tr>
              <tr><td>3</td><td>90,000</td><td>2</td><td>34</td><td>0</td><td>29,239</td><td>1,518</td><td className="text-mint font-bold">0</td></tr>
              <tr><td>4</td><td>50,000</td><td>2</td><td>37</td><td>0</td><td>46,990</td><td>2,000</td><td className="text-mint font-bold">0</td></tr>
              <tr><td>5</td><td>50,000</td><td>1</td><td>57</td><td>-1</td><td>8,617</td><td>2,000</td><td className="text-mint font-bold">0</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/data-scientist/upload" className="btn-ghost">← Kembali</Link>
        <Link href="/data-scientist/build-model" className="btn-primary">Lanjut Build Model →</Link>
      </div>
    </div>
  );
}
