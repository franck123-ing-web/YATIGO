import { z } from "zod";

/**
 * Schéma de validation utilisé lors de la création
 * et de la modification d'un bus.
 */
export const busFormSchema = z.object({
  numero_immatriculation: z
    .string()
    .trim()
    .min(1, "L'immatriculation est obligatoire.")
    .max(50, "L'immatriculation ne doit pas dépasser 50 caractères."),

  nom_commercial: z
    .string()
    .trim()
    .max(100, "Le nom commercial ne doit pas dépasser 100 caractères."),

  modele: z
    .string()
    .trim()
    .max(100, "Le modèle ne doit pas dépasser 100 caractères."),

  capacite: z
    .number({
      error: "La capacité est obligatoire.",
    })
    .int("La capacité doit être un nombre entier.")
    .positive("La capacité doit être supérieure à 0."),

  type: z.enum(["VIP", "CLASSIQUE"]),

  climatisation: z.boolean(),
  wifi: z.boolean(),
  prise_usb: z.boolean(),
  inclinaison_sieges: z.boolean(),

  nombre_sieges_par_rangee: z
    .number({
      error: "Le nombre de sièges par rangée est obligatoire.",
    })
    .int("Le nombre de sièges par rangée doit être un nombre entier.")
    .positive("Le nombre de sièges par rangée doit être supérieur à 0."),
});

export type BusFormValues = z.infer<typeof busFormSchema>;