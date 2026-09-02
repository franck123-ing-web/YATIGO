import { DashboardShell } from "@/components/layout/DashboardShell";
import { TrajetForm } from "@/components/trajets/TrajetForm";

export default function NewTrajetPage() {
  return (
    <DashboardShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ajouter un trajet
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Créez un nouveau trajet pour votre agence.
          </p>
        </div>

        <TrajetForm />
      </section>
    </DashboardShell>
  );
}