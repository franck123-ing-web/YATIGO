"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  ChauffeurFilters,
  type ChauffeurFiltersValues,
} from "@/components/chauffeurs/ChauffeurFilters";
import { ChauffeurTable } from "@/components/chauffeurs/ChauffeurTable";

const initialFilters: ChauffeurFiltersValues = {
  search: "",
  status: "ALL",
};

export default function ChauffeursPage() {
  const [filters, setFilters] =
    useState<ChauffeurFiltersValues>(initialFilters);

  return (
    <DashboardShell>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Gestion des chauffeurs
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Gérez les chauffeurs de votre agence.
            </p>
          </div>

          <Link
            href="/chauffeurs/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            <Plus
              className="h-4 w-4"
              aria-hidden="true"
            />

            Ajouter un chauffeur
          </Link>
        </div>

        <ChauffeurFilters
          filters={filters}
          onChange={setFilters}
        />

        <ChauffeurTable
          chauffeurs={[]}
        />
      </section>
    </DashboardShell>
  );
}