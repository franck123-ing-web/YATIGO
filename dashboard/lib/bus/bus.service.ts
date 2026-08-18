import type { Bus } from "./bus.types";
import { apiRequest } from "@/lib/api/client";

/**
 * Service centralisant les opérations liées aux bus.
 *
 * Les appels HTTP vers FastAPI seront ajoutés ici.
 * Les composants React ne doivent pas appeler directement
 * l'API afin de garder une séparation claire des responsabilités.
 */

export async function getBusById(
  id: string,
): Promise<Bus> {
  /*
   * TODO:
   * Remplacer cette donnée temporaire par un appel
   * vers le backend FastAPI.
   *
   * Cette partie permet actuellement de développer
   * l'interface sans dépendre du backend.
   */

  return {
    id,
    agence_id: "agence-demo",

    numero_immatriculation: "LT-123-AA",
    nom_commercial: "Express VIP",
    modele: "Mercedes Sprinter",

    capacite: 30,

    etat: "DISPONIBLE",
    type: "VIP",

    climatisation: true,
    wifi: true,
    prise_usb: true,
    inclinaison_sieges: false,

    nombre_sieges_par_rangee: 4,

    date_creation: new Date().toISOString(),
  };
}