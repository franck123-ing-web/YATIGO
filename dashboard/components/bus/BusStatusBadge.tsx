import type { EtatBus } from "@/types/bus";

interface BusStatusBadgeProps {
  etat: EtatBus;
}

/**
 * Affiche l'état d'un bus avec un indicateur visuel cohérent.
 *
 * Le composant centralise l'affichage des états afin d'éviter
 * de dupliquer la logique dans les différentes pages du Dashboard.
 */
export function BusStatusBadge({ etat }: BusStatusBadgeProps) {
  const configuration = {
    DISPONIBLE: {
      label: "Disponible",
      className: "bg-green-100 text-green-700",
    },
    MAINTENANCE: {
      label: "Maintenance",
      className: "bg-amber-100 text-amber-700",
    },
    HORS_SERVICE: {
      label: "Hors service",
      className: "bg-gray-100 text-gray-600",
    },
  } as const;

  const statut = configuration[etat];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${statut.className}`}
    >
      {statut.label}
    </span>
  );
}