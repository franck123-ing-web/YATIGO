from uuid import UUID

from app.core.supabase import get_supabase_client


class EmployeAgenceRepository:
    """
    Couche d'accès aux données des employés d'agence.

    Cette classe ne contient aucune règle d'autorisation.
    Elle récupère uniquement les données nécessaires.
    """

    TABLE_NAME = "employes_agence"

    def __init__(self) -> None:
        self.client = get_supabase_client()

    def get_by_utilisateur_id(
        self,
        utilisateur_id: UUID,
    ) -> dict | None:
        """
        Récupère le profil employé associé à un utilisateur.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .select("*")
            .eq("id", str(utilisateur_id))
            .limit(1)
            .execute()
        )

        if not response.data:
            return None

        return response.data[0]