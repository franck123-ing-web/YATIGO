import type { TrajetStatus } from "@/lib/trajet/trajet.types";

interface TrajetStatusBadgeProps {
  status: TrajetStatus;
}

const statusConfig: Record<
  TrajetStatus,
  {
    label: string;
    className: string;
  }
> = {
  PROGRAMME: {
    label: "Programmé",
    className:
      "bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
  },

  EN_COURS: {
    label: "En cours",
    className:
      "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
  },

  RETARDE: {
    label: "Retardé",
    className:
      "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  },

  INTERROMPU: {
    label: "Interrompu",
    className:
      "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200",
  },

  TERMINE: {
    label: "Terminé",
    className:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  },

  ANNULE: {
    label: "Annulé",
    className:
      "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
  },
};

/**
 * Affiche le statut d'un trajet avec une présentation
 * visuelle cohérente dans l'ensemble du Dashboard.
 */
export function TrajetStatusBadge({
  status,
}: TrajetStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}