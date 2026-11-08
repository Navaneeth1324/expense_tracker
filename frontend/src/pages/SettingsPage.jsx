import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { categoryAPI } from '../services/api';
import { User, Shield, Tag, Info, Check } from 'lucide-react';
import { formatDate } from '../utils/dateHelpers';

export default function SettingsPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryAPI.getAll().then((res) => setCategories(res.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Account & Settings</h1>
        <p className="text-xs text-gray-500 mt-1">
          Review your profile credentials and system configuration
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
          <User className="w-4 h-4 text-indigo-600" />
          <span>User Profile</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Username</span>
            <p className="font-bold text-gray-800 mt-1">{user?.username}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Email</span>
            <p className="font-bold text-gray-800 mt-1">{user?.email}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Default Currency</span>
            <p className="font-bold text-gray-800 mt-1">INR (₹ - Indian Rupee)</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <span className="text-xs text-gray-400 font-semibold uppercase">Member Since</span>
            <p className="font-bold text-gray-800 mt-1">{formatDate(user?.created_at)}</p>
          </div>
        </div>
      </div>

      {/* Categories Card */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
          <Tag className="w-4 h-4 text-indigo-600" />
          <span>System Expense Categories</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {categories.map((c) => (
            <div
              key={c.id}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 bg-gray-50"
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About Application */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
          <Info className="w-4 h-4 text-indigo-600" />
          <span>About Project</span>
        </div>

        <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
          <p>
            <strong>FinWise</strong> is an intelligent expense tracking platform built with a
            modern FastAPI REST engine, SQLAlchemy, and React with Recharts analytics.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">FastAPI</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">React 19</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">Tailwind CSS</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">SQLAlchemy</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">Recharts</span>
            <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-semibold">JWT Security</span>
          </div>
        </div>
      </div>
    </div>
  );
}
