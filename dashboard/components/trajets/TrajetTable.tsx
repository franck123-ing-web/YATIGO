import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

import type { TrajetListItem } from "@/lib/trajet/trajet.types";

import { TrajetStatusBadge } from "./TrajetStatusBadge";

interface TrajetTableProps {
  trajets: TrajetListItem[];
}

/**
 * Formate une date ISO pour l'affichage dans le Dashboard.
 */
function formatDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Formate un montant en franc CFA.
 */
function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Affiche les trajets sous forme de tableau.
 */
export function TrajetTable({
  trajets,
}: TrajetTableProps) {
  if (trajets.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-slate-900">
          Aucun trajet trouvé
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Modifiez vos filtres ou créez un nouveau trajet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Trajet
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Date et heure
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Bus
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Chauffeur
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Prix
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Statut
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {trajets.map((trajet) => (
              <tr
                key={trajet.id}
                className="transition-colors hover:bg-slate-50/70"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {trajet.ville_depart}
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <span>→</span>
                    <span>{trajet.ville_arrivee}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900">
                    {formatDate(trajet.date_depart)}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {trajet.heure_depart}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {trajet.bus_immatriculation}
                </td>

                <td className="px-6 py-4 text-sm text-slate-700">
                  {trajet.chauffeur_nom}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-slate-900">
                  {formatPrice(trajet.prix)}
                </td>

                <td className="px-6 py-4">
                  <TrajetStatusBadge status={trajet.statut} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/trajets/${trajet.id}`}
                      aria-label={`Voir le trajet de ${trajet.ville_depart} à ${trajet.ville_arrivee}`}
                      title="Voir les détails du trajet"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700"
                    >
                      <Eye
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>

                    <Link
                      href={`/trajets/${trajet.id}/modifier`}
                      aria-label={`Modifier le trajet de ${trajet.ville_depart} à ${trajet.ville_arrivee}`}
                      title="Modifier le trajet"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700"
                    >
                      <Pencil
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>

                    <button
                      type="button"
                      aria-label={`Plus d'actions pour le trajet de ${trajet.ville_depart} à ${trajet.ville_arrivee}`}
                      title="Plus d'actions"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <MoreHorizontal
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}