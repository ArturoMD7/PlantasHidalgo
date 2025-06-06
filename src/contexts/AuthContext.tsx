"use client";

import type { User } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users
const mockUsers: Record<string, User> = {
  "user@example.com": { id: "user1", email: "user@example.com", displayName: "Usuario Común", role: "user", avatarUrl: "https://placehold.co/40x40.png" },
  "admin@example.com": { id: "admin1", email: "admin@example.com", displayName: "Admin Flores", role: "admin", avatarUrl: "https://placehold.co/40x40.png" },
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    const storedUser = localStorage.getItem('flores-hidalgo-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    // In a real app, this would involve an API call and password check
    const foundUser = Object.values(mockUsers).find(u => u.email === userData.email);
    if (foundUser) { // For mock, we assume if email exists, login is successful.
      setUser(foundUser);
      localStorage.setItem('flores-hidalgo-user', JSON.stringify(foundUser));
    } else {
      // Basic mock user creation if not in predefined list
      const newUser: User = { ...userData, id: `mock-${Date.now()}`, role: 'user' };
      setUser(newUser);
      localStorage.setItem('flores-hidalgo-user', JSON.stringify(newUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('flores-hidalgo-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
