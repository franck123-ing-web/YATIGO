"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Bus } from "@/types/bus";
import {
  busFormSchema,
  type BusFormValues,
} from "@/lib/validations/bus";

interface BusFormProps {
  bus?: Bus;
  onSubmit: (data: BusFormValues) => Promise<void>;
  onCancel: () => void;
}

/**
 * Formulaire réutilisable pour créer ou modifier un bus.
 *
 * La communication avec le Backend est volontairement gérée
 * par le composant parent.
 */
export function BusForm({
  bus,
  onSubmit,
  onCancel,
}: BusFormProps) {
  const isEditing = Boolean(bus);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusFormValues>({
    resolver: zodResolver(busFormSchema),
    defaultValues: {
      numero_immatriculation: bus?.numero_immatriculation ?? "",
      nom_commercial: bus?.nom_commercial ?? "",
      modele: bus?.modele ?? "",
      capacite: bus?.capacite ?? 1,
      type: bus?.type ?? "CLASSIQUE",
      climatisation: bus?.climatisation ?? false,
      wifi: bus?.wifi ?? false,
      prise_usb: bus?.prise_usb ?? false,
      inclinaison_sieges: bus?.inclinaison_sieges ?? false,
      nombre_sieges_par_rangee:
        bus?.nombre_sieges_par_rangee ?? 1,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          {isEditing ? "Modifier le bus" : "Ajouter un bus"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Renseignez les informations principales du véhicule.
        </p>
      </div>

      {/* Informations générales */}
      <section className="space-y-4">
        <h3 className="font-medium text-gray-900">
          Informations générales
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="numero_immatriculation"
              className="block text-sm font-medium text-gray-700"
            >
              Immatriculation *
            </label>

            <input
              id="numero_immatriculation"
              type="text"
              {...register("numero_immatriculation")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            {errors.numero_immatriculation && (
              <p className="mt-1 text-sm text-red-600">
                {errors.numero_immatriculation.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="nom_commercial"
              className="block text-sm font-medium text-gray-700"
            >
              Nom commercial
            </label>

            <input
              id="nom_commercial"
              type="text"
              {...register("nom_commercial")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            {errors.nom_commercial && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nom_commercial.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="modele"
              className="block text-sm font-medium text-gray-700"
            >
              Modèle
            </label>

            <input
              id="modele"
              type="text"
              {...register("modele")}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            {errors.modele && (
              <p className="mt-1 text-sm text-red-600">
                {errors.modele.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type *
            </label>

            <select
              id="type"
              {...register("type")}
              className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option value="CLASSIQUE">Classique</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
        </div>
      </section>

      {/* Capacité */}
      <section className="space-y-4">
        <h3 className="font-medium text-gray-900">
          Configuration des sièges
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="capacite"
              className="block text-sm font-medium text-gray-700"
            >
              Capacité *
            </label>

            <input
              id="capacite"
              type="number"
              min="1"
              {...register("capacite", { valueAsNumber: true })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            {errors.capacite && (
              <p className="mt-1 text-sm text-red-600">
                {errors.capacite.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="nombre_sieges_par_rangee"
              className="block text-sm font-medium text-gray-700"
            >
              Sièges par rangée *
            </label>

            <input
              id="nombre_sieges_par_rangee"
              type="number"
              min="1"
              {...register("nombre_sieges_par_rangee", {
                valueAsNumber: true,
              })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />

            {errors.nombre_sieges_par_rangee && (
              <p className="mt-1 text-sm text-red-600">
                {errors.nombre_sieges_par_rangee.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Équipements */}
      <section className="space-y-4">
        <h3 className="font-medium text-gray-900">
          Équipements
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
            <input
              type="checkbox"
              {...register("climatisation")}
              className="h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-gray-700">
              Climatisation
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
            <input
              type="checkbox"
              {...register("wifi")}
              className="h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-gray-700">Wi-Fi</span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
            <input
              type="checkbox"
              {...register("prise_usb")}
              className="h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-gray-700">
              Prise USB
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
            <input
              type="checkbox"
              {...register("inclinaison_sieges")}
              className="h-4 w-4 accent-sky-600"
            />
            <span className="text-sm text-gray-700">
              Sièges inclinables
            </span>
          </label>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Enregistrement..."
            : isEditing
              ? "Enregistrer les modifications"
              : "Ajouter le bus"}
        </button>
      </div>
    </form>
  );
}