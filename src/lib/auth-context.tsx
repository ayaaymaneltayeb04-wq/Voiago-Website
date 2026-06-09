import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserRole = 'traveler' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  preferredCurrency?: string;
  preferredLanguage?: 'en' | 'ar';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  login: (userData: User | string, roleOrToken?: string) => void;
  logout: () => void;
  updatePreferences: (currency: string, language: 'en' | 'ar') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('voiago_user');
    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch { localStorage.removeItem('voiago_user'); }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User | string, roleOrToken?: string) => {
    let finalUser: User;
    if (typeof userData === 'string') {
      finalUser = { id: '1', name: userData.split('@')[0], email: userData, role: (roleOrToken as UserRole) || 'traveler' };
    } else {
      finalUser = roleOrToken ? { ...userData, role: roleOrToken as UserRole } : userData;
    }
    setUser(finalUser);
    localStorage.setItem('voiago_user', JSON.stringify(finalUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('voiago_user');
  };

  const updatePreferences = (currency: string, language: 'en' | 'ar') => {
    if (!user) return;
    const updated = { ...user, preferredCurrency: currency, preferredLanguage: language };
    setUser(updated);
    localStorage.setItem('voiago_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, role: user?.role ?? null, login, logout, updatePreferences }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
