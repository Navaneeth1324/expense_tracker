"""Analytics router: summary, category breakdown, trends, daily totals, CSV export."""
from __future__ import annotations

import csv
import io
from datetime import date, timedelta
from typing import List

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy import func, extract
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.expense import Expense
from app.models.category import Category
from app.models.user import User
from app.services.auth_service import get_current_user

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/summary")
def get_summary(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """
    Get spending summary:
    - total spent this month
    - total spent today
    - number of transactions this month
    - average daily spend this month
    """
    today = date.today()
    month_start = today.replace(day=1)

    # Total spent this month
    total_month = db.query(func.coalesce(func.sum(Expense.amount), 0.0)).filter(
        Expense.user_id == current_user.id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= today,
    ).scalar()

    # Total spent today
    total_today = db.query(func.coalesce(func.sum(Expense.amount), 0.0)).filter(
        Expense.user_id == current_user.id,
        Expense.expense_date == today,
    ).scalar()

    # Number of transactions this month
    tx_count = db.query(func.count(Expense.id)).filter(
        Expense.user_id == current_user.id,
        Expense.expense_date >= month_start,
        Expense.expense_date <= today,
    ).scalar()

    # Average daily spend this month
    days_elapsed = (today - month_start).days + 1
    avg_daily = float(total_month) / days_elapsed if days_elapsed > 0 else 0.0

    return {
        "total_spent_this_month": round(float(total_month), 2),
        "total_spent_today": round(float(total_today), 2),
        "transactions_this_month": tx_count,
        "average_daily_spend": round(avg_daily, 2),
        "currency": current_user.currency,
    }


@router.get("/by-category")
def get_by_category(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get spending grouped by category for the current month."""
    today = date.today()
    month_start = today.replace(day=1)

    results = (
        db.query(
            Category.id,
            Category.name,
            Category.icon,
            Category.color,
            func.coalesce(func.sum(Expense.amount), 0.0).label("total"),
        )
        .join(Expense, Expense.category_id == Category.id)
        .filter(
            Expense.user_id == current_user.id,
            Expense.expense_date >= month_start,
            Expense.expense_date <= today,
        )
        .group_by(Category.id, Category.name, Category.icon, Category.color)
        .all()
    )

    grand_total = sum(float(r.total) for r in results)

    categories = []
    for r in results:
        total = float(r.total)
        percentage = (total / grand_total * 100) if grand_total > 0 else 0.0
        categories.append({
            "category_id": r.id,
            "category_name": r.name,
            "icon": r.icon,
            "color": r.color,
            "total": round(total, 2),
            "percentage": round(percentage, 1),
        })

    # Sort by total descending
    categories.sort(key=lambda x: x["total"], reverse=True)

    return {"categories": categories, "grand_total": round(grand_total, 2)}


@router.get("/trends")
def get_trends(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get monthly spending totals for the last 6 months."""
    today = date.today()

    months = []
    for i in range(5, -1, -1):
        # Calculate month start
        year = today.year
        month = today.month - i
        while month <= 0:
            month += 12
            year -= 1
        month_start = date(year, month, 1)

        # Calculate month end
        if month == 12:
            month_end = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            month_end = date(year, month + 1, 1) - timedelta(days=1)

        total = db.query(func.coalesce(func.sum(Expense.amount), 0.0)).filter(
            Expense.user_id == current_user.id,
            Expense.expense_date >= month_start,
            Expense.expense_date <= month_end,
        ).scalar()

        months.append({
            "month": month_start.strftime("%Y-%m"),
            "month_name": month_start.strftime("%b %Y"),
            "total": round(float(total), 2),
        })

    return {"trends": months}


@router.get("/daily")
def get_daily(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Get daily spending totals for the current month."""
    today = date.today()
    month_start = today.replace(day=1)

    results = (
        db.query(
            Expense.expense_date,
            func.sum(Expense.amount).label("total"),
        )
        .filter(
            Expense.user_id == current_user.id,
            Expense.expense_date >= month_start,
            Expense.expense_date <= today,
        )
        .group_by(Expense.expense_date)
        .order_by(Expense.expense_date)
        .all()
    )

    # Build a map for existing days
    daily_map = {r.expense_date: float(r.total) for r in results}

    # Fill in all days of the month up to today
    days = []
    current = month_start
    while current <= today:
        days.append({
            "date": current.isoformat(),
            "total": round(daily_map.get(current, 0.0), 2),
        })
        current += timedelta(days=1)

    return {"daily": days}


@router.get("/export")
def export_csv(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Export all expenses as a CSV file download."""
    expenses = (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
        .order_by(Expense.expense_date.desc())
        .all()
    )

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Date", "Category", "Amount", "Description", "Payment Method", "Created At"])

    for expense in expenses:
        category_name = expense.category.name if expense.category else "N/A"
        writer.writerow([
            expense.id,
            expense.expense_date.isoformat(),
            category_name,
            expense.amount,
            expense.description or "",
            expense.payment_method,
            expense.created_at.isoformat() if expense.created_at else "",
        ])

    output.seek(0)

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=expenses.csv"},
    )
