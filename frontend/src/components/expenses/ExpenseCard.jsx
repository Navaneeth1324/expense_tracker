import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/dateHelpers';

export default function ExpenseCard({ expense, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-gray-50/70 transition-colors">
      {/* Date */}
      <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
        {formatDate(expense.expense_date)}
      </td>

      {/* Description */}
      <td className="px-5 py-4 whitespace-nowrap">
        <span className="text-sm font-semibold text-gray-900">{expense.description}</span>
      </td>

      {/* Category */}
      <td className="px-5 py-4 whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700">
          <span>{expense.category_icon || '🏷️'}</span>
          <span>{expense.category_name || 'General'}</span>
        </span>
      </td>

      {/* Payment Method */}
      <td className="px-5 py-4 whitespace-nowrap text-xs text-gray-500 uppercase font-semibold">
        {expense.payment_method}
      </td>

      {/* Amount */}
      <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
        {formatCurrency(expense.amount)}
      </td>

      {/* Actions */}
      <td className="px-5 py-4 whitespace-nowrap text-right text-sm">
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={() => onEdit(expense)}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
