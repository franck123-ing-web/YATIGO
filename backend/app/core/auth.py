from uuid import UUID

from fastapi import Header, HTTPException, status

from app.core.supabase import get_supabase_client


def get_current_user_id(
    authorization: str | None = Header(default=None),
) -> UUID:
    """
    Vérifie le JWT Supabase et retourne l'identifiant
    de l'utilisateur authentifié.

    Le token est fourni par le client via l'en-tête :
    Authorization: Bearer <token>

    La vérification cryptographique est effectuée par
    le SDK Supabase à partir des signing keys du projet.
    """

    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentification requise.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Format du token d'authentification invalide.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization.removeprefix("Bearer ").strip()

    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token d'authentification manquant.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        supabase = get_supabase_client()

        claims_response = supabase.auth.get_claims(
            token,
        )

    except Exception as exc:
        # On ne retourne jamais le détail interne de l'erreur
        # d'authentification au client.
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token d'authentification invalide.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    if claims_response is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token d'authentification invalide.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    claims = claims_response.claims

    user_id = claims.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identité utilisateur absente du token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        return UUID(user_id)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identité utilisateur invalide.",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc