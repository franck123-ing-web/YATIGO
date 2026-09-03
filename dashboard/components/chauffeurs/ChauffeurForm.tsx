"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  UserRound,
} from "lucide-react";


type ChauffeurStatus =
  | "ACTIF"
  | "INDISPONIBLE"
  | "EN_CONGE"
  | "SUSPENDU";


interface ChauffeurFormValues {
  nom: string;
  prenom: string;
  telephone: string;
  numero_permis: string;
  date_expiration_permis: string;
  statut: ChauffeurStatus;
}


const initialValues: ChauffeurFormValues = {
  nom: "",
  prenom: "",
  telephone: "",
  numero_permis: "",
  date_expiration_permis: "",
  statut: "ACTIF",
};


interface ChauffeurFormErrors {
  nom?: string;
  prenom?: string;
  telephone?: string;
  numero_permis?: string;
  date_expiration_permis?: string;
}


export function ChauffeurForm() {
  const [formData, setFormData] =
    useState<ChauffeurFormValues>(initialValues);

  const [errors, setErrors] =
    useState<ChauffeurFormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);


  function updateField<
    K extends keyof ChauffeurFormValues
  >(
    field: K,
    value: ChauffeurFormValues[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }


  function validate(): boolean {
    const nextErrors: ChauffeurFormErrors = {};

    if (!formData.nom.trim()) {
      nextErrors.nom =
        "Le nom est obligatoire.";
    }

    if (!formData.prenom.trim()) {
      nextErrors.prenom =
        "Le prénom est obligatoire.";
    }

    if (!formData.telephone.trim()) {
      nextErrors.telephone =
        "Le numéro de téléphone est obligatoire.";
    }

    if (!formData.numero_permis.trim()) {
      nextErrors.numero_permis =
        "Le numéro de permis est obligatoire.";
    }

    if (!formData.date_expiration_permis) {
      nextErrors.date_expiration_permis =
        "La date d'expiration du permis est obligatoire.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Pour l'instant, nous affichons les données.
       *
       * Plus tard, nous connecterons ce formulaire
       * à l'API FastAPI.
       */
      console.log(
        "Chauffeur à créer :",
        formData,
      );

      alert(
        "Le chauffeur est prêt à être créé.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }


  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >

      {/* Informations personnelles */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <UserRound
                className="h-5 w-5"
                aria-hidden="true"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Informations personnelles
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Renseignez les informations principales du chauffeur.
              </p>
            </div>

          </div>

        </div>


        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

          {/* Nom */}
          <FormField
            label="Nom"
            required
            error={errors.nom}
          >
            <input
              type="text"
              value={formData.nom}
              onChange={(event) =>
                updateField(
                  "nom",
                  event.target.value,
                )
              }
              placeholder="Ex. DUPONT"
              className={inputClass(
                Boolean(errors.nom),
              )}
            />
          </FormField>


          {/* Prénom */}
          <FormField
            label="Prénom"
            required
            error={errors.prenom}
          >
            <input
              type="text"
              value={formData.prenom}
              onChange={(event) =>
                updateField(
                  "prenom",
                  event.target.value,
                )
              }
              placeholder="Ex. Jean"
              className={inputClass(
                Boolean(errors.prenom),
              )}
            />
          </FormField>


          {/* Téléphone */}
          <FormField
            label="Téléphone"
            required
            error={errors.telephone}
            hint="Numéro utilisé pour contacter le chauffeur."
          >
            <input
              type="tel"
              value={formData.telephone}
              onChange={(event) =>
                updateField(
                  "telephone",
                  event.target.value,
                )
              }
              placeholder="Ex. +237 6 99 99 99 99"
              className={inputClass(
                Boolean(errors.telephone),
              )}
            />
          </FormField>

        </div>

      </section>


      {/* Permis de conduire */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

          <h2 className="text-base font-semibold text-slate-900">
            Permis de conduire
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Renseignez les informations relatives au permis du chauffeur.
          </p>

        </div>


        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

          {/* Numéro permis */}
          <FormField
            label="Numéro de permis"
            required
            error={errors.numero_permis}
          >
            <input
              type="text"
              value={formData.numero_permis}
              onChange={(event) =>
                updateField(
                  "numero_permis",
                  event.target.value,
                )
              }
              placeholder="Ex. CM-123456789"
              className={inputClass(
                Boolean(errors.numero_permis),
              )}
            />
          </FormField>


          {/* Date expiration */}
          <FormField
            label="Date d'expiration"
            required
            error={
              errors.date_expiration_permis
            }
          >
            <input
              type="date"
              value={
                formData.date_expiration_permis
              }
              onChange={(event) =>
                updateField(
                  "date_expiration_permis",
                  event.target.value,
                )
              }
              className={inputClass(
                Boolean(
                  errors.date_expiration_permis,
                ),
              )}
            />
          </FormField>

        </div>

      </section>


      {/* Statut */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

          <h2 className="text-base font-semibold text-slate-900">
            Statut du chauffeur
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Définissez la disponibilité actuelle du chauffeur.
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
                  event.target.value as ChauffeurStatus,
                )
              }
              className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="ACTIF">
                Actif
              </option>

              <option value="INDISPONIBLE">
                Indisponible
              </option>

              <option value="EN_CONGE">
                En congé
              </option>

              <option value="SUSPENDU">
                Suspendu
              </option>
            </select>

          </div>

        </div>

      </section>


      {/* Actions */}
<div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
  <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">

    <Link
      href="/chauffeurs"
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      <ArrowLeft
        className="h-4 w-4"
        aria-hidden="true"
      />

      Annuler
    </Link>

    <button
      type="submit"
      disabled={isSubmitting}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? (
        <>
          <span
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden="true"
          />

          Enregistrement...
        </>
      ) : (
        <>
          <Save
            className="h-4 w-4"
            aria-hidden="true"
          />

          Créer le chauffeur
        </>
      )}
    </button>

  </div>
</div>
    </form>
  );
}


interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}


function FormField({
  label,
  required = false,
  error,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-slate-700">

        {label}

        {required && (
          <span
            className="ml-1 text-red-500"
            aria-hidden="true"
          >
            *
          </span>
        )}

      </label>


      {children}


      {error ? (
        <p
          role="alert"
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs leading-5 text-slate-500">
          {hint}
        </p>
      ) : null}

    </div>
  );
}


function inputClass(
  hasError: boolean,
) {
  return [
    "h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition",
    "placeholder:text-slate-400",
    "focus:ring-2",

    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20",
  ].join(" ");
}