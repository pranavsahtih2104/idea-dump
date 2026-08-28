import { useState, useEffect } from 'react';
import { Idea, IdeaType, Priority } from '../types';

const STORAGE_KEY = 'idea-dump-ideas';

export const useIdeas = () => {
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    const storedIdeas = localStorage.getItem(STORAGE_KEY);
    if (storedIdeas) {
      const parsedIdeas = JSON.parse(storedIdeas).map((idea: any) => ({
        ...idea,
        createdAt: new Date(idea.createdAt),
        updatedAt: new Date(idea.updatedAt),
      }));
      setIdeas(parsedIdeas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
  }, [ideas]);

  const addIdea = (content: string, type: IdeaType, tags: string[]) => {
    const newIdea: Idea = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      type,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      isTask: false,
    };
    setIdeas(prev => [newIdea, ...prev]);
  };

  const updateIdea = (id: string, updates: Partial<Idea>) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id 
        ? { ...idea, ...updates, updatedAt: new Date() }
        : idea
    ));
  };

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
  };

  const convertToTask = (id: string, priority: Priority, dueDate: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id 
        ? { 
            ...idea, 
            isTask: true, 
            priority, 
            dueDate: dueDate || undefined,
            completed: false,
            updatedAt: new Date()
          }
        : idea
    ));
  };

  return { ideas, addIdea, updateIdea, deleteIdea, convertToTask };
};