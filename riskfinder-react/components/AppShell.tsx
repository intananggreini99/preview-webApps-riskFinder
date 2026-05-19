"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

type NavItem = { href: string; label: string; icon: string };

const dsNav: NavItem[] = [
  { href: "/data-scientist/upload",      label: "Upload Dataset"   },
  { href: "/data-scientist",             label: "Pilih Dataset"    },
  { href: "/data-scientist/build-model", label: "Build Model"   },
  { href: "/data-scientist/evaluation",  label: "Evaluasi Model" },
];
const caNav: NavItem[] = [
  { href: "/credit-analysis",         label: "Entry Data" },
  { href: "/credit-analysis/result",  label: "Hasil Analisis" },
];

export default function AppShell({
  role,
  children,
}: { role: "ds" | "ca"; children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const nav = role === "ds" ? dsNav : caNav;

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <aside className="hidden md:flex w-64 bg-white border-r border-navy/10 flex-col p-4">
        <div className="flex items-center gap-2 px-2 py-3 mb-4 border-b border-navy/10">
          <Logo className="h-9" />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-steel px-2 mb-2">
          {role === "ds" ? "Data Scientist" : "Credit Analysis"}
        </div>
        <nav className="space-y-1">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`nav-item ${path === n.href ? "active" : ""}`}
            >
              <span>{n.icon}</span>
              <span>{n.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-4 border-t border-navy/10 text-xs text-steel">
          Role: <b className="text-navy">{role === "ds" ? "Data Scientist" : "Credit Analyst"}</b>
          <button
            onClick={() => router.push("/login")}
            className="block mt-2 text-royal hover:underline"
          >
            Logout →
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 lg:p-10 grid-paper overflow-x-hidden">{children}</main>
    </div>
  );
}
