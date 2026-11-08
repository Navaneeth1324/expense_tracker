import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatCurrency';

export default function DailyBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col items-center justify-center min-h-[340px]">
        <p className="text-gray-400 text-sm font-medium">No daily activity recorded</p>
        <p className="text-gray-400 text-xs mt-1">Expenses by day will appear here</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    day: item.date ? item.date.slice(8, 10) : item.day,
    fullDate: item.date,
    amount: item.amount || item.total || 0,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-xs">
          <p className="font-semibold text-gray-800">{item.fullDate || `Day ${item.day}`}</p>
          <p className="text-indigo-600 font-bold mt-0.5">{formatCurrency(item.amount)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Daily Expenses</h3>
          <p className="text-xs text-gray-500">Day-by-day spending pattern this month</p>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCompactCurrency(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="amount" fill="#6366F1" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
