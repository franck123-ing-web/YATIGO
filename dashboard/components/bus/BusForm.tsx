"use client";

import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

import { BusFeatureCard } from "./BusFeatureCard";
import { BusStatusSelector } from "./BusStatusSelector";
import { BusTypeSelector } from "./BusTypeSelector";

type BusStatus =
  | "DISPONIBLE"
  | "MAINTENANCE"
  | "HORS_SERVICE";

type BusType = "VIP" | "CLASSIQUE";

export interface BusFormData {
  numero_immatriculation: string;
  nom_commercial: string;
  modele: string;
  capacite: string;
  etat: BusStatus;
  type: BusType;
  climatisation: boolean;
  wifi: boolean;
  prise_usb: boolean;
  inclinaison_sieges: boolean;
  nombre_sieges_par_rangee: string;
}

interface BusFormProps {
  initialData?: Partial<BusFormData>;
  mode?: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (data: BusFormData) => void | Promise<void>;
}

type BusFormErrors = Partial<
  Record<keyof BusFormData, string>
>;

const initialFormData: BusFormData = {
  numero_immatriculation: "",
  nom_commercial: "",
  modele: "",
  capacite: "",
  etat: "DISPONIBLE",
  type: "CLASSIQUE",
  climatisation: false,
  wifi: false,
  prise_usb: false,
  inclinaison_sieges: false,
  nombre_sieges_par_rangee: "",
};

function buildInitialFormData(
  initialData?: Partial<BusFormData>,
): BusFormData {
  return {
    ...initialFormData,
    ...initialData,
  };
}

export function BusForm({
  initialData,
  mode = "create",
  onCancel,
  onSubmit,
}: BusFormProps) {
  const [formData, setFormData] =
  useState<BusFormData>(
    buildInitialFormData(initialData),
  );

  const [errors, setErrors] =
    useState<BusFormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const updateField = <K extends keyof BusFormData>(
    field: K,
    value: BusFormData[K],
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const validate = (): boolean => {
    const nextErrors: BusFormErrors = {};

    const immatriculation =
      formData.numero_immatriculation.trim();

    if (!immatriculation) {
      nextErrors.numero_immatriculation =
        "Le numéro d'immatriculation est obligatoire.";
    } else if (immatriculation.length > 50) {
      nextErrors.numero_immatriculation =
        "Le numéro d'immatriculation ne peut pas dépasser 50 caractères.";
    }

    if (formData.nom_commercial.length > 100) {
      nextErrors.nom_commercial =
        "Le nom commercial ne peut pas dépasser 100 caractères.";
    }

    if (formData.modele.length > 100) {
      nextErrors.modele =
        "Le modèle ne peut pas dépasser 100 caractères.";
    }

    const capacite = Number(formData.capacite);

    if (!formData.capacite) {
      nextErrors.capacite =
        "La capacité est obligatoire.";
    } else if (
      !Number.isInteger(capacite) ||
      capacite <= 0
    ) {
      nextErrors.capacite =
        "La capacité doit être un nombre entier supérieur à 0.";
    }

    const siegesParRangee = Number(
      formData.nombre_sieges_par_rangee,
    );

    if (!formData.nombre_sieges_par_rangee) {
      nextErrors.nombre_sieges_par_rangee =
        "Le nombre de sièges par rangée est obligatoire.";
    } else if (
      !Number.isInteger(siegesParRangee) ||
      siegesParRangee <= 0
    ) {
      nextErrors.nombre_sieges_par_rangee =
        "Le nombre de sièges par rangée doit être un nombre entier supérieur à 0.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

try {
  await onSubmit?.(formData);
} finally {
  setIsSubmitting(false);
}
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-6"
    >
      {/* Informations générales */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <span
                className="text-lg"
                aria-hidden="true"
              >
                🚌
              </span>
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Informations du véhicule
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Renseignez les informations principales du bus.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <FormField
            label="Numéro d'immatriculation"
            required
            error={errors.numero_immatriculation}
          >
            <input
              type="text"
              value={formData.numero_immatriculation}
              onChange={(event) =>
                updateField(
                  "numero_immatriculation",
                  event.target.value,
                )
              }
              placeholder="Ex. LT-123-AA"
              maxLength={50}
              autoComplete="off"
              className={inputClass(
                Boolean(errors.numero_immatriculation),
              )}
            />
          </FormField>

          <FormField
            label="Nom commercial"
            error={errors.nom_commercial}
            hint="Nom utilisé pour identifier facilement le bus."
          >
            <input
              type="text"
              value={formData.nom_commercial}
              onChange={(event) =>
                updateField(
                  "nom_commercial",
                  event.target.value,
                )
              }
              placeholder="Ex. Express VIP"
              maxLength={100}
              className={inputClass(
                Boolean(errors.nom_commercial),
              )}
            />
          </FormField>

          <FormField
            label="Modèle"
            error={errors.modele}
            hint="Modèle du véhicule."
          >
            <input
              type="text"
              value={formData.modele}
              onChange={(event) =>
                updateField(
                  "modele",
                  event.target.value,
                )
              }
              placeholder="Ex. Mercedes Sprinter"
              maxLength={100}
              className={inputClass(
                Boolean(errors.modele),
              )}
            />
          </FormField>

          <FormField
            label="Capacité"
            required
            error={errors.capacite}
            hint="Nombre total de places prévues."
          >
            <div className="relative">
              <input
                type="number"
                min={1}
                step={1}
                value={formData.capacite}
                onChange={(event) =>
                  updateField(
                    "capacite",
                    event.target.value,
                  )
                }
                placeholder="30"
                className={`${inputClass(
                  Boolean(errors.capacite),
                )} pr-16`}
              />

              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-slate-400">
                places
              </span>
            </div>
          </FormField>
        </div>
      </section>

      {/* Type du bus */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">
            Type de service
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choisissez le type de service proposé par ce bus.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <BusTypeSelector
            value={formData.type}
            onChange={(value) =>
              updateField("type", value)
            }
          />
        </div>
      </section>

      {/* État du bus */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">
            État du véhicule
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Indiquez l'état actuel du bus.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <BusStatusSelector
            value={formData.etat}
            onChange={(value) =>
              updateField("etat", value)
            }
          />
        </div>
      </section>

      {/* Configuration des sièges */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">
            Configuration des sièges
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Ces informations serviront à configurer les places
            du bus.
          </p>
        </div>

        <div className="max-w-md p-5 sm:p-6">
          <FormField
            label="Nombre de sièges par rangée"
            required
            error={errors.nombre_sieges_par_rangee}
            hint="Cette valeur facilite la création des sièges et ne détermine pas à elle seule la capacité."
          >
            <input
              type="number"
              min={1}
              step={1}
              value={formData.nombre_sieges_par_rangee}
              onChange={(event) =>
                updateField(
                  "nombre_sieges_par_rangee",
                  event.target.value,
                )
              }
              placeholder="Ex. 4"
              className={inputClass(
                Boolean(errors.nombre_sieges_par_rangee),
              )}
            />
          </FormField>
        </div>
      </section>

      {/* Équipements */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
          <h2 className="text-base font-semibold text-slate-900">
            Équipements
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sélectionnez les équipements disponibles dans le bus.
          </p>
        </div>

        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
          <BusFeatureCard
            icon="❄️"
            label="Climatisation"
            description="Système de climatisation disponible."
            enabled={formData.climatisation}
            onChange={(value) =>
              updateField("climatisation", value)
            }
          />

          <BusFeatureCard
            icon="📶"
            label="Wi-Fi"
            description="Connexion Wi-Fi disponible."
            enabled={formData.wifi}
            onChange={(value) =>
              updateField("wifi", value)
            }
          />

          <BusFeatureCard
            icon="🔌"
            label="Prises USB"
            description="Prises USB accessibles aux voyageurs."
            enabled={formData.prise_usb}
            onChange={(value) =>
              updateField("prise_usb", value)
            }
          />

          <BusFeatureCard
            icon="💺"
            label="Sièges inclinables"
            description="Sièges permettant une inclinaison."
            enabled={formData.inclinaison_sieges}
            onChange={(value) =>
              updateField("inclinaison_sieges", value)
            }
          />
        </div>
      </section>

      {/* Actions */}
      <div className="sticky bottom-0 z-10 -mx-4 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Annuler
          </button>

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
      {mode === "edit"
        ? "Enregistrer les modifications"
        : "Enregistrer le bus"}
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

function inputClass(hasError: boolean) {
  return [
    "h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition",
    "placeholder:text-slate-400",
    "focus:ring-2",
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
      : "border-slate-300 focus:border-sky-500 focus:ring-sky-500/20",
  ].join(" ");
}