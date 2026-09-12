export function PopularDestinations() {
  const destinations = [
    {
      depart: "Yaoundé",
      arrivee: "Douala",
      duree: "3h 30",
      prix: "À partir de 5 000 FCFA",
    },
    {
      depart: "Douala",
      arrivee: "Bafoussam",
      duree: "4h",
      prix: "À partir de 6 000 FCFA",
    },
    {
      depart: "Yaoundé",
      arrivee: "Bafoussam",
      duree: "4h 30",
      prix: "À partir de 6 500 FCFA",
    },
  ];

  return (
    <section id="destinations" className="mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Destinations populaires
        </h2>

        <p className="mt-1 text-slate-500">
          Découvrez les trajets les plus recherchés.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-blue-600">
              Trajet populaire
            </p>

            <h3 className="mt-3 text-xl font-bold text-slate-900">
              {destination.depart}
              <span className="mx-2 text-blue-600">→</span>
              {destination.arrivee}
            </h3>

            <p className="mt-3 text-sm text-slate-500">
              Durée estimée : {destination.duree}
            </p>

            <p className="mt-5 font-semibold text-slate-800">
              {destination.prix}
            </p>

            <button className="mt-5 w-full rounded-xl border border-blue-600 px-4 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
              Voir les trajets
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}