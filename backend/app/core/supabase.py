import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()


def get_supabase_client() -> Client:
    """
    Crée et retourne le client Supabase utilisé par le backend YATIGO.
    """

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SECRET_KEY")

    if not supabase_url:
        raise RuntimeError(
            "La variable d'environnement SUPABASE_URL est manquante."
        )

    if not supabase_key:
        raise RuntimeError(
            "La variable d'environnement SUPABASE_SECRET_KEY est manquante."
        )

    return create_client(
        supabase_url,
        supabase_key,
    )