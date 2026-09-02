"use client";

import { Search, X } from "lucide-react";

import type { TrajetStatus } from "@/lib/trajet/trajet.types";

export interface TrajetFiltersValues {
  search: string;
  status: TrajetStatus | "ALL";
  date: string;
}

interface TrajetFiltersProps {
  filters: TrajetFiltersValues;
  onChange: (filters: TrajetFiltersValues) => void;
}

/**
 * Filtres permettant de rechercher et filtrer
 * les trajets affichés dans le Dashboard.
 */
export function TrajetFilters({
  filters,
  onChange,
}: TrajetFiltersProps) {
  function updateFilter(
    field: keyof TrajetFiltersValues,
    value: string,
  ) {
    onChange({
      ...filters,
      [field]: value,
    } as TrajetFiltersValues);
  }

  function resetFilters() {
    onChange({
      search: "",
      status: "ALL",
      date: "",
    });
  }

  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "ALL" ||
    filters.date !== "";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Recherche */}
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              updateFilter("search", event.target.value)
            }
            placeholder="Rechercher une ville, un bus ou un chauffeur..."
            aria-label="Rechercher un trajet"
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* Statut */}
        <div className="w-full lg:w-48">
          <label
            htmlFor="trajet-status-filter"
            className="sr-only"
          >
            Filtrer par statut
          </label>

          <select
            id="trajet-status-filter"
            value={filters.status}
            onChange={(event) =>
              updateFilter("status", event.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          >
            <option value="ALL">Tous les statuts</option>

            <option value="PROGRAMME">Programmé</option>
            <option value="EN_COURS">En cours</option>
            <option value="RETARDE">Retardé</option>
            <option value="INTERROMPU">Interrompu</option>
            <option value="TERMINE">Terminé</option>
            <option value="ANNULE">Annulé</option>
          </select>
        </div>

        {/* Date */}
        <div className="w-full lg:w-48">
          <label
            htmlFor="trajet-date-filter"
            className="sr-only"
          >
            Filtrer par date
          </label>

          <input
            id="trajet-date-filter"
            type="date"
            value={filters.date}
            onChange={(event) =>
              updateFilter("date", event.target.value)
            }
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </div>

        {/* Réinitialisation */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            title="Réinitialiser les filtres"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <X
              className="h-4 w-4"
              aria-hidden="true"
            />

            <span>Réinitialiser</span>
          </button>
        )}
      </div>
    </div>
  );
}