/**
 * Statuts possibles d'un trajet.
 *
 * Ces valeurs correspondent à l'ENUM `statut_trajet`
 * défini dans la base de données.
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
 *
 * Les noms des propriétés utilisent volontairement la convention
 * snake_case afin de rester cohérents avec les données provenant
 * de la base de données et de la future API.
 */
export interface Trajet {
  id: string;

  agence_id: string;

  ville_depart_id: string;
  ville_arrivee_id: string;

  bus_id: string;
  chauffeur_id: string;

  date_depart: string;
  heure_depart: string;
  heure_arrivee_estimee: string | null;

  prix: number;

  statut: TrajetStatus;

  reservations_ouvertes: boolean;

  date_creation: string;
  date_modification: string;
}

/**
 * Représente les informations d'un trajet prêtes
 * à être affichées dans l'interface Dashboard.
 *
 * Ce type pourra être alimenté par une réponse enrichie
 * provenant du backend.
 */
export interface TrajetListItem {
  id: string;

  ville_depart: string;
  ville_arrivee: string;

  bus_immatriculation: string;
  chauffeur_nom: string;

  date_depart: string;
  heure_depart: string;
  heure_arrivee_estimee: string | null;

  prix: number;

  statut: TrajetStatus;

  reservations_ouvertes: boolean;
}