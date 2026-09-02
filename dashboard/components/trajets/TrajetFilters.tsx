"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

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

const trajetStatuses: {
  value: TrajetStatus | "ALL";
  label: string;
}[] = [
  { value: "ALL", label: "Tous les statuts" },
  { value: "PROGRAMME", label: "Programmé" },
  { value: "EN_COURS", label: "En cours" },
  { value: "RETARDE", label: "Retardé" },
  { value: "INTERROMPU", label: "Interrompu" },
  { value: "TERMINE", label: "Terminé" },
  { value: "ANNULE", label: "Annulé" },
];

/**
 * Filtres de la liste des trajets.
 *
 * Le composant est contrôlé par son parent afin de centraliser
 * l'état des filtres et faciliter la connexion au backend.
 */
export function TrajetFilters({
  filters,
  onChange,
}: TrajetFiltersProps) {
  function updateFilter<K extends keyof TrajetFiltersValues>(
    field: K,
    value: TrajetFiltersValues[K],
  ) {
    onChange({
      ...filters,
      [field]: value,
    });
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
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal
          className="h-4 w-4 text-sky-600"
          aria-hidden="true"
        />

        <h3 className="text-sm font-semibold text-slate-900">
          Rechercher et filtrer
        </h3>
      </div>

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
        {/* Recherche */}
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        {/* Statut */}
        <select
          value={filters.status}
          onChange={(event) =>
            updateFilter(
              "status",
              event.target.value as TrajetStatus | "ALL",
            )
          }
          aria-label="Filtrer par statut"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        >
          {trajetStatuses.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Date */}
        <input
          type="date"
          value={filters.date}
          onChange={(event) =>
            updateFilter("date", event.target.value)
          }
          aria-label="Filtrer par date"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />

        {/* Réinitialisation */}
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            title="Réinitialiser les filtres"
            aria-label="Réinitialiser les filtres"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <X
              className="h-4 w-4"
              aria-hidden="true"
            />

            <span className="hidden xl:inline">
              Réinitialiser
            </span>
          </button>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>
    </div>
  );
}