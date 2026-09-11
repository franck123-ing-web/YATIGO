import Link from "next/link";
type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    depart?: string;
    arrivee?: string;
    date?: string;
  }>;
};

const trajets = [
  {
    id: "1",
    agence: "Touristique Express",
    heureDepart: "08:00",
    heureArrivee: "11:30",
    prix: "5 000 FCFA",
    places: 12,
    duree: "3h30",
  },
  {
    id: "2",
    agence: "Finexs Voyages",
    heureDepart: "10:00",
    heureArrivee: "13:30",
    prix: "6 000 FCFA",
    places: 8,
    duree: "3h30",
  },
  {
    id: "3",
    agence: "General Express",
    heureDepart: "14:00",
    heureArrivee: "17:30",
    prix: "5 500 FCFA",
    places: 17,
    duree: "3h30",
  },
];

export default async function TrajetDetailPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const query = await searchParams;

  const trajet = trajets.find((item) => item.id === id);

  const depart = query.depart || "Yaoundé";
  const arrivee = query.arrivee || "Douala";
  const date = query.date || "Non précisée";

  if (!trajet) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p className="text-red-600">
          Trajet introuvable.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Détails du trajet
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          {depart} → {arrivee}
        </h1>

        <p className="mt-2 text-slate-500">
          Date de départ : {date}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <p className="text-sm font-medium text-blue-600">
                {trajet.agence}
              </p>

              <div className="mt-5 flex items-center gap-6">
                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {trajet.heureDepart}
                  </p>

                  <p className="text-slate-500">
                    {depart}
                  </p>
                </div>

                <span className="text-xl text-slate-400">
                  →
                </span>

                <div>
                  <p className="text-3xl font-bold text-slate-900">
                    {trajet.heureArrivee}
                  </p>

                  <p className="text-slate-500">
                    {arrivee}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:text-right">
              <p className="text-2xl font-bold text-slate-900">
                {trajet.prix}
              </p>

              <p className="mt-2 text-slate-500">
                {trajet.places} places disponibles
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 border-t border-slate-200 pt-6 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">
                Durée estimée
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {trajet.duree}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Date
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {date}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Type de billet
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                Billet électronique
              </p>
            </div>
          </div>

          <Link
            href={`/visiteur/trajets/${id}/sieges?depart=${encodeURIComponent(
                depart
                )}&arrivee=${encodeURIComponent(arrivee)}&date=${encodeURIComponent(date)}`}
                className="mt-8 block w-full rounded-xl bg-blue-600 px-6 py-4 text-center font-semibold text-white hover:bg-blue-700"
                    >
                Choisir un siège
            </Link>

        </div>
      </div>
    </main>
  );
}