"""Budget Pydantic schemas."""
from __future__ import annotations

from datetime import datetime, date
from typing import Optional

from pydantic import BaseModel


class BudgetCreate(BaseModel):
    category_id: Optional[int] = None
    limit_amount: float
    period: Optional[str] = "monthly"
    start_date: Optional[date] = None


class BudgetUpdate(BaseModel):
    category_id: Optional[int] = None
    limit_amount: Optional[float] = None
    period: Optional[str] = None
    start_date: Optional[date] = None


class BudgetResponse(BaseModel):
    id: int
    user_id: int
    category_id: Optional[int] = None
    limit_amount: float
    period: str
    start_date: date
    created_at: datetime
    current_spend: Optional[float] = 0.0
    category_name: Optional[str] = None

    class Config:
        from_attributes = True
