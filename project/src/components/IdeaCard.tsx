import React, { useState } from 'react';
import { Edit, Trash2, ArrowRight, Check, X, Hash, Calendar, Clock } from 'lucide-react';
import { Idea, Priority } from '../types';

interface IdeaCardProps {
  idea: Idea;
  onUpdate: (id: string, updates: Partial<Idea>) => void;
  onDelete: (id: string) => void;
  onConvertToTask: (idea: Idea) => void;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  onUpdate,
  onDelete,
  onConvertToTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(idea.content);

  const typeConfig = {
    idea: { 
      color: 'from-purple-500 to-indigo-600', 
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      icon: '💡'
    },
    task: { 
      color: 'from-blue-500 to-cyan-600', 
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      icon: '✅'
    },
    thought: { 
      color: 'from-green-500 to-emerald-600', 
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      icon: '🤔'
    },
    reminder: { 
      color: 'from-orange-500 to-red-600', 
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      icon: '⏰'
    },
  };

  const priorityConfig = {
    low: { color: 'bg-green-100 text-green-700', label: 'Low', dot: 'bg-green-500' },
    medium: { color: 'bg-yellow-100 text-yellow-700', label: 'Medium', dot: 'bg-yellow-500' },
    high: { color: 'bg-red-100 text-red-700', label: 'High', dot: 'bg-red-500' },
  };

  const handleSave = () => {
    onUpdate(idea.id, { content: editContent.trim() });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(idea.content);
    setIsEditing(false);
  };

  const handleToggleComplete = () => {
    onUpdate(idea.id, { completed: !idea.completed });
  };

  const config = typeConfig[idea.type];

  return (
    <div className={`glass-card rounded-2xl p-6 shadow-soft hover-lift transition-all duration-300 ${
      idea.completed ? 'opacity-75' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Type Badge */}
          <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${config.color} text-white font-medium text-sm flex items-center space-x-2`}>
            <span>{config.icon}</span>
            <span>{idea.type}</span>
          </div>

          {/* Priority Badge */}
          {idea.isTask && idea.priority && (
            <div className={`px-3 py-1 rounded-lg ${priorityConfig[idea.priority].color} font-medium text-sm flex items-center space-x-2`}>
              <div className={`w-2 h-2 rounded-full ${priorityConfig[idea.priority].dot}`}></div>
              <span>{priorityConfig[idea.priority].label}</span>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {idea.isTask && (
            <button
              onClick={handleToggleComplete}
              className={`p-2 rounded-lg transition-all duration-200 ${
                idea.completed
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
              }`}
              title={idea.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(idea.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none transition-all duration-300"
            rows={4}
          />
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-2 font-medium"
            >
              <Check className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center space-x-2 font-medium"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Main Content */}
          <p className={`text-gray-800 leading-relaxed ${
            idea.completed ? 'line-through text-gray-500' : ''
          }`}>
            {idea.content}
          </p>
          
          {/* Tags */}
          {idea.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              <Hash className="w-4 h-4 text-gray-400" />
              {idea.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Due Date */}
          {idea.dueDate && (
            <div className="flex items-center text-orange-600 bg-orange-50 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-medium text-sm">Due: {new Date(idea.dueDate).toLocaleDateString()}</span>
            </div>
          )}
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
            </div>
            
            {!idea.isTask && (
              <button
                onClick={() => onConvertToTask(idea)}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-medium text-sm shadow-medium"
              >
                <span>Convert to Task</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};