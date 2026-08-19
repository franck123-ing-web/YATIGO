from uuid import UUID

from app.repositories.bus_repository import BusRepository
from app.schemas.bus import BusCreate, BusUpdate


class BusNotFoundError(Exception):
    """Exception levée lorsqu'un bus demandé n'existe pas."""


class BusAlreadyExistsError(Exception):
    """Exception levée lorsqu'un bus existe déjà."""


class BusService:
    """
    Contient les règles métier relatives aux bus.

    Le service ne manipule pas directement Supabase.
    Toutes les opérations de persistance passent par le repository.
    """

    def __init__(
        self,
        repository: BusRepository,
    ) -> None:
        self.repository = repository

    def get_bus(
        self,
        bus_id: UUID,
    ) -> dict:
        """
        Récupère un bus ou lève une erreur métier s'il n'existe pas.
        """

        bus = self.repository.get_by_id(bus_id)

        if bus is None:
            raise BusNotFoundError(
                "Le bus demandé est introuvable."
            )

        return bus

    def list_buses(
        self,
        agence_id: UUID,
    ) -> list[dict]:
        """
        Retourne uniquement les bus appartenant à l'agence.
        """

        return self.repository.list_by_agence(agence_id)

    def create_bus(
        self,
        agence_id: UUID,
        data: BusCreate,
    ) -> dict:
        """
        Crée un bus pour une agence.

        L'identifiant de l'agence provient du contexte
        d'authentification et non des données envoyées
        par le client.
        """

        existing_buses = self.repository.list_by_agence(
            agence_id,
        )

        numero = data.numero_immatriculation.strip()

        for bus in existing_buses:
            if (
                bus["numero_immatriculation"].strip().lower()
                == numero.lower()
            ):
                raise BusAlreadyExistsError(
                    "Cette immatriculation est déjà utilisée "
                    "par cette agence."
                )

        bus_data = data.model_dump()

        bus_data["agence_id"] = str(agence_id)
        bus_data["numero_immatriculation"] = numero

        return self.repository.create(bus_data)

    def update_bus(
        self,
        agence_id: UUID,
        bus_id: UUID,
        data: BusUpdate,
    ) -> dict:
        """
        Modifie un bus appartenant à l'agence.
        """

        bus = self.repository.get_by_id(bus_id)

        if bus is None:
            raise BusNotFoundError(
                "Le bus demandé est introuvable."
            )

        if bus["agence_id"] != str(agence_id):
            raise BusNotFoundError(
                "Le bus demandé est introuvable."
            )

        update_data = data.model_dump(
            exclude_unset=True,
        )

        if "numero_immatriculation" in update_data:
            numero = (
                update_data["numero_immatriculation"]
                .strip()
            )

            existing_buses = self.repository.list_by_agence(
                agence_id,
            )

            for existing_bus in existing_buses:
                if existing_bus["id"] == str(bus_id):
                    continue

                if (
                    existing_bus[
                        "numero_immatriculation"
                    ].strip().lower()
                    == numero.lower()
                ):
                    raise BusAlreadyExistsError(
                        "Cette immatriculation est déjà utilisée "
                        "par cette agence."
                    )

            update_data["numero_immatriculation"] = numero

        if not update_data:
            return bus

        updated_bus = self.repository.update(
            bus_id,
            update_data,
        )

        if updated_bus is None:
            raise BusNotFoundError(
                "Le bus demandé est introuvable."
            )

        return updated_bus