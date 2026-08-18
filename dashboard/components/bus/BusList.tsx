import type { Bus } from "@/types/bus";
import { BusCard } from "./BusCard";

interface BusListProps {
  buses: Bus[];
  onEdit: (bus: Bus) => void;
  onView: (bus: Bus) => void;
}

/**
 * Affiche la liste des bus de l'agence.
 *
 * La récupération des données et les règles métier restent
 * en dehors de ce composant.
 */
export function BusList({ buses, onEdit, onView }: BusListProps) {
  if (buses.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Aucun bus enregistré
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Ajoutez votre premier bus pour commencer à gérer votre flotte.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {buses.map((bus) => (
        <BusCard
          key={bus.id}
          bus={bus}
          onEdit={onEdit}
          onView={onView}
        />
      ))}
    </div>
  );
}