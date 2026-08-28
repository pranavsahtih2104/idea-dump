import React from 'react';
import { Search, Filter } from 'lucide-react';
import { IdeaType } from '../types';

interface FilterBarProps {
  selectedTag: IdeaType | 'all';
  onTagChange: (tag: IdeaType | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedTag,
  onTagChange,
  searchQuery,
  onSearchChange,
}) => {
  const filters = [
    { value: 'all', label: 'All', icon: '🔍' },
    { value: 'idea', label: 'Ideas', icon: '💡' },
    { value: 'task', label: 'Tasks', icon: '✅' },
    { value: 'thought', label: 'Thoughts', icon: '🤔' },
    { value: 'reminder', label: 'Reminders', icon: '⏰' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search ideas, tasks, or tags..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => onTagChange(filter.value as IdeaType | 'all')}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                  selectedTag === filter.value
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};