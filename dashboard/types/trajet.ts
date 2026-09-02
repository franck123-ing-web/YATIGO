/**
 * Statuts possibles d'un trajet.
 *
 * Ces valeurs doivent correspondre exactement à l'ENUM
 * `statut_trajet` défini dans la base de données.
 */
export type TrajetStatus =
  | "PROGRAMME"
  | "EN_COURS"
  | "RETARDE"
  | "INTERROMPU"
  | "TERMINE"
  | "ANNULE";

/**
 * Représente un trajet dans le Dashboard YATIGO.
 */
export interface Trajet {
  id: string;

  agenceId: string;

  villeDepartId: string;
  villeArriveeId: string;

  busId: string;
  chauffeurId: string;

  dateDepart: string;
  heureDepart: string;
  heureArriveeEstimee: string | null;

  prix: number;

  statut: TrajetStatus;

  reservationsOuvertes: boolean;

  dateCreation: string;
  dateModification: string;
}

/**
 * Données nécessaires à la création d'un trajet.
 *
 * Les champs générés automatiquement par la base de données
 * ne sont pas présents ici.
 */
export interface CreateTrajetInput {
  villeDepartId: string;
  villeArriveeId: string;

  busId: string;
  chauffeurId: string;

  dateDepart: string;
  heureDepart: string;
  heureArriveeEstimee?: string | null;

  prix: number;

  statut?: TrajetStatus;

  reservationsOuvertes?: boolean;
}

/**
 * Données pouvant être modifiées pour un trajet existant.
 */
export interface UpdateTrajetInput {
  villeDepartId?: string;
  villeArriveeId?: string;

  busId?: string;
  chauffeurId?: string;

  dateDepart?: string;
  heureDepart?: string;
  heureArriveeEstimee?: string | null;

  prix?: number;

  statut?: TrajetStatus;

  reservationsOuvertes?: boolean;
}

/**
 * Option représentant une ville sélectionnable dans un formulaire.
 */
export interface VilleOption {
  id: string;
  nom: string;
}

/**
 * Option représentant un bus sélectionnable dans un formulaire.
 */
export interface BusOption {
  id: string;
  immatriculation: string;
}

/**
 * Option représentant un chauffeur sélectionnable dans un formulaire.
 */
export interface ChauffeurOption {
  id: string;
  nomComplet: string;
}