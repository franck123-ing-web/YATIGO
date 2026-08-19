from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class EtatBus(str, Enum):
    """
    États possibles d'un bus dans YATIGO.
    """

    DISPONIBLE = "DISPONIBLE"
    MAINTENANCE = "MAINTENANCE"
    HORS_SERVICE = "HORS_SERVICE"


class TypeBus(str, Enum):
    """
    Types de bus disponibles dans YATIGO.
    """

    VIP = "VIP"
    CLASSIQUE = "CLASSIQUE"


class BusBase(BaseModel):
    """
    Données communes utilisées lors de la création
    et de la modification d'un bus.
    """

    numero_immatriculation: str = Field(
        min_length=1,
        max_length=50,
    )

    nom_commercial: str | None = Field(
        default=None,
        max_length=100,
    )

    modele: str | None = Field(
        default=None,
        max_length=100,
    )

    capacite: int = Field(
        gt=0,
    )

    etat: EtatBus = EtatBus.DISPONIBLE

    type: TypeBus = TypeBus.CLASSIQUE

    climatisation: bool = False

    wifi: bool = False

    prise_usb: bool = False

    inclinaison_sieges: bool = False

    nombre_sieges_par_rangee: int = Field(
        gt=0,
    )


class BusCreate(BusBase):
    """
    Données nécessaires à la création d'un bus.

    L'agence est déterminée par le contexte d'authentification
    de l'utilisateur et ne doit pas être fournie librement
    par le client.
    """


class BusUpdate(BaseModel):
    """
    Données pouvant être modifiées sur un bus.

    Tous les champs sont optionnels afin de permettre une
    modification partielle.
    """

    numero_immatriculation: str | None = Field(
        default=None,
        min_length=1,
        max_length=50,
    )

    nom_commercial: str | None = Field(
        default=None,
        max_length=100,
    )

    modele: str | None = Field(
        default=None,
        max_length=100,
    )

    capacite: int | None = Field(
        default=None,
        gt=0,
    )

    etat: EtatBus | None = None

    type: TypeBus | None = None

    climatisation: bool | None = None

    wifi: bool | None = None

    prise_usb: bool | None = None

    inclinaison_sieges: bool | None = None

    nombre_sieges_par_rangee: int | None = Field(
        default=None,
        gt=0,
    )


class BusResponse(BusBase):
    """
    Représentation d'un bus retournée par l'API.
    """

    model_config = ConfigDict(
        from_attributes=True,
    )

    id: UUID
    agence_id: UUID
    date_creation: str