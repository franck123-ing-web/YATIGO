from uuid import UUID

from app.repositories.employe_agence_repository import (
    EmployeAgenceRepository,
)
from app.schemas.employe_agence import (
    EmployeAgenceContext,
    RoleEmploye,
    StatutEmploye,
)
from app.utils.exceptions import ForbiddenError, NotFoundError


class EmployeAgenceService:
    """
    Contient les règles métier relatives au contexte
    professionnel d'un utilisateur.
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
        Récupère le profil employé de l'utilisateur et
        vérifie qu'il est actuellement autorisé à utiliser
        les fonctionnalités de l'agence.
        """

        employe = self.repository.get_by_utilisateur_id(
            utilisateur_id,
        )

        if employe is None:
            raise NotFoundError(
                "Aucun profil employé associé à cet utilisateur."
            )

        statut = StatutEmploye(employe["statut"])

        if statut != StatutEmploye.ACTIF:
            raise ForbiddenError(
                "Le compte employé n'est pas actif."
            )

        return EmployeAgenceContext(
            utilisateur_id=utilisateur_id,
            agence_id=UUID(employe["agence_id"]),
            poste=RoleEmploye(employe["poste"]),
            statut=statut,
        )

    def require_administrateur(
        self,
        contexte: EmployeAgenceContext,
    ) -> EmployeAgenceContext:
        """
        Vérifie que l'employé possède le rôle administrateur.
        """

        if contexto := contexto:
            if contexto.poste != RoleEmploye.ADMINISTRATEUR:
                raise ForbiddenError(
                    "Cette opération nécessite les droits "
                    "d'administrateur."
                )

        return contexto