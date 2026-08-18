import { DashboardShell } from "@/components/layout/DashboardShell";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <section>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Bienvenue sur YATIGO
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Gérez les bus, chauffeurs, trajets et opérations de votre agence.
        </p>
      </section>
    </DashboardShell>
  );
}