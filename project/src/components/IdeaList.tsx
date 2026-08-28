import React from 'react';
import { IdeaCard } from './IdeaCard';
import { Idea, Priority } from '../types';

interface IdeaListProps {
  ideas: Idea[];
  onUpdateIdea: (id: string, updates: Partial<Idea>) => void;
  onDeleteIdea: (id: string) => void;
  onConvertToTask: (idea: Idea) => void;
}

export const IdeaList: React.FC<IdeaListProps> = ({
  ideas,
  onUpdateIdea,
  onDeleteIdea,
  onConvertToTask,
}) => {
  if (ideas.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🤔</span>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No ideas yet</h3>
        <p className="text-gray-500">Start dumping your thoughts above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Ideas ({ideas.length})
        </h2>
      </div>
      
      <div className="grid gap-4">
        {ideas.map((idea) => (
          <IdeaCard
            key={idea.id}
            idea={idea}
            onUpdate={onUpdateIdea}
            onDelete={onDeleteIdea}
            onConvertToTask={onConvertToTask}
          />
        ))}
      </div>
    </div>
  );
};