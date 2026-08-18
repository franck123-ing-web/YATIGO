/**
 * États possibles d'un bus dans YATIGO.
 * Ces valeurs correspondent à l'ENUM PostgreSQL et doivent rester synchronisées
 * avec la base de données.
 */
export type EtatBus = "DISPONIBLE" | "MAINTENANCE" | "HORS_SERVICE";

/**
 * Types de bus proposés par YATIGO.
 */
export type TypeBus = "VIP" | "CLASSIQUE";

/**
 * Représente un bus tel qu'il est retourné par le Backend.
 */
export interface Bus {
  id: string;
  agence_id: string;
  numero_immatriculation: string;
  nom_commercial: string | null;
  modele: string | null;
  capacite: number;
  etat: EtatBus;
  type: TypeBus;
  climatisation: boolean;
  wifi: boolean;
  prise_usb: boolean;
  inclinaison_sieges: boolean;
  nombre_sieges_par_rangee: number;
  date_creation: string;
}

/**
 * Données nécessaires pour créer ou modifier un bus.
 *
 * L'agence_id et l'id ne sont volontairement pas présents ici :
 * ils ne doivent pas être contrôlés directement par le formulaire.
 */
export interface BusFormData {
  numero_immatriculation: string;
  nom_commercial: string;
  modele: string;
  capacite: number;
  etat: EtatBus;
  type: TypeBus;
  climatisation: boolean;
  wifi: boolean;
  prise_usb: boolean;
  inclinaison_sieges: boolean;
  nombre_sieges_par_rangee: number;
}