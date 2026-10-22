"""Application configuration settings."""
from __future__ import annotations

import os


class Settings:
    """Application settings loaded from environment variables with defaults."""
    SECRET_KEY: str = os.getenv("SECRET_KEY", "expense-tracker-super-secret-key-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_DAYS: int = 7
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./expense_tracker.db")


settings = Settings()
