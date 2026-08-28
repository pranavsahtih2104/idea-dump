import React, { useState } from 'react';
import { Plus, Hash, Send } from 'lucide-react';
import { IdeaType } from '../types';

interface QuickCaptureProps {
  onAddIdea: (content: string, type: IdeaType, tags: string[]) => void;
}

export const QuickCapture: React.FC<QuickCaptureProps> = ({ onAddIdea }) => {
  const [content, setContent] = useState('');
  const [selectedType, setSelectedType] = useState<IdeaType>('idea');
  const [tags, setTags] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const ideaTypes = [
    { type: 'idea' as IdeaType, label: 'Idea', color: 'from-purple-500 to-indigo-600', icon: '💡' },
    { type: 'task' as IdeaType, label: 'Task', color: 'from-blue-500 to-cyan-600', icon: '✅' },
    { type: 'thought' as IdeaType, label: 'Thought', color: 'from-green-500 to-emerald-600', icon: '🤔' },
    { type: 'reminder' as IdeaType, label: 'Reminder', color: 'from-orange-500 to-red-600', icon: '⏰' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      onAddIdea(content.trim(), selectedType, tagList);
      setContent('');
      setTags('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 shadow-medium hover-lift animate-slide-in-right">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Quick Capture</h2>
            <p className="text-gray-600">Dump your thoughts instantly</p>
          </div>
        </div>

        {/* Input Area */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind? Share your thoughts, ideas, or reminders..."
            className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 resize-none transition-all duration-300 text-gray-800 placeholder-gray-500"
            rows={isExpanded ? 4 : 2}
          />
        </div>

        {/* Expanded Options */}
        {isExpanded && (
          <div className="animate-fade-in-up space-y-6">
            {/* Type Selection */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ideaTypes.map(({ type, label, color, icon }) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`p-4 rounded-xl font-medium transition-all duration-300 flex flex-col items-center space-y-2 ${
                      selectedType === type
                        ? `bg-gradient-to-r ${color} text-white shadow-medium transform scale-105`
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                    }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tags Input */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Hash className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold text-gray-700">Tags</h3>
              </div>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Add tags separated by commas (e.g., work, urgent, creative)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={!content.trim()}
                className="btn-primary flex items-center space-x-2 px-8 py-3 text-white rounded-xl font-semibold shadow-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                <span>Add Idea</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};