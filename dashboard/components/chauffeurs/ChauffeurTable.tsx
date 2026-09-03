import {
  ContactRound,
  Edit,
  MoreHorizontal,
  Phone,
} from "lucide-react";
export type ChauffeurStatus =
  | "ACTIF"
  | "INDISPONIBLE"
  | "EN_CONGE"
  | "SUSPENDU";

export interface Chauffeur {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  numero_permis: string;
  date_expiration_permis: string;
  statut: ChauffeurStatus;
}

interface ChauffeurTableProps {
  chauffeurs: Chauffeur[];
}

const statusLabels: Record<
  ChauffeurStatus,
  string
> = {
  ACTIF: "Actif",
  INDISPONIBLE: "Indisponible",
  EN_CONGE: "En congé",
  SUSPENDU: "Suspendu",
};

const statusClasses: Record<
  ChauffeurStatus,
  string
> = {
  ACTIF:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20",

  INDISPONIBLE:
    "bg-amber-50 text-amber-700 ring-amber-600/20",

  EN_CONGE:
    "bg-sky-50 text-sky-700 ring-sky-600/20",

  SUSPENDU:
    "bg-red-50 text-red-700 ring-red-600/20",
};

export function ChauffeurTable({
  chauffeurs,
}: ChauffeurTableProps) {
  if (chauffeurs.length === 0) {
  return <EmptyChauffeurState />;
}

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Chauffeur
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Téléphone
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Permis
              </th>

              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Expiration
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
            {chauffeurs.map((chauffeur) => (
              <tr
                key={chauffeur.id}
                className="transition hover:bg-slate-50"
              >
                {/* Nom */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-slate-900">
                      {chauffeur.prenom}{" "}
                      {chauffeur.nom}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      ID : {chauffeur.id.slice(0, 8)}
                    </p>
                  </div>
                </td>

                {/* Téléphone */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone
                      className="h-4 w-4 text-slate-400"
                      aria-hidden="true"
                    />

                    {chauffeur.telephone}
                  </div>
                </td>

                {/* Permis */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {chauffeur.numero_permis}
                </td>

                {/* Expiration */}
                <td className="px-6 py-4 text-sm text-slate-700">
                  {chauffeur.date_expiration_permis}
                </td>

                {/* Statut */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[chauffeur.statut]}`}
                  >
                    {statusLabels[chauffeur.statut]}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      title="Modifier"
                    >
                      <Edit
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                      title="Plus d'options"
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

  /**
 * État affiché lorsqu'aucun chauffeur
 * ne correspond aux critères actuels.
 */
function EmptyChauffeurState() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-50">
        <ContactRound
          className="h-6 w-6 text-sky-600"
          aria-hidden="true"
        />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-900">
        Aucun chauffeur trouvé
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
        Aucun chauffeur ne correspond aux critères de
        recherche actuels.
      </p>
    </div>
  );
}
}