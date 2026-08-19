from uuid import UUID

from fastapi import APIRouter, Depends, status

from app.repositories.bus_repository import BusRepository
from app.schemas.bus import BusCreate, BusResponse, BusUpdate
from app.services.bus_service import BusService

router = APIRouter(
    prefix="/bus",
    tags=["Bus"],
)


def get_bus_service() -> BusService:
    """
    Fournit le service Bus aux routes FastAPI.

    Cette fonction sera remplacée/complétée lorsque nous
    brancherons le système d'authentification et récupérerons
    l'agence depuis l'utilisateur connecté.
    """

    return BusService(
        repository=BusRepository(),
    )


@router.get(
    "/{bus_id}",
    response_model=BusResponse,
)
def get_bus(
    bus_id: UUID,
    service: BusService = Depends(get_bus_service),
) -> dict:
    """
    Récupère les informations d'un bus.
    """

    return service.get_bus(bus_id)


@router.post(
    "",
    response_model=BusResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_bus(
    data: BusCreate,
    service: BusService = Depends(get_bus_service),
) -> dict:
    """
    Crée un nouveau bus.

    L'agence sera déterminée par l'utilisateur authentifié
    lorsque l'authentification agence sera branchée.
    """

    raise NotImplementedError(
        "L'authentification agence doit être branchée "
        "avant d'autoriser la création d'un bus."
    )


@router.patch(
    "/{bus_id}",
    response_model=BusResponse,
)
def update_bus(
    bus_id: UUID,
    data: BusUpdate,
    service: BusService = Depends(get_bus_service),
) -> dict:
    """
    Modifie un bus.

    L'agence sera déterminée par l'utilisateur authentifié
    lorsque l'authentification agence sera branchée.
    """

    raise NotImplementedError(
        "L'authentification agence doit être branchée "
        "avant d'autoriser la modification d'un bus."
    )