"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PAY_PERIODS = ["PAY_0","PAY_2","PAY_3","PAY_4","PAY_5","PAY_6"];
const BILL = ["BILL_AMT1","BILL_AMT2","BILL_AMT3","BILL_AMT4","BILL_AMT5","BILL_AMT6"];
const PAYA = ["PAY_AMT1","PAY_AMT2","PAY_AMT3","PAY_AMT4","PAY_AMT5","PAY_AMT6"];

type Applicant = Record<string, string | number>;

function predict(applicant: Applicant) {
  const pay0 = parseFloat(String(applicant.PAY_0)) || 0;
  const bill1 = parseFloat(String(applicant.BILL_AMT1)) || 0;
  const limit = parseFloat(String(applicant.LIMIT_BAL)) || 1;
  const payamt1 = parseFloat(String(applicant.PAY_AMT1)) || 0;
  const utilization = Math.min(bill1 / limit, 1);
  let score = 0.18 + Math.max(pay0, 0) * 0.08 + utilization * 0.35 - (payamt1 / Math.max(bill1, 1)) * 0.15;
  score = Math.max(0.03, Math.min(0.97, score));
  return {
    score,
    pred: score >= 0.5 ? 1 : 0,
    confidence: Math.abs(score - 0.5) * 2,
    topFactor: pay0 > 0 ? "PAY_0 delay" : utilization > 0.7 ? "High utilization" : "Low PAY_AMT1",
    age: String(applicant.AGE),
    limit: String(applicant.LIMIT_BAL),
  };
}

export default function EntryPage() {
  const router = useRouter();

  const [form, setForm] = useState<Applicant>({
    LIMIT_BAL: 50000, SEX: 2, EDUCATION: 2, MARRIAGE: 2, AGE: 32,
    PAY_0: 2, PAY_2: 0, PAY_3: 0, PAY_4: 0, PAY_5: 0, PAY_6: 0,
    BILL_AMT1: 3913, BILL_AMT2: 3102, BILL_AMT3: 689, BILL_AMT4: 0, BILL_AMT5: 0, BILL_AMT6: 0,
    PAY_AMT1: 0, PAY_AMT2: 689, PAY_AMT3: 0, PAY_AMT4: 0, PAY_AMT5: 0, PAY_AMT6: 0,
  });
  const [queue, setQueue] = useState<Applicant[]>([]);

  function update(k: string, v: string) { setForm({ ...form, [k]: v }); }

  function addEntry() {
    setQueue([...queue, form]);
    alert("Data ditambahkan ke antrian. Total: " + (queue.length + 1));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const all = queue.length ? [...queue, form] : [form];
    const results = all.map((a, i) => ({
      ...predict(a),
      id: "APP-" + String(i + 1).padStart(4, "0"),
    }));
    if (typeof window !== "undefined") {
      sessionStorage.setItem("rf_results", JSON.stringify(results));
    }
    router.push("/credit-analysis/result");
  }

  const fld = (k: string, type = "number", step = "1") => (
    <div key={k}>
      <label className="text-[10px] font-semibold uppercase tracking-widest text-steel">{k}</label>
      <input
        className="field mt-1 !py-2 text-sm"
        type={type}
        step={step}
        value={String(form[k] ?? "")}
        onChange={e => update(k, e.target.value)}
      />
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto animate-fade-up">
      <div className="mb-8">
        <span className="font-mono text-xs text-steel tracking-widest">— 06 / CREDIT ANALYSIS</span>
        <h1 className="font-display text-4xl font-bold text-navy mt-1">Entry Data Peminjam</h1>
        <p className="text-steel mt-1">Isi 23 fitur peminjam untuk memprediksi probabilitas gagal bayar bulan berikutnya.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profil */}
        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <span className="marker">01</span> Profil &amp; Limit
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-steel">
                LIMIT_BAL <span className="font-mono normal-case lowercase text-steel/60">(float)</span>
              </label>
              <input className="field mt-1" type="number" step="0.01" value={String(form.LIMIT_BAL)} onChange={e => update("LIMIT_BAL", e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-steel">
                SEX <span className="font-mono normal-case lowercase text-steel/60">(int)</span>
              </label>
              <select className="field mt-1" value={String(form.SEX)} onChange={e => update("SEX", e.target.value)}>
                <option value="1">1 · Male</option><option value="2">2 · Female</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-steel">
                EDUCATION <span className="font-mono normal-case lowercase text-steel/60">(int)</span>
              </label>
              <select className="field mt-1" value={String(form.EDUCATION)} onChange={e => update("EDUCATION", e.target.value)}>
                <option value="1">1 · Graduate School</option>
                <option value="2">2 · University</option>
                <option value="3">3 · High School</option>
                <option value="4">4 · Others</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-steel">
                MARRIAGE <span className="font-mono normal-case lowercase text-steel/60">(int)</span>
              </label>
              <select className="field mt-1" value={String(form.MARRIAGE)} onChange={e => update("MARRIAGE", e.target.value)}>
                <option value="1">1 · Married</option>
                <option value="2">2 · Single</option>
                <option value="3">3 · Others</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-steel">
                AGE <span className="font-mono normal-case lowercase text-steel/60">(int)</span>
              </label>
              <input className="field mt-1" type="number" value={String(form.AGE)} onChange={e => update("AGE", e.target.value)} />
            </div>
          </div>
        </div>

        {/* PAY */}
        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <span className="marker">02</span> Repayment History (PAY_0..PAY_6)
          </h3>
          <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-3">
            {PAY_PERIODS.map(p => fld(p))}
          </div>
          <p className="text-xs text-steel mt-3">
            <span className="font-mono">-1</span> pay duly · <span className="font-mono">0</span> revolving · <span className="font-mono">1..9</span> payment delay (months).
          </p>
        </div>

        {/* BILL */}
        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <span className="marker">03</span> Bill Amount (BILL_AMT1..6)
          </h3>
          <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-3">
            {BILL.map(b => fld(b, "number", "0.01"))}
          </div>
        </div>

        {/* PAY_AMT */}
        <div className="card p-5">
          <h3 className="font-display text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <span className="marker">04</span> Payment Amount (PAY_AMT1..6)
          </h3>
          <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-3">
            {PAYA.map(b => fld(b, "number", "0.01"))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <Link href="/data-scientist/evaluation" className="btn-ghost">← Kembali</Link>
          <div className="flex gap-3">
            <button type="button" className="btn-ghost" onClick={addEntry}>+ Input Data Lagi</button>
            <button type="submit" className="btn-primary">Analisis Sekarang →</button>
          </div>
        </div>
      </form>

      {queue.length > 0 && (
        <div className="card p-5 mt-6">
          <h3 className="font-display text-lg font-bold text-navy mb-2">Antrian Analisis</h3>
          <p className="text-sm text-steel mb-3">Berikut peminjam yang akan dianalisis sekaligus.</p>
          <div className="space-y-2">
            {queue.map((q, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-paperdark/60 border border-navy/10">
                <div className="flex items-center gap-3">
                  <span className="marker">{String(i + 1).padStart(2, "0")}</span>
                  <div className="text-sm">
                    <b className="text-navy">Applicant #{i + 1}</b>
                    <span className="text-steel"> · AGE {q.AGE} · LIMIT {Number(q.LIMIT_BAL).toLocaleString()}</span>
                  </div>
                </div>
                <button
                  className="text-xs text-danger hover:underline"
                  onClick={() => setQueue(queue.filter((_, idx) => idx !== i))}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
