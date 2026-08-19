from uuid import UUID

from app.repositories.employe_agence_repository import (
    EmployeAgenceRepository,
)
from app.schemas.employe_agence import (
    EmployeAgenceContext,
    RoleEmploye,
    StatutEmploye,
)


class EmployeAgenceNotFoundError(Exception):
    """Profil employé introuvable."""


class EmployeAgenceInactiveError(Exception):
    """Employé non autorisé car son compte n'est pas actif."""


class EmployeAgenceService:
    """
    Contient les règles liées au contexte professionnel
    d'un utilisateur d'agence.
    """

    def __init__(
        self,
        repository: EmployeAgenceRepository,
    ) -> None:
        self.repository = repository

    def get_context(
        self,
        utilisateur_id: UUID,
    ) -> EmployeAgenceContext:
        """
        Construit le contexte agence de l'utilisateur.
        """

        employe = self.repository.get_by_utilisateur_id(
            utilisateur_id,
        )

        if employe is None:
            raise EmployeAgenceNotFoundError(
                "Aucun profil employé associé à cet utilisateur."
            )

        statut = StatutEmploye(employe["statut"])

        if statut != StatutEmploye.ACTIF:
            raise EmployeAgenceInactiveError(
                "Le compte employé n'est pas actif."
            )

        return EmployeAgenceContext(
            utilisateur_id=utilisateur_id,
            agence_id=UUID(employe["agence_id"]),
            poste=RoleEmploye(employe["poste"]),
            statut=statut,
        )