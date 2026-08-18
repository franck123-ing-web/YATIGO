import { Plus } from "lucide-react";

import { BusFilters } from "@/components/bus/BusFilters";
import { BusTable } from "@/components/bus/BusTable";
import { DashboardShell } from "@/components/layout/DashboardShell";

export default function BusPage() {
  return (
    <DashboardShell>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Gestion des bus
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Gérez les bus appartenant à votre agence.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Ajouter un bus
          </button>
        </div>

        <BusFilters />

        <BusTable buses={[]} />
      </section>
    </DashboardShell>
  );
}