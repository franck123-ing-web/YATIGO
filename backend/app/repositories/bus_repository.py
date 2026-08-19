from uuid import UUID

from app.core.supabase import get_supabase_client


class BusRepository:
    """
    Couche d'accès aux données de la table bus.

    Le repository ne contient pas de règles métier.
    Il se limite aux opérations de lecture et d'écriture
    auprès de Supabase.
    """

    TABLE_NAME = "bus"

    def __init__(self) -> None:
        self.client = get_supabase_client()

    def get_by_id(
        self,
        bus_id: UUID,
    ) -> dict | None:
        """
        Récupère un bus à partir de son identifiant.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .select("*")
            .eq("id", str(bus_id))
            .limit(1)
            .execute()
        )

        if not response.data:
            return None

        return response.data[0]

    def list_by_agence(
        self,
        agence_id: UUID,
    ) -> list[dict]:
        """
        Récupère les bus appartenant à une agence.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .select("*")
            .eq("agence_id", str(agence_id))
            .order("date_creation", desc=True)
            .execute()
        )

        return response.data or []

    def create(
        self,
        data: dict,
    ) -> dict:
        """
        Crée un nouveau bus.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .insert(data)
            .execute()
        )

        if not response.data:
            raise RuntimeError(
                "La création du bus n'a retourné aucune donnée."
            )

        return response.data[0]

    def update(
        self,
        bus_id: UUID,
        data: dict,
    ) -> dict | None:
        """
        Met à jour les informations d'un bus.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .update(data)
            .eq("id", str(bus_id))
            .execute()
        )

        if not response.data:
            return None

        return response.data[0]

    def delete(
        self,
        bus_id: UUID,
    ) -> bool:
        """
        Supprime un bus.

        La base de données reste responsable des contraintes
        de suppression, notamment celles liées aux sièges
        et aux trajets.
        """

        response = (
            self.client
            .table(self.TABLE_NAME)
            .delete()
            .eq("id", str(bus_id))
            .execute()
        )

        return bool(response.data)