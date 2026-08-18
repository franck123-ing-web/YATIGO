"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

const busStatuses = [
  { value: "", label: "Tous les états" },
  { value: "DISPONIBLE", label: "Disponible" },
  { value: "MAINTENANCE", label: "Maintenance" },
  { value: "HORS_SERVICE", label: "Hors service" },
];

const busTypes = [
  { value: "", label: "Tous les types" },
  { value: "VIP", label: "VIP" },
  { value: "CLASSIQUE", label: "Classique" },
];

interface BusFiltersProps {
  onSearchChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
  onTypeChange?: (value: string) => void;
}

/**
 * Filtres de la liste des bus.
 *
 * Pour le moment, le composant gère uniquement l'état de l'interface.
 * Le filtrage réel sera effectué après connexion au backend.
 */
export function BusFilters({
  onSearchChange,
  onStatusChange,
  onTypeChange,
}: BusFiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const hasFilters = Boolean(search || status || type);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange?.(value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    onTypeChange?.(value);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setType("");

    onSearchChange?.("");
    onStatusChange?.("");
    onTypeChange?.("");
  };

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
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              handleSearchChange(event.target.value)
            }
            placeholder="Rechercher par immatriculation, nom ou modèle..."
            aria-label="Rechercher un bus"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        <select
          value={status}
          onChange={(event) =>
            handleStatusChange(event.target.value)
          }
          aria-label="Filtrer par état"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        >
          {busStatuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(event) =>
            handleTypeChange(event.target.value)
          }
          aria-label="Filtrer par type"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        >
          {busTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {hasFilters ? (
          <button
            type="button"
            onClick={resetFilters}
            title="Réinitialiser les filtres"
            aria-label="Réinitialiser les filtres"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <X className="h-4 w-4" aria-hidden="true" />
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