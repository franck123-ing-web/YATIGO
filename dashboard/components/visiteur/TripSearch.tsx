"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function TripSearch() {
  const router = useRouter();

  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams({
      depart,
      arrivee,
      date,
    });

    router.push(`/visiteur/trajets?${params.toString()}`);
  }

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex gap-10 border-b border-slate-200 px-6">
        <button className="border-b-2 border-blue-600 px-2 py-5 font-semibold text-blue-600">
          🚌 Rechercher un trajet
        </button>

        <button className="px-2 py-5 text-slate-500">
          🎫 Mes réservations
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 p-6 md:grid-cols-4"
      >
        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Ville de départ
          </label>

          <input
            type="text"
            placeholder="Ex : Yaoundé"
            value={depart}
            onChange={(event) => setDepart(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Ville d'arrivée
          </label>

          <input
            type="text"
            placeholder="Ex : Douala"
            value={arrivee}
            onChange={(event) => setArrivee(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-slate-700">
            Date de départ
          </label>

          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Rechercher
          </button>
        </div>
      </form>
    </section>
  );
}