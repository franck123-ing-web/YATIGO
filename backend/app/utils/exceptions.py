class ApiError(Exception):
    """
    Exception de base destinée aux erreurs contrôlées
    de l'API YATIGO.
    """

    def __init__(
        self,
        message: str,
    ) -> None:
        self.message = message
        super().__init__(message)


class NotFoundError(ApiError):
    """Ressource demandée introuvable."""


class ConflictError(ApiError):
    """Conflit avec l'état actuel des données."""


class ForbiddenError(ApiError):
    """Utilisateur authentifié mais non autorisé."""