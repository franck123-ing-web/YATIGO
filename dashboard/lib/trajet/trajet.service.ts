import type {
  Trajet,
  TrajetListItem,
} from "./trajet.types";

/**
 * Service centralisant les opérations liées aux trajets.
 *
 * Les appels HTTP vers FastAPI seront ajoutés ici.
 * Les composants React ne doivent pas appeler directement
 * l'API afin de garder une séparation claire des responsabilités.
 */

/**
 * Récupère la liste des trajets.
 *
 * Des données temporaires sont actuellement utilisées afin de
 * permettre le développement de l'interface sans dépendre
 * du backend.
 */
export async function getTrajets(): Promise<TrajetListItem[]> {
  return [
    {
      id: "trajet-001",

      ville_depart: "Abidjan",
      ville_arrivee: "Bouaké",

      bus_immatriculation: "LT-123-AA",
      chauffeur_nom: "Jean Kouassi",

      date_depart: "2026-09-15",
      heure_depart: "08:00",
      heure_arrivee_estimee: "14:30",

      prix: 15000,

      statut: "PROGRAMME",

      reservations_ouvertes: true,
    },

    {
      id: "trajet-002",

      ville_depart: "Abidjan",
      ville_arrivee: "Yamoussoukro",

      bus_immatriculation: "AB-456-CD",
      chauffeur_nom: "Koffi Yao",

      date_depart: "2026-09-12",
      heure_depart: "09:30",
      heure_arrivee_estimee: "12:30",

      prix: 10000,

      statut: "EN_COURS",

      reservations_ouvertes: true,
    },

    {
      id: "trajet-003",

      ville_depart: "Bouaké",
      ville_arrivee: "Korhogo",

      bus_immatriculation: "CI-789-EF",
      chauffeur_nom: "Mariam Traoré",

      date_depart: "2026-09-20",
      heure_depart: "07:00",
      heure_arrivee_estimee: "11:30",

      prix: 12000,

      statut: "PROGRAMME",

      reservations_ouvertes: true,
    },

    {
      id: "trajet-004",

      ville_depart: "Abidjan",
      ville_arrivee: "San-Pédro",

      bus_immatriculation: "SP-234-GH",
      chauffeur_nom: "Ibrahim Koné",

      date_depart: "2026-09-10",
      heure_depart: "06:30",
      heure_arrivee_estimee: "12:00",

      prix: 18000,

      statut: "RETARDE",

      reservations_ouvertes: true,
    },

    {
      id: "trajet-005",

      ville_depart: "Yamoussoukro",
      ville_arrivee: "Abidjan",

      bus_immatriculation: "YA-567-IJ",
      chauffeur_nom: "Aminata Diallo",

      date_depart: "2026-09-05",
      heure_depart: "08:00",
      heure_arrivee_estimee: "11:00",

      prix: 10000,

      statut: "TERMINE",

      reservations_ouvertes: false,
    },
  ];
}

/**
 * Récupère un trajet à partir de son identifiant.
 *
 * Une donnée temporaire est actuellement utilisée afin de permettre
 * le développement de l'interface sans dépendre du backend.
 */
export async function getTrajetById(
  id: string,
): Promise<Trajet> {
  return {
    id,

    agence_id: "agence-demo",

    ville_depart_id: "ville-depart-demo",
    ville_arrivee_id: "ville-arrivee-demo",

    bus_id: "bus-demo",
    chauffeur_id: "chauffeur-demo",

    date_depart: "2026-09-15",
    heure_depart: "08:00",
    heure_arrivee_estimee: "14:30",

    prix: 15000,

    statut: "PROGRAMME",

    reservations_ouvertes: true,

    date_creation: new Date().toISOString(),
    date_modification: new Date().toISOString(),
  };
}