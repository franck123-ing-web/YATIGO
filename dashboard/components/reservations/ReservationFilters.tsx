"use client";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

export type ReservationStatusFilter =
  | "ALL"
  | "EN_ATTENTE"
  | "CONFIRMEE"
  | "ANNULEE"
  | "UTILISEE";

export interface ReservationFiltersValues {
  search: string;
  status: ReservationStatusFilter;
  date: string;
}

interface ReservationFiltersProps {
  filters: ReservationFiltersValues;

  onChange: (
    filters: ReservationFiltersValues,
  ) => void;
}

const reservationStatuses = [
  {
    value: "ALL",
    label: "Tous les statuts",
  },
  {
    value: "EN_ATTENTE",
    label: "En attente",
  },
  {
    value: "CONFIRMEE",
    label: "Confirmée",
  },
  {
    value: "ANNULEE",
    label: "Annulée",
  },
  {
    value: "UTILISEE",
    label: "Utilisée",
  },
] as const;

/**
 * Filtres de la liste des réservations.
 */
export function ReservationFilters({
  filters,
  onChange,
}: ReservationFiltersProps) {
  function updateFilter<
    K extends keyof ReservationFiltersValues
  >(
    field: K,
    value: ReservationFiltersValues[K],
  ) {
    onChange({
      ...filters,
      [field]: value,
    });
  }

  const hasFilters = Boolean(
    filters.search ||
      filters.status !== "ALL" ||
      filters.date,
  );

  function resetFilters() {
    onChange({
      search: "",
      status: "ALL",
      date: "",
    });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      {/* Titre */}
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
              updateFilter(
                "search",
                event.target.value,
              )
            }
            placeholder="Rechercher une réservation..."
            aria-label="Rechercher une réservation"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        {/* Statut */}
        <select
          value={filters.status}
          onChange={(event) =>
            updateFilter(
              "status",
              event.target
                .value as ReservationStatusFilter,
            )
          }
          aria-label="Filtrer par statut"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        >
          {reservationStatuses.map((option) => (
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
            updateFilter(
              "date",
              event.target.value,
            )
          }
          aria-label="Filtrer par date"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        />

        {/* Réinitialisation */}
        {hasFilters ? (
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