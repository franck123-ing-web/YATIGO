import { z } from "zod";

import type { TrajetStatus } from "@/types/trajet";

/**
 * Statuts autorisés pour un trajet.
 *
 * Ces valeurs correspondent à l'ENUM `statut_trajet`
 * de la base de données.
 */
const trajetStatuses = [
  "PROGRAMME",
  "EN_COURS",
  "RETARDE",
  "INTERROMPU",
  "TERMINE",
  "ANNULE",
] as const satisfies readonly TrajetStatus[];

/**
 * Schéma de validation du formulaire de trajet.
 */
export const trajetSchema = z
  .object({
    villeDepartId: z.string().uuid({
      message: "Veuillez sélectionner une ville de départ valide.",
    }),

    villeArriveeId: z.string().uuid({
      message: "Veuillez sélectionner une ville d'arrivée valide.",
    }),

    busId: z.string().uuid({
      message: "Veuillez sélectionner un bus valide.",
    }),

    chauffeurId: z.string().uuid({
      message: "Veuillez sélectionner un chauffeur valide.",
    }),

    dateDepart: z
      .string()
      .min(1, "La date de départ est obligatoire."),

    heureDepart: z
      .string()
      .min(1, "L'heure de départ est obligatoire."),

    heureArriveeEstimee: z
      .string()
      .optional()
      .nullable(),

    prix: z
      .number({
        message: "Le prix est obligatoire.",
      })
      .positive("Le prix doit être supérieur à 0."),

    statut: z.enum(trajetStatuses).default("PROGRAMME"),

    reservationsOuvertes: z.boolean().default(true),
  })
  .refine(
    (data) => data.villeDepartId !== data.villeArriveeId,
    {
      message:
        "La ville de départ et la ville d'arrivée doivent être différentes.",
      path: ["villeArriveeId"],
    }
  );

/**
 * Type inféré automatiquement à partir du schéma Zod.
 *
 * Cela évite de maintenir manuellement une seconde
 * définition des données du formulaire.
 */
export type TrajetFormValues = z.infer<typeof trajetSchema>;