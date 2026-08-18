import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

/**
 * Conteneur principal de toutes les pages du Dashboard.
 *
 * Il garantit que la sidebar et le header restent cohérents
 * sur l'ensemble des interfaces de gestion.
 */
export function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}