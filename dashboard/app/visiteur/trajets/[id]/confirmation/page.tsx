"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();

  const depart = searchParams.get("depart") || "";
  const arrivee = searchParams.get("arrivee") || "";
  const date = searchParams.get("date") || "";
  const siege = searchParams.get("siege") || "";

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");

  const formulaireComplet =
    prenom.trim() !== "" &&
    nom.trim() !== "" &&
    telephone.trim() !== "" &&
    email.trim() !== "";

  return (
    <main className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Confirmation de réservation
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Vérifiez votre réservation
        </h1>

        <p className="mt-2 text-slate-500">
          Vérifiez les informations avant de continuer.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-xl font-bold text-slate-900">
            Votre trajet
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">
                Trajet
              </p>

              <p className="font-semibold text-slate-900">
                {depart} → {arrivee}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Date de départ
              </p>

              <p className="font-semibold text-slate-900">
                {date}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Siège
              </p>

              <p className="font-semibold text-slate-900">
                {siege}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-8">

            <h2 className="text-xl font-bold text-slate-900">
              Informations du passager
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Renseignez les informations du voyageur.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Prénom
                </label>

                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  placeholder="Ex : Franck"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Nom
                </label>

                <input
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Ex : Nono"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Téléphone
                </label>

                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="Ex : +237 6..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  E-mail
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex : nom@email.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
                />
              </div>

            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">

            <div className="mb-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Passager
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {prenom || nom
                  ? `${prenom} ${nom}`.trim()
                  : "À compléter"}
              </p>
            </div>

            <button
              type="button"
              disabled={!formulaireComplet}
              className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Confirmer la réservation
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}