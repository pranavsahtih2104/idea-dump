import React, { useState } from 'react';
import { Header } from './components/Header';
import { QuickCapture } from './components/QuickCapture';
import { IdeaList } from './components/IdeaList';
import { Dashboard } from './components/Dashboard';
import { FilterBar } from './components/FilterBar';
import { TaskModal } from './components/TaskModal';
import { AuthModal } from './components/AuthModal';
import { useIdeas } from './hooks/useIdeas';
import { useAuth } from './hooks/useAuth';
import { Idea, IdeaType, Priority } from './types';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'ideas'>('ideas');
  const [selectedTag, setSelectedTag] = useState<IdeaType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const { ideas, addIdea, updateIdea, deleteIdea, convertToTask } = useIdeas();
  const { user, login, signup, logout } = useAuth();

  // Filter ideas based on search and tag
  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = selectedTag === 'all' || idea.type === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleConvertToTask = (idea: Idea) => {
    setSelectedIdea(idea);
    setTaskModalOpen(true);
  };

  const handleTaskConversion = (priority: Priority, dueDate: string) => {
    if (selectedIdea) {
      convertToTask(selectedIdea.id, priority, dueDate);
      setTaskModalOpen(false);
      setSelectedIdea(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <Header
          activeView={activeView}
          onViewChange={setActiveView}
          user={user}
          onAuthClick={() => setAuthModalOpen(true)}
          onLogout={logout}
        />

        <div className="animate-fade-in-up">
          {activeView === 'ideas' ? (
            <div className="space-y-8">
              <QuickCapture onAddIdea={addIdea} />
              
              <FilterBar
                selectedTag={selectedTag}
                onTagChange={setSelectedTag}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              <IdeaList
                ideas={filteredIdeas}
                onUpdateIdea={updateIdea}
                onDeleteIdea={deleteIdea}
                onConvertToTask={handleConvertToTask}
              />
            </div>
          ) : (
            <Dashboard ideas={ideas} />
          )}
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onSubmit={handleTaskConversion}
        idea={selectedIdea}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLogin={login}
        onSignup={signup}
      />

      {/* Floating Stats */}
      <div className="fixed bottom-6 right-6 z-20">
        <div className="glass-card rounded-2xl px-4 py-3 shadow-medium animate-float-gentle">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-soft"></div>
            <span className="text-gray-700 font-medium text-sm">
              {ideas.length} ideas captured
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;