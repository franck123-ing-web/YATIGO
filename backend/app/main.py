from fastapi import FastAPI
from app.api.routes.bus import router as bus_router
from app.core.error_handlers import (
    conflict_error_handler,
    forbidden_error_handler,
    not_found_error_handler,
)
from app.utils.exceptions import (
    ConflictError,
    ForbiddenError,
    NotFoundError,
)

app = FastAPI(
    title="YATIGO API",
    version="1.0.0",
)

app.add_exception_handler(
    NotFoundError,
    not_found_error_handler,
)

app.add_exception_handler(
    ConflictError,
    conflict_error_handler,
)

app.add_exception_handler(
    ForbiddenError,
    forbidden_error_handler,
)

app.include_router(
    bus_router,
    prefix="/api/v1",
)