import React from 'react';
import { Trash2, AlertCircle, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export default function BudgetProgress({ budget, onDelete }) {
  const current = budget.current_spend || 0;
  const limit = budget.limit_amount || 1;
  const percentage = Math.min(Math.round((current / limit) * 100), 100);
  const remaining = Math.max(limit - current, 0);
  const isOver = current > limit;

  // Determine color based on threshold
  let barColor = 'bg-emerald-500';
  let badgeColor = 'bg-emerald-50 text-emerald-700';

  if (percentage >= 90 || isOver) {
    barColor = 'bg-red-500';
    badgeColor = 'bg-red-50 text-red-700';
  } else if (percentage >= 70) {
    barColor = 'bg-amber-500';
    badgeColor = 'bg-amber-50 text-amber-700';
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 uppercase">
            {budget.period}
          </span>
          <h4 className="text-base font-bold text-gray-900 mt-2">
            {budget.category_name || 'Overall Monthly Budget'}
          </h4>
        </div>
        <button
          onClick={() => onDelete(budget.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          title="Delete Budget"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-bold text-gray-900 text-lg">{formatCurrency(current)}</span>
          <span className="text-xs text-gray-500 font-medium">Cap: {formatCurrency(limit)}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 mt-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${barColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>
            {isOver ? `Over by ${formatCurrency(current - limit)}` : `${percentage}% Used`}
          </span>
          <span className="text-xs text-gray-500">
            {isOver ? (
              <span className="text-red-500 font-semibold inline-flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Exceeded
              </span>
            ) : (
              `${formatCurrency(remaining)} left`
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
