"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("default_credit_clients.csv");
  const [pct, setPct] = useState<number | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFilename(file.name);
    setPct(0);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
        setTimeout(() => router.push("/data-scientist"), 600);
      }
      setPct(Math.round(p));
    }, 250);
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-up">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <span className="font-mono text-xs text-steel tracking-widest">— 02 / DATA INGEST</span>
          <h1 className="font-display text-4xl font-bold text-navy mt-1">Upload Dataset</h1>
          <p className="text-steel mt-1">Unggah file CSV/XLSX berisi data historis peminjam untuk training model.</p>
        </div>
        <span className="chip bg-mint/15 text-navy border border-mint/30">CSV · XLSX · Max 50MB</span>
      </div>

      <div className="card p-6 lg:p-10">
        <div
          className="border-2 border-dashed border-navy/20 rounded-xl p-12 text-center hover:border-royal hover:bg-royal/[.03] transition cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <div className="mx-auto w-16 h-16 rounded-2xl bg-navy text-white flex items-center justify-center mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0-12l-4 4m4-4l4 4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>
            </svg>
          </div>
          <p className="font-display text-2xl font-bold text-navy">Drag &amp; drop file Anda di sini</p>
          <p className="text-steel mt-1">atau klik untuk memilih file dari komputer</p>
          <input ref={inputRef} type="file" className="hidden" accept=".csv,.xlsx" onChange={handleFile}/>
          <button type="button" className="btn-primary mt-6">Pilih File</button>
        </div>

        {pct !== null && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-mono">{filename}</span>
              <span className="font-mono text-steel">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-navy/5 overflow-hidden">
              <div className="h-full transition-all" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#00C49A,#1E5AA8)" }} />
            </div>
          </div>
        )}

        <div className="mt-8 grid sm:grid-cols-3 gap-4 text-sm">
          <div className="flex gap-3 items-start"><span className="marker">01</span><div><b className="text-navy">Format</b><br/><span className="text-steel">CSV (UTF-8) atau XLSX</span></div></div>
          <div className="flex gap-3 items-start"><span className="marker">02</span><div><b className="text-navy">Target</b><br/><span className="text-steel">Kolom target biner 0/1 (default.payment.next.month)</span></div></div>
          <div className="flex gap-3 items-start"><span className="marker">03</span><div><b className="text-navy">Schema</b><br/><span className="text-steel">23 fitur sesuai standar UCI Credit Default</span></div></div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <Link href="/login" className="btn-ghost">← Kembali</Link>
        <Link href="/data-scientist" className="btn-primary">Lanjut Pilih Dataset →</Link>
      </div>
    </div>
  );
}
