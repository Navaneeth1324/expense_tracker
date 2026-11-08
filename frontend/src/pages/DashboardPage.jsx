import React, { useState, useEffect } from 'react';
import { analyticsAPI, expenseAPI, categoryAPI } from '../services/api';
import SummaryCards from '../components/dashboard/SummaryCards';
import SpendingPieChart from '../components/dashboard/SpendingPieChart';
import DailyBarChart from '../components/dashboard/DailyBarChart';
import MonthlyTrend from '../components/dashboard/MonthlyTrend';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ExpenseForm from '../components/expenses/ExpenseForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [byCategory, setByCategory] = useState([]);
  const [daily, setDaily] = useState([]);
  const [trends, setTrends] = useState([]);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadDashboardData = async () => {
    try {
      const [sumRes, catRes, dailyRes, trendRes, expRes, catsRes] = await Promise.all([
        analyticsAPI.getSummary(),
        analyticsAPI.getByCategory(),
        analyticsAPI.getDaily(),
        analyticsAPI.getTrends(),
        expenseAPI.getAll({ limit: 5 }),
        categoryAPI.getAll(),
      ]);

      setSummary(sumRes.data);
      setByCategory(catRes.data);
      setDaily(dailyRes.data);
      setTrends(trendRes.data);
      setRecentExpenses(expRes.data);
      setCategories(catsRes.data);
    } catch (err) {
      console.error('Error fetching dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleCreateExpense = async (data) => {
    try {
      await expenseAPI.create(data);
      toast.success('Expense recorded!');
      loadDashboardData();
    } catch (err) {
      toast.error('Failed to record expense');
    }
  };

  if (loading) {
    return <LoadingSpinner text="Crunching your financial data..." />;
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Financial Overview</h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time breakdown of expenses, category allocations, and budget pacing
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Quick Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <SummaryCards summary={summary} />

      {/* Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingPieChart data={byCategory} />
        <DailyBarChart data={daily} />
      </div>

      {/* Monthly Trend Chart */}
      <MonthlyTrend data={trends} />

      {/* Recent Transactions List */}
      <RecentTransactions expenses={recentExpenses} />

      {/* Quick Add Expense Modal */}
      <ExpenseForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleCreateExpense}
        categories={categories}
      />
    </div>
  );
}
