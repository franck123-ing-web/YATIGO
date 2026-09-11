import Link from "next/link";
type Props = {
  searchParams: Promise<{
    depart?: string;
    arrivee?: string;
    date?: string;
  }>;
};

const trajets = [
  {
    id: 1,
    agence: "Touristique Express",
    depart: "Yaoundé",
    arrivee: "Douala",
    heureDepart: "08:00",
    heureArrivee: "11:30",
    prix: "5 000 FCFA",
    places: 12,
  },
  {
    id: 2,
    agence: "Finexs Voyages",
    depart: "Yaoundé",
    arrivee: "Douala",
    heureDepart: "10:00",
    heureArrivee: "13:30",
    prix: "6 000 FCFA",
    places: 8,
  },
  {
    id: 3,
    agence: "General Express",
    depart: "Yaoundé",
    arrivee: "Douala",
    heureDepart: "14:00",
    heureArrivee: "17:30",
    prix: "5 500 FCFA",
    places: 17,
  },
];

export default async function TrajetsPage({ searchParams }: Props) {
  const params = await searchParams;
 
  const depart = params.depart || "Yaoundé";
  const arrivee = params.arrivee || "Douala";
  const date = params.date;
  return (
    <main className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="mx-auto max-w-5xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Résultats de recherche
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          {depart} → {arrivee}
        </h1>
        {date && (
        <p className="mt-2 text-sm text-slate-500">
            Date de départ : {date}
        </p>
        )}
        <p className="mt-2 text-slate-500">
          Choisissez le trajet qui vous convient.
        </p>

        <div className="mt-8 space-y-4">
          {trajets.map((trajet) => (
            <div
              key={trajet.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between gap-6">

                <div>
                  <p className="text-sm font-medium text-blue-600">
                    {trajet.agence}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {trajet.heureDepart}
                      </p>
                      <p className="text-sm text-slate-500">
                        {depart}
                      </p>
                    </div>

                    <span className="text-slate-400">→</span>

                    <div>
                      <p className="text-2xl font-bold text-slate-900">
                        {trajet.heureArrivee}
                      </p>
                      <p className="text-sm text-slate-500">
                        {arrivee}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold text-slate-900">
                    {trajet.prix}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {trajet.places} places disponibles
                  </p>

                  <Link
                 href={`/visiteur/trajets/${trajet.id}?depart=${encodeURIComponent(
                        depart
                 )}&arrivee=${encodeURIComponent(arrivee)}&date=${encodeURIComponent(
                    date || ""
                    )}`}
                className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                 Voir le trajet
                </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}