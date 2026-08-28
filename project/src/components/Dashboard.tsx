import React from 'react';
import { BarChart3, CheckCircle, Clock, Lightbulb, Target } from 'lucide-react';
import { Idea } from '../types';

interface DashboardProps {
  ideas: Idea[];
}

export const Dashboard: React.FC<DashboardProps> = ({ ideas }) => {
  const stats = {
    total: ideas.length,
    tasks: ideas.filter(i => i.isTask).length,
    completed: ideas.filter(i => i.isTask && i.completed).length,
    pending: ideas.filter(i => i.isTask && !i.completed).length,
    byType: {
      idea: ideas.filter(i => i.type === 'idea').length,
      task: ideas.filter(i => i.type === 'task').length,
      thought: ideas.filter(i => i.type === 'thought').length,
      reminder: ideas.filter(i => i.type === 'reminder').length,
    },
    recentActivity: ideas.slice(-5).reverse(),
  };

  const completionRate = stats.tasks > 0 ? (stats.completed / stats.tasks) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Ideas</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasks</p>
              <p className="text-2xl font-bold text-gray-800">{stats.tasks}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Chart */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Task Completion</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-sm font-medium text-gray-800">{completionRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="text-gray-600">Completed</p>
                <p className="font-semibold text-green-600">{stats.completed}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Pending</p>
                <p className="font-semibold text-orange-600">{stats.pending}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Type Distribution */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ideas by Type</h3>
          <div className="space-y-3">
            {[
              { type: 'idea', label: 'Ideas', color: 'bg-purple-500', icon: '💡' },
              { type: 'task', label: 'Tasks', color: 'bg-blue-500', icon: '✅' },
              { type: 'thought', label: 'Thoughts', color: 'bg-green-500', icon: '🤔' },
              { type: 'reminder', label: 'Reminders', color: 'bg-orange-500', icon: '⏰' },
            ].map(({ type, label, color, icon }) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm text-gray-700">{label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${stats.total > 0 ? (stats.byType[type as keyof typeof stats.byType] / stats.total) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-800 w-8 text-right">
                    {stats.byType[type as keyof typeof stats.byType]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        {stats.recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {stats.recentActivity.map((idea) => (
              <div key={idea.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="text-sm text-gray-800 truncate">{idea.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(idea.createdAt).toLocaleDateString()} • {idea.type}
                  </p>
                </div>
                {idea.isTask && idea.completed && (
                  <CheckCircle className="w-4 h-4 text-green-600 ml-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};