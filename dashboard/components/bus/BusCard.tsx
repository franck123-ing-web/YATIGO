import type { Bus } from "@/types/bus";
import { BusStatusBadge } from "./BusStatusBadge";

interface BusCardProps {
  bus: Bus;
  onEdit: (bus: Bus) => void;
  onView: (bus: Bus) => void;
}

/**
 * Présente les informations principales d'un bus.
 *
 * Les actions sont reçues par le composant parent afin de garder
 * BusCard indépendant de la logique métier et des appels API.
 */
export function BusCard({ bus, onEdit, onView }: BusCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4">
        {/* Informations principales du bus */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              {bus.numero_immatriculation}
            </p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              {bus.nom_commercial || "Bus sans nom"}
            </h2>

            {bus.modele && (
              <p className="mt-1 text-sm text-gray-500">{bus.modele}</p>
            )}
          </div>

          <BusStatusBadge etat={bus.etat} />
        </div>

        {/* Informations techniques essentielles */}
        <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-500">Capacité</p>
            <p className="mt-1 font-medium text-gray-900">
              {bus.capacite} places
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Type</p>
            <p className="mt-1 font-medium text-gray-900">{bus.type}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Sièges / rangée</p>
            <p className="mt-1 font-medium text-gray-900">
              {bus.nombre_sieges_par_rangee}
            </p>
          </div>
        </div>

        {/* Équipements disponibles */}
        <div>
          <p className="text-xs font-medium text-gray-500">Équipements</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {bus.climatisation && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                Climatisation
              </span>
            )}

            {bus.wifi && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                Wi-Fi
              </span>
            )}

            {bus.prise_usb && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                Prise USB
              </span>
            )}

            {bus.inclinaison_sieges && (
              <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                Sièges inclinables
              </span>
            )}

            {!bus.climatisation &&
              !bus.wifi &&
              !bus.prise_usb &&
              !bus.inclinaison_sieges && (
                <span className="text-sm text-gray-400">
                  Aucun équipement renseigné
                </span>
              )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onView(bus)}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Voir
           </button>

          <button
            type="button"
            onClick={() => onEdit(bus)}
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Modifier
          </button>
        </div>
      </div>
    </article>
  );
}