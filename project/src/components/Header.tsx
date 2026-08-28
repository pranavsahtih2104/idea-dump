import React from 'react';
import { BarChart3, Lightbulb, User, LogOut, Sparkles } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  activeView: 'dashboard' | 'ideas';
  onViewChange: (view: 'dashboard' | 'ideas') => void;
  user: UserType | null;
  onAuthClick: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onViewChange,
  user,
  onAuthClick,
  onLogout,
}) => {
  return (
    <header className="mb-8">
      <div className="glass-card rounded-3xl p-6 shadow-medium hover-lift">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-strong">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Idea Dump
              </h1>
              <p className="text-gray-600 font-medium">
                Your personal thought sanctuary
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Navigation */}
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => onViewChange('ideas')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeView === 'ideas'
                    ? 'btn-primary text-white shadow-medium'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span>Ideas</span>
              </button>
              
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  activeView === 'dashboard'
                    ? 'btn-primary text-white shadow-medium'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
            </nav>

            {/* Divider */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* User Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Welcome back</p>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="btn-primary flex items-center space-x-2 px-6 py-3 text-white rounded-xl font-semibold shadow-medium"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};