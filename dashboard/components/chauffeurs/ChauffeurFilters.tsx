"use client";

import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useState } from "react";

const chauffeurStatuses = [
  { value: "", label: "Tous les statuts" },
  { value: "ACTIF", label: "Actif" },
  { value: "INDISPONIBLE", label: "Indisponible" },
  { value: "EN_CONGE", label: "En congé" },
  { value: "SUSPENDU", label: "Suspendu" },
];

interface ChauffeurFiltersProps {
  onSearchChange?: (value: string) => void;
  onStatusChange?: (value: string) => void;
}

/**
 * Filtres de la liste des chauffeurs.
 *
 * Pour le moment, le composant gère uniquement
 * l'état de l'interface.
 *
 * Le filtrage réel sera connecté au backend
 * ultérieurement.
 */
export function ChauffeurFilters({
  onSearchChange,
  onStatusChange,
}: ChauffeurFiltersProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const hasFilters = Boolean(search || status);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange?.(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange?.(value);
  };

  const resetFilters = () => {
    setSearch("");
    setStatus("");

    onSearchChange?.("");
    onStatusChange?.("");
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

      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_auto]">
        {/* Recherche */}
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
            placeholder="Rechercher par nom, prénom ou téléphone..."
            aria-label="Rechercher un chauffeur"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>

        {/* Statut */}
        <select
          value={status}
          onChange={(event) =>
            handleStatusChange(event.target.value)
          }
          aria-label="Filtrer par statut"
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
        >
          {chauffeurStatuses.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

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