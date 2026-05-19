"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/login",                          label: "1. Login" },
  { href: "/data-scientist/upload",          label: "2. Upload" },
  { href: "/data-scientist",                 label: "3. Dataset" },
  { href: "/data-scientist/build-model",     label: "4. Build Model" },
  { href: "/data-scientist/evaluation",      label: "5. Evaluasi" },
  { href: "/credit-analysis",                label: "6. Entry Data" },
  { href: "/credit-analysis/result",         label: "7. Hasil" },
];

export default function PrototypeBar() {
  const path = usePathname();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-ink text-white text-xs">
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="chip bg-mint/20 text-mint border border-mint/40">● PROTOTYPE</span>
          <span className="hidden sm:inline text-white/70 font-mono">RiskFinder v0.1 — Overview Mode</span>
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`px-3 py-1 rounded transition ${path === l.href ? "bg-white/15 text-white" : "hover:bg-white/10 text-white/80"}`}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
