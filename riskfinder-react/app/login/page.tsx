"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import PrototypeBar from "@/components/PrototypeBar";

export default function LoginPage() {
  const router = useRouter();
  const [divisi, setDivisi] = useState("ds");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (divisi === "ds") router.push("/data-scientist/upload");
    else router.push("/credit-analysis");
  }

  return (
    <>
      <PrototypeBar />
      <div className="h-14" />
      <section className="animate-fade-up">
        <div className="min-h-[calc(100vh-3.5rem)] grid lg:grid-cols-2">
          {/* LEFT */}
          <div className="relative overflow-hidden bg-navy text-white p-8 lg:p-14 flex flex-col justify-between">
            <div className="absolute inset-0 industrial-stripe opacity-50" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 10%, rgba(0,196,154,.18), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,168,232,.18), transparent 40%)",
              }}
            />
            <div className="relative">
              <Logo invert className="h-12" />
            </div>
            <div className="relative">
              <span className="chip bg-mint/15 text-mint border border-mint/30 mb-6 inline-flex">
                CREDIT RISK INTELLIGENCE
              </span>
              <h1 className="font-display text-3xl lg:text-5xl leading-[1.05] font-bold mb-6">
                Kendalikan <em className="text-mint not-italic">risiko</em> gagal<br />
                 bayar di <em className="text-cyan2 not-italic">genggaman</em> anda.
              </h1>
              <p className="text-white/70 text-lg max-w-md leading-relaxed">
                Platform analisis risiko kredit berbasis machine learning untuk memprediksi probabilitas gagal bayar peminjam individu maupun korporasi.
              </p>
            </div>
            <div className="relative grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
              <div>
                <div className="font-display text-3xl font-bold text-mint">
                  98.4<span className="text-base text-white/50">%</span>
                </div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">ROC-AUC</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-cyan2">23</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Fitur Input</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold">4</div>
                <div className="text-xs text-white/60 uppercase tracking-widest mt-1">Tuning Method</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid-paper flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <span className="font-mono text-xs text-steel tracking-widest">— 01 / AUTHENTICATION</span>
                <h2 className="font-display text-4xl font-bold mt-2 text-navy">Masuk ke RiskFinder</h2>
                <p className="text-steel mt-2">Silahkan login untuk mengakses dashboard sesuai role Anda.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-steel mb-2">Username</label>
                  <input className="field" type="text" defaultValue="demo.user" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-steel mb-2">Password</label>
                  <input className="field" type="password" defaultValue="demo1234" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-steel mb-2">Divisi</label>
                  <select className="field" value={divisi} onChange={(e) => setDivisi(e.target.value)}>
                    <option value="ds">Data Scientist</option>
                    <option value="ca">Credit Analysis</option>
                  </select>
                  <p className="text-xs text-steel mt-2 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-mint rounded-full" />
                    Pilih divisi menentukan alur halaman setelah login.
                  </p>
                </div>
                <button type="submit" className="btn-primary w-full text-center">
                  Masuk &nbsp;→
                </button>
                <p className="text-xs text-steel text-center pt-2">
                  © 2026 RiskFinder · Powered by PyCaret &amp; scikit-learn
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
