"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Save,
  Trash2,
  UserPlus,
} from "lucide-react";

type ReservationStatus =
  | ""
  | "EN_ATTENTE"
  | "CONFIRMEE"
  | "ANNULEE"
  | "UTILISEE";

type PassengerType =
  | ""
  | "ADULTE"
  | "ENFANT"
  | "BEBE";

interface PassengerFormData {
  id: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  type: PassengerType;
  numero_piece_identite: string;
  siege_id: string;
}

interface ReservationFormData {
  trajet_id: string;
  voyageur_nom: string;
  voyageur_prenom: string;
  voyageur_email: string;
  voyageur_telephone: string;
  statut: ReservationStatus;
  passagers: PassengerFormData[];
}

const initialPassenger = (): PassengerFormData => ({
  id: crypto.randomUUID(),
  nom: "",
  prenom: "",
  date_naissance: "",
  type: "",
  numero_piece_identite: "",
  siege_id: "",
});

const initialFormData: ReservationFormData = {
  trajet_id: "",
  voyageur_nom: "",
  voyageur_prenom: "",
  voyageur_email: "",
  voyageur_telephone: "",
  statut: "",
  passagers: [initialPassenger()],
};

export function ReservationForm() {
  const [formData, setFormData] =
    useState<ReservationFormData>(initialFormData);

  function updateField<K extends keyof ReservationFormData>(
    field: K,
    value: ReservationFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function addPassenger() {
    setFormData((current) => ({
      ...current,
      passagers: [
        ...current.passagers,
        initialPassenger(),
      ],
    }));
  }

  function removePassenger(passengerId: string) {
    setFormData((current) => ({
      ...current,
      passagers: current.passagers.filter(
        (passenger) =>
          passenger.id !== passengerId,
      ),
    }));
  }

  function updatePassenger<
    K extends keyof PassengerFormData,
  >(
    passengerId: string,
    field: K,
    value: PassengerFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      passagers: current.passagers.map(
        (passenger) =>
          passenger.id === passengerId
            ? {
                ...passenger,
                [field]: value,
              }
            : passenger,
      ),
    }));
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    console.log(
      "Réservation à créer :",
      formData,
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Trajet */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">
            Sélection du trajet
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choisissez le trajet concerné par cette réservation.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Trajet
          </label>

          <select
            value={formData.trajet_id}
            onChange={(event) =>
              updateField(
                "trajet_id",
                event.target.value,
              )
            }
            required
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="">
              Sélectionner un trajet
            </option>

            {/* Données temporaires */}
            <option value="trajet-1">
              Douala → Yaoundé — 10 septembre 2026
            </option>

            <option value="trajet-2">
              Yaoundé → Bafoussam — 11 septembre 2026
            </option>

            <option value="trajet-3">
              Douala → Edéa — 12 septembre 2026
            </option>
          </select>
        </div>
      </section>

      {/* Voyageur */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">
            Informations du voyageur
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Renseignez les coordonnées de la personne qui effectue la
            réservation.
          </p>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Nom
            </label>

            <input
              type="text"
              value={formData.voyageur_nom}
              onChange={(event) =>
                updateField(
                  "voyageur_nom",
                  event.target.value,
                )
              }
              placeholder="Ex. Dupont"
              required
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Prénom
            </label>

            <input
              type="text"
              value={formData.voyageur_prenom}
              onChange={(event) =>
                updateField(
                  "voyageur_prenom",
                  event.target.value,
                )
              }
              placeholder="Ex. Jean"
              required
             className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={formData.voyageur_email}
              onChange={(event) =>
                updateField(
                  "voyageur_email",
                  event.target.value,
                )
              }
              placeholder="exemple@email.com"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Téléphone
            </label>

            <input
              type="tel"
              value={formData.voyageur_telephone}
              onChange={(event) =>
                updateField(
                  "voyageur_telephone",
                  event.target.value,
                )
              }
              placeholder="+237 6XX XXX XXX"
             className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </div>
        </div>
      </section>

      {/* Passagers */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Passagers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Ajoutez les personnes qui vont effectuer le voyage.
            </p>
          </div>

          <button
            type="button"
            onClick={addPassenger}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 text-sm font-semibold text-sky-700 transition hover:bg-sky-100"
          >
            <UserPlus className="h-4 w-4" />
            Ajouter un passager
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          {formData.passagers.map(
            (passenger, index) => (
              <div
                key={passenger.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Passager {index + 1}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Informations du voyageur.
                    </p>
                  </div>

                  {formData.passagers.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removePassenger(passenger.id)
                      }
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50"
                      aria-label="Supprimer ce passager"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Nom
                    </label>

                    <input
                      type="text"
                      value={passenger.nom}
                      onChange={(event) =>
                        updatePassenger(
                          passenger.id,
                          "nom",
                          event.target.value,
                        )
                      }
                      required
                     className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Prénom
                    </label>

                    <input
                      type="text"
                      value={passenger.prenom}
                      onChange={(event) =>
                        updatePassenger(
                          passenger.id,
                          "prenom",
                          event.target.value,
                        )
                      }
                      required
                     className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Type de passager
                    </label>

                    <select
  value={passenger.type}
  onChange={(event) =>
    updatePassenger(
      passenger.id,
      "type",
      event.target.value as PassengerType,
    )
  }
  required
  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
>
  <option
    value=""
    disabled
    className="bg-white text-slate-500"
  >
    Sélectionner un type
  </option>

  <option
    value="ADULTE"
    className="bg-white text-slate-900"
  >
    Adulte
  </option>

  <option
    value="ENFANT"
    className="bg-white text-slate-900"
  >
    Enfant
  </option>

  <option
    value="BEBE"
    className="bg-white text-slate-900"
  >
    Bébé
  </option>
</select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Date de naissance
                    </label>

                    <input
                      type="date"
                      value={passenger.date_naissance}
                      onChange={(event) =>
                        updatePassenger(
                          passenger.id,
                          "date_naissance",
                          event.target.value,
                        )
                      }
                     className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Numéro de pièce d'identité
                    </label>

                    <input
                      type="text"
                      value={
                        passenger.numero_piece_identite
                      }
                      onChange={(event) =>
                        updatePassenger(
                          passenger.id,
                          "numero_piece_identite",
                          event.target.value,
                        )
                      }
                      placeholder="Ex. CNI123456"
                     className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Siège
                    </label>

                    <select
  value={passenger.siege_id}
  onChange={(event) =>
    updatePassenger(
      passenger.id,
      "siege_id",
      event.target.value,
    )
  }
  required
  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
>
  <option
    value=""
    disabled
    className="bg-white text-slate-500"
  >
    Sélectionner un siège
  </option>

  <option
    value="siege-1"
    className="bg-white text-slate-900"
  >
    A1
  </option>

  <option
    value="siege-2"
    className="bg-white text-slate-900"
  >
    A2
  </option>

  <option
    value="siege-3"
    className="bg-white text-slate-900"
  >
    B1
  </option>

  <option
    value="siege-4"
    className="bg-white text-slate-900"
  >
    B2
  </option>
</select>
                  </div>
                </div>
              </div>
            ),
          )}

          <button
            type="button"
            onClick={addPassenger}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-4 text-sm font-semibold text-slate-600 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700"
          >
            <Plus className="h-4 w-4" />
            Ajouter un autre passager
          </button>
        </div>
      </section>

    {/* Statut */}
<section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
  <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
    <h2 className="text-base font-semibold text-slate-900">
      Statut de la réservation
    </h2>

    <p className="mt-1 text-sm text-slate-500">
      Définissez le statut actuel de la réservation.
    </p>
  </div>

  <div className="p-5 sm:p-6">
    <div className="max-w-md">
      <label
        htmlFor="statut"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Statut
      </label>

      <select
  id="statut"
  value={formData.statut}
  onChange={(event) =>
    updateField(
      "statut",
      event.target.value as ReservationStatus,
    )
  }
  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
>
  <option
    value=""
    disabled
    className="bg-white text-slate-500"
  >
    Sélectionner un statut
  </option>

  <option
    value="EN_ATTENTE"
    className="bg-white text-slate-900"
  >
    En attente
  </option>

  <option
    value="CONFIRMEE"
    className="bg-white text-slate-900"
  >
    Confirmée
  </option>

  <option
    value="ANNULEE"
    className="bg-white text-slate-900"
  >
    Annulée
  </option>

  <option
    value="UTILISEE"
    className="bg-white text-slate-900"
  >
    Utilisée
  </option>
</select>
    </div>
  </div>
</section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/reservations"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Annuler
        </Link>

        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        >
          <Save className="h-4 w-4" />
          Créer la réservation
        </button>
      </div>
    </form>
  );
}