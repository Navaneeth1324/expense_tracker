"""FastAPI application entry point with CORS, routers, and startup events."""
from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, SessionLocal
from app.routers import auth, expenses, categories, budgets, analytics
from app.utils.seed_data import seed_default_categories

# Import models so they are registered with Base.metadata
import app.models  # noqa: F401

app = FastAPI(
    title="Smart Expense Tracker API",
    description="Backend API for the Smart Expense Tracker application",
    version="1.0.0",
)

# CORS — allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(categories.router)
app.include_router(budgets.router)
app.include_router(analytics.router)


@app.on_event("startup")
def on_startup():
    """Create database tables and seed default data on application startup."""
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_default_categories(db)
    finally:
        db.close()


@app.get("/")
def root():
    """Health check endpoint."""
    return {"message": "Smart Expense Tracker API", "version": "1.0.0", "status": "running"}
