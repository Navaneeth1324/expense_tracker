"""Expense Pydantic schemas."""
from __future__ import annotations

from datetime import datetime, date
from typing import Optional

from pydantic import BaseModel


class ExpenseCreate(BaseModel):
    category_id: int
    amount: float
    description: Optional[str] = None
    expense_date: Optional[date] = None
    payment_method: Optional[str] = "cash"


class ExpenseUpdate(BaseModel):
    category_id: Optional[int] = None
    amount: Optional[float] = None
    description: Optional[str] = None
    expense_date: Optional[date] = None
    payment_method: Optional[str] = None


class ExpenseResponse(BaseModel):
    id: int
    user_id: int
    category_id: int
    amount: float
    description: Optional[str] = None
    expense_date: date
    payment_method: str
    created_at: datetime
    category_name: Optional[str] = None
    category_icon: Optional[str] = None

    class Config:
        from_attributes = True
