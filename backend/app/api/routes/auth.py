from fastapi import APIRouter, Depends

from app.core.auth import get_current_user_id


router = APIRouter(
    prefix="/auth",
    tags=["Authentification"],
)


@router.get("/me")
def get_current_user(
    user_id=Depends(get_current_user_id),
):
    """
    Route temporaire permettant de vérifier que
    l'utilisateur authentifié est correctement identifié.
    """

    return {
        "utilisateur_id": str(user_id),
    }