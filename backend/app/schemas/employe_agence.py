from enum import Enum
from uuid import UUID

from pydantic import BaseModel


class RoleEmploye(str, Enum):
    """Rôles disponibles pour les employés d'une agence."""

    AGENT = "AGENT"
    ADMINISTRATEUR = "ADMINISTRATEUR"


class StatutEmploye(str, Enum):
    """Statuts possibles d'un employé."""

    ACTIF = "ACTIF"
    SUSPENDU = "SUSPENDU"
    EN_CONGE = "EN_CONGE"


class EmployeAgenceContext(BaseModel):
    """
    Contexte de sécurité associé à l'utilisateur authentifié.

    Ce contexte est construit exclusivement à partir des
    données du backend et de la base de données.
    """

    utilisateur_id: UUID
    agence_id: UUID
    poste: RoleEmploye
    statut: StatutEmploye