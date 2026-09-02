"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  TrajetFilters,
  type TrajetFiltersValues,
} from "@/components/trajets/TrajetFilters";
import { TrajetTable } from "@/components/trajets/TrajetTable";

const initialFilters: TrajetFiltersValues = {
  search: "",
  status: "ALL",
  date: "",
};

export default function TrajetsPage() {
  const [filters, setFilters] =
    useState<TrajetFiltersValues>(initialFilters);

  return (
    <DashboardShell>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Gestion des trajets
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Créez et gérez les trajets proposés par votre agence.
            </p>
          </div>

          <Link
            href="/trajets/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <Plus
              className="h-4 w-4"
              aria-hidden="true"
            />
            Ajouter un trajet
          </Link>
        </div>

        <TrajetFilters
          filters={filters}
          onChange={setFilters}
        />

        <TrajetTable trajets={[]} />
      </section>
    </DashboardShell>
  );
}