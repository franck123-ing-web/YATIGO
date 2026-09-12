"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const seats = [
  { id: "1A", disponible: true },
  { id: "1B", disponible: true },
  { id: "1C", disponible: false },
  { id: "1D", disponible: true },

  { id: "2A", disponible: true },
  { id: "2B", disponible: false },
  { id: "2C", disponible: true },
  { id: "2D", disponible: true },

  { id: "3A", disponible: true },
  { id: "3B", disponible: true },
  { id: "3C", disponible: true },
  { id: "3D", disponible: false },
];

export default function SeatSelectionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const depart = searchParams.get("depart") || "Yaoundé";
  const arrivee = searchParams.get("arrivee") || "Douala";
  const date = searchParams.get("date") || "Non précisée";

  return (
    <main className="min-h-screen bg-slate-50 px-8 py-10">
      <div className="mx-auto max-w-4xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Choix du siège
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          {depart} → {arrivee}
        </h1>

        <p className="mt-2 text-slate-500">
          Date de départ : {date}
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="mb-8 flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-white border border-slate-300" />
              Disponible
            </div>

            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-slate-300" />
              Occupé
            </div>

            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-blue-600" />
              Sélectionné
            </div>
          </div>

          <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <p className="mb-6 text-center font-semibold text-slate-700">
              Avant du bus
            </p>

            <div className="grid grid-cols-4 gap-4">
              {seats.map((seat) => {
                const isSelected = selectedSeat === seat.id;

                return (
                  <button
                    key={seat.id}
                    type="button"
                    disabled={!seat.disponible}
                    onClick={() => setSelectedSeat(seat.id)}
                    className={`rounded-xl px-4 py-4 font-semibold transition
                      ${
                        !seat.disponible
                          ? "cursor-not-allowed bg-slate-300 text-slate-500"
                          : isSelected
                          ? "bg-blue-600 text-white"
                          : "border border-slate-300 bg-white text-slate-800 hover:border-blue-600"
                      }
                    `}
                  >
                    {seat.id}
                  </button>
                );
              })}
            </div>

          </div>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Siège sélectionné
              </p>

              <p className="text-xl font-bold text-slate-900">
                {selectedSeat || "Aucun"}
              </p>
            </div>

            <button
  type="button"
  disabled={!selectedSeat}
  onClick={() => {
    if (!selectedSeat) return;

    router.push(
      `/visiteur/trajets/${params.id}/confirmation?depart=${encodeURIComponent(
        depart
      )}&arrivee=${encodeURIComponent(
        arrivee
      )}&date=${encodeURIComponent(
        date
      )}&siege=${encodeURIComponent(selectedSeat)}`
    );
  }}
  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
>
  Continuer
</button>
          </div>

        </div>
      </div>
    </main>
  );
}