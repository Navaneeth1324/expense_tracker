import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User as UserIcon, Wallet, Menu } from 'lucide-react';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-gray-900 tracking-tight">FinWise</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                Expense Tracker
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 border border-gray-200">
              <UserIcon className="w-4 h-4" />
            </div>
            <span className="font-medium text-gray-800">{user?.username || 'User'}</span>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
