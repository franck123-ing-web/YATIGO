from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class RoleEmploye(str, Enum):
    """
    Rôles disponibles pour les employés d'une agence.
    """

    AGENT = "AGENT"
    ADMINISTRATEUR = "ADMINISTRATEUR"


class StatutEmploye(str, Enum):
    """
    Statuts possibles d'un employé d'agence.
    """

    ACTIF = "ACTIF"
    SUSPENDU = "SUSPENDU"
    EN_CONGE = "EN_CONGE"


class EmployeAgenceContext(BaseModel):
    """
    Informations minimales nécessaires au backend
    pour connaître le contexte professionnel de
    l'utilisateur actuellement authentifié.
    """

    utilisateur_id: UUID
    agence_id: UUID
    poste: RoleEmploye
    statut: StatutEmploye