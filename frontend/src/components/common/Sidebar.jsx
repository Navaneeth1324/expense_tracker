import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Target, Settings, X } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Expenses', path: '/expenses', icon: ReceiptText },
  { name: 'Budgets', path: '/budgets', icon: Target },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed md:sticky top-0 md:top-[61px] left-0 h-full md:h-[calc(100vh-61px)] w-64 bg-white border-r border-gray-200 z-50 md:z-10 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-gray-200">
          <span className="font-bold text-gray-900">Navigation</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer tip */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 m-3 rounded-xl border">
          <p className="text-xs font-semibold text-gray-700">💡 Financial Tip</p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Aim for the 50/30/20 rule: 50% needs, 30% wants, and 20% savings.
          </p>
        </div>
      </aside>
    </>
  );
}
