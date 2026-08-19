from uuid import UUID

from app.core.supabase import get_supabase_client


class EmployeAgenceRepository:
    """Accès aux données des employés d'agence."""

    TABLE_NAME = "employes_agence"

    def __init__(self) -> None:
        self.client = get_supabase_client()

    def get_by_utilisateur_id(
        self,
        utilisateur_id: UUID,
    ) -> dict | None:
        """
        Recherche le profil employé correspondant à l'utilisateur.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .select(
                "id, agence_id, poste, statut, date_creation"
            )
            .eq("id", str(utilisateur_id))
            .maybe_single()
            .execute()
        )

        return response.data