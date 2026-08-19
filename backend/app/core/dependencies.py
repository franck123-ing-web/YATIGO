from uuid import UUID

from fastapi import Depends

from app.core.auth import get_current_user_id
from app.repositories.employe_agence_repository import (
    EmployeAgenceRepository,
)
from app.schemas.employe_agence import EmployeAgenceContext
from app.services.employe_agence_service import (
    EmployeAgenceService,
)


def get_employe_agence_service() -> EmployeAgenceService:
    """
    Construit le service employé avec son repository.
    """

    return EmployeAgenceService(
        repository=EmployeAgenceRepository(),
    )


def get_employe_agence_context(
    utilisateur_id: UUID = Depends(get_current_user_id),
    service: EmployeAgenceService = Depends(
        get_employe_agence_service,
    ),
) -> EmployeAgenceContext:
    """
    Construit le contexte agence de l'utilisateur authentifié.
    """

    return service.get_context(utilisateur_id)


def require_administrateur(
    contexte: EmployeAgenceContext = Depends(
        get_employe_agence_context,
    ),
    service: EmployeAgenceService = Depends(
        get_employe_agence_service,
    ),
) -> EmployeAgenceContext:
    """
    Autorise uniquement les employés administrateurs.
    """

    return service.require_administrateur(contexte)