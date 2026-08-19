from fastapi import Depends
from fastapi import HTTPException, status

from app.schemas.employe_agence import RoleEmploye
from app.core.auth import get_current_user_id
from app.repositories.employe_agence_repository import (
    EmployeAgenceRepository,
)
from app.schemas.employe_agence import EmployeAgenceContext
from app.services.employe_agence_service import (
    EmployeAgenceService,
)


def get_employe_agence_context(
    utilisateur_id=Depends(get_current_user_id),
) -> EmployeAgenceContext:
    """
    Construit le contexte agence à partir de l'utilisateur
    authentifié.

    L'agence n'est jamais fournie directement par le client.
    """

    service = EmployeAgenceService(
        repository=EmployeAgenceRepository(),
    )

    return service.get_context(utilisateur_id)

def require_administrateur(
    contexte: EmployeAgenceContext = Depends(
        get_employe_agence_context
    ),
) -> EmployeAgenceContext:
    """
    Vérifie que l'employé possède les droits
    d'administration nécessaires.
    """

    if contexte.poste != RoleEmploye.ADMINISTRATEUR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=(
                "Cette opération nécessite les droits "
                "d'administrateur."
            ),
        )

    return contexte