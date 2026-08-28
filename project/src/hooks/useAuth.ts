import { useState, useEffect } from 'react';
import { User } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('idea-dump-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user for showcase
    const demoUser: User = {
      id: '1',
      email: email,
      name: email.split('@')[0],
    };
    
    setUser(demoUser);
    localStorage.setItem('idea-dump-user', JSON.stringify(demoUser));
    return demoUser;
  };

  const signup = async (email: string, password: string, name: string): Promise<User | null> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      name: name,
    };
    
    setUser(newUser);
    localStorage.setItem('idea-dump-user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('idea-dump-user');
  };

  return { user, login, signup, logout };
};