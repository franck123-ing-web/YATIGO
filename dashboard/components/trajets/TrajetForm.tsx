"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import type { TrajetStatus } from "@/lib/trajet/trajet.types";

interface TrajetFormValues {
  ville_depart_id: string;
  ville_arrivee_id: string;
  bus_id: string;
  chauffeur_id: string;

  date_depart: string;
  heure_depart: string;
  heure_arrivee_estimee: string;

  prix: string;

  statut: TrajetStatus;

  reservations_ouvertes: boolean;
}

const initialValues: TrajetFormValues = {
  ville_depart_id: "",
  ville_arrivee_id: "",
  bus_id: "",
  chauffeur_id: "",

  date_depart: "",
  heure_depart: "",
  heure_arrivee_estimee: "",

  prix: "",

  statut: "PROGRAMME",

  reservations_ouvertes: true,
};

export function TrajetForm() {
  const [formData, setFormData] =
    useState<TrajetFormValues>(initialValues);

  function updateField<K extends keyof TrajetFormValues>(
    field: K,
    value: TrajetFormValues[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    console.log("Trajet à créer :", formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Informations du trajet
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Renseignez les informations principales du trajet.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Ville de départ */}
          <div>
            <label
              htmlFor="ville_depart"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Ville de départ
            </label>

            <select
              id="ville_depart"
              value={formData.ville_depart_id}
              onChange={(event) =>
                updateField(
                  "ville_depart_id",
                  event.target.value,
                )
              }
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="">
                Sélectionner une ville
              </option>
            </select>
          </div>

          {/* Ville d'arrivée */}
          <div>
            <label
              htmlFor="ville_arrivee"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Ville d'arrivée
            </label>

            <select
              id="ville_arrivee"
              value={formData.ville_arrivee_id}
              onChange={(event) =>
                updateField(
                  "ville_arrivee_id",
                  event.target.value,
                )
              }
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="">
                Sélectionner une ville
              </option>
            </select>
          </div>

          {/* Bus */}
          <div>
            <label
              htmlFor="bus"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Bus
            </label>

            <select
              id="bus"
              value={formData.bus_id}
              onChange={(event) =>
                updateField(
                  "bus_id",
                  event.target.value,
                )
              }
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="">
                Sélectionner un bus
              </option>
            </select>
          </div>

          {/* Chauffeur */}
          <div>
            <label
              htmlFor="chauffeur"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Chauffeur
            </label>

            <select
              id="chauffeur"
              value={formData.chauffeur_id}
              onChange={(event) =>
                updateField(
                  "chauffeur_id",
                  event.target.value,
                )
              }
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="">
                Sélectionner un chauffeur
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* Date et horaires */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-slate-900">
            Date et horaires
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Définissez la date et les horaires du trajet.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">

          <div>
            <label
              htmlFor="date_depart"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Date de départ
            </label>

            <input
              id="date_depart"
              type="date"
              value={formData.date_depart}
              onChange={(event) =>
                updateField(
                  "date_depart",
                  event.target.value,
                )
              }
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="heure_depart"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Heure de départ
            </label>

            <input
  id="heure_depart"
  type="time"
  value={formData.heure_depart}
  onChange={(event) =>
    updateField(
      "heure_depart",
      event.target.value,
    )
  }
  required
  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
/>
          </div>

          <div>
            <label
              htmlFor="heure_arrivee"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Arrivée estimée
            </label>

            <input
  id="heure_arrivee"
  type="time"
  value={formData.heure_arrivee_estimee}
  onChange={(event) =>
    updateField(
      "heure_arrivee_estimee",
      event.target.value,
    )
  }
  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
/>
          </div>

        </div>
      </div>

      {/* Prix et réservations */}
<div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
  <div className="mb-6">
    <h2 className="text-base font-semibold text-slate-900">
      Tarification et réservations
    </h2>
  </div>

  <div className="space-y-5">
    {/* Prix */}
<div className="max-w-xs">
  <label
    htmlFor="prix"
    className="mb-2 block text-sm font-medium text-slate-700"
  >
    Prix du trajet
  </label>

  <div className="relative">
    <input
      id="prix"
      type="number"
      min="0"
      step="1"
      value={formData.prix}
      onChange={(event) =>
        updateField("prix", event.target.value)
      }
      placeholder="Ex. : 5 000"
      required
      className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 pr-16 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
    />

    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-slate-400">
      FCFA
    </span>
  </div>
</div>

    {/* Réservations */}
    <div className="border-t border-slate-100 pt-5">
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={formData.reservations_ouvertes}
          onChange={(event) =>
            updateField(
              "reservations_ouvertes",
              event.target.checked,
            )
          }
          className="mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
        />

        <div>
          <span className="block text-sm font-medium text-slate-700">
            Autoriser les réservations dès maintenant
          </span>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Si cette option est activée, les voyageurs pourront
            réserver des places sur ce trajet dès sa création.
            Sinon, le trajet sera créé mais les réservations
            resteront fermées jusqu'à leur ouverture.
          </p>
        </div>
      </label>
    </div>
  </div>
</div>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

        <Link
          href="/trajets"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Annuler
        </Link>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <Save className="h-4 w-4" />
          Créer le trajet
        </button>

      </div>
    </form>
  );
}