"""Seed default categories into the database."""
from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.category import Category


DEFAULT_CATEGORIES = [
    {"name": "Food & Dining", "icon": "\U0001f355", "color": "#FF6384"},
    {"name": "Transport", "icon": "\U0001f697", "color": "#36A2EB"},
    {"name": "Shopping", "icon": "\U0001f6cd\ufe0f", "color": "#FFCE56"},
    {"name": "Bills & Utilities", "icon": "\U0001f4a1", "color": "#4BC0C0"},
    {"name": "Entertainment", "icon": "\U0001f3ac", "color": "#9966FF"},
    {"name": "Health", "icon": "\U0001f3e5", "color": "#FF9F40"},
    {"name": "Education", "icon": "\U0001f4da", "color": "#C9CBCF"},
    {"name": "Other", "icon": "\U0001f4b0", "color": "#7C8798"},
]


def seed_default_categories(db: Session) -> None:
    """Seed default/system categories if none exist."""
    existing_count = db.query(Category).filter(Category.user_id.is_(None)).count()
    if existing_count > 0:
        return

    for cat_data in DEFAULT_CATEGORIES:
        category = Category(
            name=cat_data["name"],
            icon=cat_data["icon"],
            color=cat_data["color"],
            user_id=None,  # System category
        )
        db.add(category)

    db.commit()
