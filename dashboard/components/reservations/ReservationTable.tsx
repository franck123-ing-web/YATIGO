"use client";

import Link from "next/link";
import {
Check,
Eye,
Ticket,
X,
} from "lucide-react";

export type ReservationStatus =
| "EN_ATTENTE"
| "CONFIRMEE"
| "ANNULEE"
| "UTILISEE";

export interface Reservation {
id: string;
code_reservation: string;

voyageur: {
nom: string;
prenom: string;
telephone?: string | null;
};

trajet: {
ville_depart: string;
ville_arrivee: string;
date_depart: string;
heure_depart: string;
};

date_reservation: string;

statut: ReservationStatus;
}

interface ReservationTableProps {
reservations: Reservation[];

onConfirm?: (
reservation: Reservation,
) => void;

onCancel?: (
reservation: Reservation,
) => void;
}

const statusConfig: Record<
ReservationStatus,
{
label: string;
className: string;
}

> = {
 EN_ATTENTE: {
 label: "En attente",
 className:
 "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
 },

CONFIRMEE: {
label: "Confirmée",
className:
"bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
},

ANNULEE: {
label: "Annulée",
className:
"bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20",
},

UTILISEE: {
label: "Utilisée",
className:
"bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-600/20",
},
};

function formatDate(date: string) {
return new Intl.DateTimeFormat(
"fr-FR",
{
day: "2-digit",
month: "short",
year: "numeric",
},
).format(new Date(date));
}

export function ReservationTable({
reservations,
onConfirm,
onCancel,
}: ReservationTableProps) {
if (reservations.length === 0) {
return <EmptyReservationState />;
}

return ( <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"> <div className="overflow-x-auto"> <table className="w-full min-w-[950px]"> <thead className="border-b border-slate-200 bg-slate-50"> <tr> <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
Réservation </th>


          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Voyageur
          </th>

          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Trajet
          </th>

          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Départ
          </th>

          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            Statut
          </th>

          <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-100">
        {reservations.map((reservation) => {
          const status =
            statusConfig[reservation.statut];

          const canConfirm =
            reservation.statut === "EN_ATTENTE";

          const canCancel =
            reservation.statut === "EN_ATTENTE" ||
            reservation.statut === "CONFIRMEE";

          return (
            <tr
              key={reservation.id}
              className="transition hover:bg-slate-50/70"
            >
              {/* Réservation */}
              <td className="px-5 py-4">
                <div className="font-semibold text-slate-900">
                  {reservation.code_reservation}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  Réservée le{" "}
                  {formatDate(
                    reservation.date_reservation,
                  )}
                </div>
              </td>

              {/* Voyageur */}
              <td className="px-5 py-4">
                <div className="font-medium text-slate-900">
                  {reservation.voyageur.prenom}{" "}
                  {reservation.voyageur.nom}
                </div>

                {reservation.voyageur.telephone && (
                  <div className="mt-1 text-xs text-slate-500">
                    {reservation.voyageur.telephone}
                  </div>
                )}
              </td>

              {/* Trajet */}
              <td className="px-5 py-4">
                <div className="font-medium text-slate-900">
                  {reservation.trajet.ville_depart}
                  {" → "}
                  {reservation.trajet.ville_arrivee}
                </div>
              </td>

              {/* Départ */}
              <td className="px-5 py-4">
                <div className="text-sm font-medium text-slate-900">
                  {formatDate(
                    reservation.trajet.date_depart,
                  )}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {reservation.trajet.heure_depart}
                </div>
              </td>

              {/* Statut */}
              <td className="px-5 py-4">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}
                >
                  {status.label}
                </span>
              </td>

              {/* Actions */}
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-1">

                  {/* Voir */}
                  <Link
                    href={`/reservations/${reservation.id}`}
                    title="Voir les détails de la réservation"
                    aria-label={`Voir la réservation ${reservation.code_reservation}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"
                  >
                    <Eye
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Confirmer */}
                  {canConfirm && (
                    <button
                      type="button"
                      onClick={() =>
                        onConfirm?.(reservation)
                      }
                      title="Confirmer la réservation"
                      aria-label={`Confirmer la réservation ${reservation.code_reservation}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-emerald-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      <Check
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  {/* Annuler */}
                  {canCancel && (
                    <button
                      type="button"
                      onClick={() =>
                        onCancel?.(reservation)
                      }
                      title="Annuler la réservation"
                      aria-label={`Annuler la réservation ${reservation.code_reservation}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700"
                    >
                      <X
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>


);
}

/**

* État affiché lorsqu'aucune réservation n'est disponible.
  */
  function EmptyReservationState() {
  return (

   <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50">
       <Ticket
         className="h-6 w-6 text-sky-600"
         aria-hidden="true"
       />
     </div>

     <h3 className="mt-4 text-sm font-semibold text-slate-900">
       Aucune réservation trouvée
     </h3>

     <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
       Aucune réservation ne correspond aux critères de recherche
       actuels.
     </p>
   </div>

);
}
