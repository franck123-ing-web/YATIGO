import { DashboardShell } from "@/components/layout/DashboardShell";
import { BusForm } from "@/components/bus/BusForm";

export default function NewBusPage() {
  return (
    <DashboardShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Ajouter un bus
          </h1>

          <p className="mt-1 text-sm text-slate-600">
            Ajoutez un nouveau bus à votre agence.
          </p>
        </div>

        <BusForm />
      </section>
    </DashboardShell>
  );
}