import { BusFront, Eye, Pencil } from "lucide-react";

export type BusStatus =
  | "DISPONIBLE"
  | "MAINTENANCE"
  | "HORS_SERVICE";

export type BusType = "VIP" | "CLASSIQUE";

export interface Bus {
  id: string;
  numero_immatriculation: string;
  nom_commercial: string | null;
  modele: string | null;
  capacite: number;
  etat: BusStatus;
  type: BusType;
}

interface BusTableProps {
  buses: Bus[];
  isLoading?: boolean;
  error?: string | null;
  onView?: (bus: Bus) => void;
  onEdit?: (bus: Bus) => void;
}

const statusConfig: Record<
  BusStatus,
  {
    label: string;
    className: string;
  }
> = {
  DISPONIBLE: {
    label: "Disponible",
    className:
      "bg-green-50 text-green-700 ring-green-600/20",
  },
  MAINTENANCE: {
    label: "Maintenance",
    className:
      "bg-amber-50 text-amber-700 ring-amber-600/20",
  },
  HORS_SERVICE: {
    label: "Hors service",
    className:
      "bg-slate-100 text-slate-600 ring-slate-500/20",
  },
};

const typeLabels: Record<BusType, string> = {
  VIP: "VIP",
  CLASSIQUE: "Classique",
};

/**
 * Affiche la liste des bus de l'agence.
 *
 * Le composant ne contient volontairement aucune logique API.
 * Les données lui seront fournies par la couche de page/services.
 */
export function BusTable({
  buses,
  isLoading = false,
  error = null,
  onView,
  onEdit,
}: BusTableProps) {
  if (isLoading) {
    return <BusTableSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">
          Impossible de charger les bus.
        </p>

        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (buses.length === 0) {
    return <EmptyBusState />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Bus
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {buses.length} bus{buses.length > 1 ? "s" : ""} trouvé
          {buses.length > 1 ? "s" : ""}
        </p>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[800px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Immatriculation
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nom
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Modèle
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Capacité
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Type
              </th>

              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                État
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {buses.map((bus) => {
              const status = statusConfig[bus.etat];

              return (
                <tr
                  key={bus.id}
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="font-medium text-slate-900">
                      {bus.numero_immatriculation}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {bus.nom_commercial || "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {bus.modele || "—"}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {bus.capacite} places
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">
                    {typeLabels[bus.type]}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onView?.(bus)}
                        title="Voir les détails du bus"
                        aria-label={`Voir les détails de ${bus.numero_immatriculation}`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700"
                      >
                        <Eye
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit?.(bus)}
                        title="Modifier le bus"
                        aria-label={`Modifier ${bus.numero_immatriculation}`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Pencil
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 md:hidden">
        {buses.map((bus) => {
          const status = statusConfig[bus.etat];

          return (
            <article key={bus.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    {bus.nom_commercial || "Bus sans nom"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {bus.numero_immatriculation}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${status.className}`}
                >
                  {status.label}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-slate-400">
                    Modèle
                  </p>

                  <p className="mt-1 text-slate-700">
                    {bus.modele || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Capacité
                  </p>

                  <p className="mt-1 text-slate-700">
                    {bus.capacite} places
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Type
                  </p>

                  <p className="mt-1 text-slate-700">
                    {typeLabels[bus.type]}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-1 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => onView?.(bus)}
                  title="Voir les détails du bus"
                  aria-label={`Voir les détails de ${bus.numero_immatriculation}`}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  <Eye
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </button>

                <button
                  type="button"
                  onClick={() => onEdit?.(bus)}
                  title="Modifier le bus"
                  aria-label={`Modifier ${bus.numero_immatriculation}`}
                  className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

/**
 * État affiché lorsqu'aucun bus n'est disponible.
 */
function EmptyBusState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50">
        <BusFront
          className="h-6 w-6 text-sky-600"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-900">
        Aucun bus trouvé
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
        Aucun bus ne correspond aux critères de recherche
        actuels.
      </p>
    </div>
  );
}

/**
 * État de chargement de la liste.
 *
 * Il évite d'afficher brutalement une zone vide pendant
 * la récupération des données.
 */
function BusTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="animate-pulse divide-y divide-slate-100">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-6 px-5 py-5"
          >
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="h-4 w-28 rounded bg-slate-200" />
            <div className="h-4 w-20 rounded bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="ml-auto h-4 w-20 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}