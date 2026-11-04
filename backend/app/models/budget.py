"""Budget database model."""
from __future__ import annotations

from datetime import datetime, date

from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)  # null = overall budget
    limit_amount = Column(Float, nullable=False)
    period = Column(String, default="monthly")  # "monthly" or "weekly"
    start_date = Column(Date, default=date.today)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="budgets")
    category = relationship("Category", back_populates="budgets")
