/**
 * Types utilisés par le module de gestion des bus.
 *
 * Ces types représentent le contrat attendu par l'interface.
 * Ils seront alignés avec les réponses du backend FastAPI
 * lorsque l'API sera intégrée.
 */

export type BusStatus =
  | "DISPONIBLE"
  | "MAINTENANCE"
  | "HORS_SERVICE";

export type BusType =
  | "VIP"
  | "CLASSIQUE";

export interface Bus {
  id: string;
  agence_id: string;

  numero_immatriculation: string;
  nom_commercial: string | null;
  modele: string | null;

  capacite: number;

  etat: BusStatus;
  type: BusType;

  climatisation: boolean;
  wifi: boolean;
  prise_usb: boolean;
  inclinaison_sieges: boolean;

  nombre_sieges_par_rangee: number;

  date_creation: string;
}