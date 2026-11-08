import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Tag } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateHelpers';

export default function RecentTransactions({ expenses }) {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs text-center">
        <p className="text-gray-400 text-sm font-medium">No recent transactions</p>
        <Link
          to="/expenses"
          className="inline-block mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
        >
          + Record your first expense
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Recent Transactions</h3>
          <p className="text-xs text-gray-500">Latest expense activity</p>
        </div>
        <Link
          to="/expenses"
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {expenses.slice(0, 5).map((expense) => {
          const category = expense.category;
          return (
            <div key={expense.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-medium shrink-0"
                  style={{
                    backgroundColor: `${category?.color || '#6366F1'}15`,
                    color: category?.color || '#6366F1',
                  }}
                >
                  {category?.icon || '💸'}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{expense.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{formatDate(expense.expense_date)}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs text-gray-500 capitalize">{expense.payment_method}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-gray-900">
                  -{formatCurrency(expense.amount)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
