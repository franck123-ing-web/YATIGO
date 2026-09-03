import { DashboardShell } from "@/components/layout/DashboardShell";
import { ChauffeurForm } from "@/components/chauffeurs/ChauffeurForm";

export default function NewChauffeurPage() {
  return (
    <DashboardShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ajouter un chauffeur
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Créez un nouveau chauffeur pour votre agence.
          </p>
        </div>

        <ChauffeurForm />
      </section>
    </DashboardShell>
  );
}