import React, { useState, useEffect } from 'react';
import { budgetAPI, categoryAPI } from '../services/api';
import BudgetList from '../components/budgets/BudgetList';
import BudgetForm from '../components/budgets/BudgetForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Plus, Target } from 'lucide-react';
import toast from 'react-hot-toast';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bRes, cRes] = await Promise.all([
        budgetAPI.getAll(),
        categoryAPI.getAll(),
      ]);
      setBudgets(bRes.data);
      setCategories(cRes.data);
    } catch (err) {
      toast.error('Failed to load budgets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateBudget = async (data) => {
    try {
      await budgetAPI.create(data);
      toast.success('Budget created successfully');
      fetchData();
    } catch (err) {
      toast.error('Failed to create budget');
    }
  };

  const handleDeleteBudget = async (id) => {
    if (!window.confirm('Delete this budget limit?')) return;
    try {
      await budgetAPI.delete(id);
      toast.success('Budget deleted');
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      toast.error('Failed to delete budget');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Budgets & Targets</h1>
          <p className="text-xs text-gray-500 mt-1">
            Establish financial limits to curb overspending and track monthly thresholds
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-100 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Set New Budget</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner text="Analyzing active budgets..." />
      ) : (
        <BudgetList budgets={budgets} onDelete={handleDeleteBudget} />
      )}

      {/* Budget Modal */}
      <BudgetForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBudget}
        categories={categories}
      />
    </div>
  );
}
