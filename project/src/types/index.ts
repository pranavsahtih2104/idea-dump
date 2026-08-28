export type IdeaType = 'idea' | 'task' | 'thought' | 'reminder';
export type Priority = 'low' | 'medium' | 'high';

export interface Idea {
  id: string;
  content: string;
  type: IdeaType;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isTask: boolean;
  priority?: Priority;
  dueDate?: string;
  completed?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
}