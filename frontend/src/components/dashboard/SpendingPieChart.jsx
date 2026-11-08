import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const DEFAULT_COLORS = ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6', '#3B82F6', '#14B8A6', '#64748B'];

export default function SpendingPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col items-center justify-center min-h-[340px]">
        <p className="text-gray-400 text-sm font-medium">No expenses recorded for this period</p>
        <p className="text-gray-400 text-xs mt-1">Add transactions to see category distribution</p>
      </div>
    );
  }

  const chartData = data.map((item, index) => ({
    name: item.category_name || item.name,
    value: item.total || item.amount || 0,
    color: item.category_color || item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-xs">
          <p className="font-semibold text-gray-800">{item.name}</p>
          <p className="text-indigo-600 font-bold mt-0.5">{formatCurrency(item.value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Spending by Category</h3>
          <p className="text-xs text-gray-500">Distribution for the current month</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
