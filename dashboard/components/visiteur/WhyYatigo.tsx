export function WhyYatigo() {
  const avantages = [
    {
      icon: "✓",
      titre: "Réservation simple",
      description:
        "Trouvez votre trajet et réservez votre place en quelques étapes.",
    },
    {
      icon: "🔒",
      titre: "Paiement sécurisé",
      description:
        "Effectuez vos paiements simplement et en toute sécurité.",
    },
    {
      icon: "🎫",
      titre: "Billet électronique",
      description:
        "Recevez votre billet électronique avec QR Code après votre réservation.",
    },
    {
      icon: "🚌",
      titre: "Voyage en confiance",
      description:
        "Voyagez avec des agences et des trajets disponibles sur YATIGO.",
    },
  ];

  return (
    <section className="mt-14">
      <div className="mb-7">
        <h2 className="text-2xl font-bold text-slate-900">
          Pourquoi choisir YATIGO ?
        </h2>

        <p className="mt-1 text-slate-500">
          Une expérience simple pour préparer votre prochain voyage.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {avantages.map((avantage) => (
          <div
            key={avantage.titre}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
              {avantage.icon}
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {avantage.titre}
            </h3>

            <p className="mt-2 leading-6 text-slate-500">
              {avantage.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}