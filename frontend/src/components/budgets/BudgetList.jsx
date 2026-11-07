import React from 'react';
import BudgetProgress from './BudgetProgress';

export default function BudgetList({ budgets, onDelete }) {
  if (!budgets || budgets.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 text-xl">
          🎯
        </div>
        <h4 className="text-base font-bold text-gray-800">No active budgets set</h4>
        <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
          Establish spending limits for overall expenses or specific categories to prevent overspending.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {budgets.map((budget) => (
        <BudgetProgress key={budget.id} budget={budget} onDelete={onDelete} />
      ))}
    </div>
  );
}
