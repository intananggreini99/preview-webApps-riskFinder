import AppShell from "@/components/AppShell";
import PrototypeBar from "@/components/PrototypeBar";

export default function DSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrototypeBar />
      <div className="h-14" />
      <AppShell role="ds">{children}</AppShell>
    </>
  );
}
