import os

from supabase import Client, create_client


def get_supabase_client() -> Client:
    """
    Crée et retourne le client Supabase utilisé par le backend YATIGO.

    Les informations de connexion sont récupérées depuis
    les variables d'environnement afin de ne jamais écrire
    de credentials directement dans le code source.
    """

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url:
        raise RuntimeError(
            "La variable d'environnement SUPABASE_URL est manquante."
        )

    if not supabase_key:
        raise RuntimeError(
            "La variable d'environnement "
            "SUPABASE_SERVICE_ROLE_KEY est manquante."
        )

    return create_client(
        supabase_url,
        supabase_key,
    )