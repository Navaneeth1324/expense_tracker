import React from 'react';
import { IndianRupee, Calendar, TrendingDown, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: 'Spent This Month',
      value: formatCurrency(summary?.total_spent_month || 0),
      subtitle: `${summary?.transaction_count_month || 0} transactions`,
      icon: IndianRupee,
      color: 'bg-indigo-50 text-indigo-600',
      badge: 'Current Period',
    },
    {
      title: "Today's Spending",
      value: formatCurrency(summary?.total_spent_today || 0),
      subtitle: 'Recorded today',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-600',
      badge: 'Today',
    },
    {
      title: 'Daily Average',
      value: formatCurrency(summary?.avg_daily_spend || 0),
      subtitle: 'Per day this month',
      icon: TrendingDown,
      color: 'bg-amber-50 text-amber-600',
      badge: 'Pace',
    },
    {
      title: 'Active Transactions',
      value: summary?.transaction_count_month || 0,
      subtitle: 'Items tracked',
      icon: ArrowUpRight,
      color: 'bg-blue-50 text-blue-600',
      badge: 'Volume',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {card.badge}
              </span>
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1.5">{card.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
