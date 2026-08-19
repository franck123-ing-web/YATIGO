from uuid import UUID

from fastapi import Header, HTTPException, status


def get_current_user_id(
    authorization: str | None = Header(default=None),
) -> UUID:
    """
    Récupère l'identifiant de l'utilisateur depuis
    l'en-tête Authorization.

    La validation cryptographique réelle du token sera
    branchée avec Supabase Auth dans l'étape suivante.

    Cette fonction ne doit jamais accepter un identifiant
    utilisateur envoyé directement dans le corps d'une requête.
    """

    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentification requise.",
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Format du token d'authentification invalide.",
        )

    token = authorization.removeprefix("Bearer ").strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token d'authentification manquant.",
        )

    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail=(
            "La validation du token Supabase Auth "
            "n'est pas encore configurée."
        ),
    )