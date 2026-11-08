import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency, formatCompactCurrency } from '../../utils/formatCurrency';

export default function MonthlyTrend({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col items-center justify-center min-h-[280px]">
        <p className="text-gray-400 text-sm font-medium">No historical trend data yet</p>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 text-xs">
          <p className="font-semibold text-gray-800">{item.month_name || item.month}</p>
          <p className="text-indigo-600 font-bold mt-0.5">{formatCurrency(item.total || item.amount)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Spending Trend (Last 6 Months)</h3>
          <p className="text-xs text-gray-500">Long-term monthly expense flow</p>
        </div>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="month_name" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: '#9CA3AF' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCompactCurrency(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={2.5} fillOpacity={1} fill="url(#trendGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
