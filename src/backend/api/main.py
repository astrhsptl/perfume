from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import auth_router
from .routers import (
    cart_perfume_router,
    cart_router,
    # category_router,
    favourite_router,
    file_router,
    # perfume_category_router,
    perfume_router,
    perfume_volume_router,
    status_router,
    user_router,
    perfume_type_router,
    brand_router,
)

app = FastAPI(prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cart_perfume_router, prefix="/v1")
app.include_router(cart_router, prefix="/v1")
# app.include_router(category_router, prefix="/v1")
app.include_router(favourite_router, prefix="/v1")
app.include_router(file_router, prefix="/v1")
# app.include_router(perfume_category_router, prefix="/v1")
app.include_router(perfume_volume_router, prefix="/v1")
app.include_router(perfume_router, prefix="/v1")
app.include_router(user_router, prefix="/v1")
app.include_router(status_router, prefix="/v1")
app.include_router(brand_router, prefix="/v1")
app.include_router(perfume_type_router, prefix="/v1")

app.include_router(auth_router)
