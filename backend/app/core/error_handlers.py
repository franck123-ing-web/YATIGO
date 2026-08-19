from fastapi import Request
from fastapi.responses import JSONResponse

from app.utils.exceptions import (
    ConflictError,
    ForbiddenError,
    NotFoundError,
)


async def not_found_error_handler(
    request: Request,
    exc: NotFoundError,
) -> JSONResponse:
    """Transforme une erreur métier 404 en réponse HTTP."""

    return JSONResponse(
        status_code=404,
        content={
            "detail": exc.message,
        },
    )


async def conflict_error_handler(
    request: Request,
    exc: ConflictError,
) -> JSONResponse:
    """Transforme une erreur métier 409 en réponse HTTP."""

    return JSONResponse(
        status_code=409,
        content={
            "detail": exc.message,
        },
    )


async def forbidden_error_handler(
    request: Request,
    exc: ForbiddenError,
) -> JSONResponse:
    """Transforme une erreur métier 403 en réponse HTTP."""

    return JSONResponse(
        status_code=403,
        content={
            "detail": exc.message,
        },
    )