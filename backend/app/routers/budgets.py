"""Budgets router: CRUD operations with current spend calculation."""
from __future__ import annotations

from datetime import date, timedelta
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.budget import Budget
from app.models.category import Category
from app.models.expense import Expense
from app.models.user import User
from app.schemas.budget import BudgetCreate, BudgetUpdate, BudgetResponse
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/budgets", tags=["budgets"])


def _calculate_current_spend(
    db: Session, user_id: int, category_id: Optional[int], period: str, start_date: date
) -> float:
    """Calculate the current spend for a budget period."""
    today = date.today()

    if period == "monthly":
        period_start = today.replace(day=1)
    elif period == "weekly":
        period_start = today - timedelta(days=today.weekday())
    else:
        period_start = start_date

    query = db.query(func.coalesce(func.sum(Expense.amount), 0.0)).filter(
        Expense.user_id == user_id,
        Expense.expense_date >= period_start,
        Expense.expense_date <= today,
    )

    if category_id is not None:
        query = query.filter(Expense.category_id == category_id)

    result = query.scalar()
    return float(result)


def _budget_to_response(db: Session, budget: Budget) -> BudgetResponse:
    """Convert a Budget ORM object to a response schema with current spend."""
    current_spend = _calculate_current_spend(
        db, budget.user_id, budget.category_id, budget.period, budget.start_date
    )

    category_name = None
    if budget.category_id is not None and budget.category:
        category_name = budget.category.name

    return BudgetResponse(
        id=budget.id,
        user_id=budget.user_id,
        category_id=budget.category_id,
        limit_amount=budget.limit_amount,
        period=budget.period,
        start_date=budget.start_date,
        created_at=budget.created_at,
        current_spend=current_spend,
        category_name=category_name,
    )


@router.get("/", response_model=List[BudgetResponse])
def list_budgets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """List all budgets for the current user with calculated current spend."""
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()
    return [_budget_to_response(db, b) for b in budgets]


@router.post("/", response_model=BudgetResponse, status_code=status.HTTP_201_CREATED)
def create_budget(
    budget_data: BudgetCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Create a new budget."""
    # Verify category if specified
    if budget_data.category_id is not None:
        category = db.query(Category).filter(Category.id == budget_data.category_id).first()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    budget = Budget(
        user_id=current_user.id,
        category_id=budget_data.category_id,
        limit_amount=budget_data.limit_amount,
        period=budget_data.period or "monthly",
        start_date=budget_data.start_date if budget_data.start_date else date.today(),
    )
    db.add(budget)
    db.commit()
    db.refresh(budget)
    return _budget_to_response(db, budget)


@router.put("/{budget_id}", response_model=BudgetResponse)
def update_budget(
    budget_id: int,
    budget_data: BudgetUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Update an existing budget."""
    budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id,
    ).first()
    if not budget:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")

    update_data = budget_data.dict(exclude_unset=True)

    if "category_id" in update_data and update_data["category_id"] is not None:
        category = db.query(Category).filter(Category.id == update_data["category_id"]).first()
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")

    for field, value in update_data.items():
        setattr(budget, field, value)

    db.commit()
    db.refresh(budget)
    return _budget_to_response(db, budget)


@router.delete("/{budget_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_budget(
    budget_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Delete a budget."""
    budget = db.query(Budget).filter(
        Budget.id == budget_id,
        Budget.user_id == current_user.id,
    ).first()
    if not budget:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget not found")

    db.delete(budget)
    db.commit()
