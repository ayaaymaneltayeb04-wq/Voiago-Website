import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'traveler' | 'admin' | 'partner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  signup: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'traveler@voiago.com': {
    password: 'traveler123',
    user: {
      id: '1',
      name: 'Ahmed Traveler',
      email: 'traveler@voiago.com',
      role: 'traveler',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
  },
  'admin@voiago.com': {
    password: 'admin123',
    user: {
      id: '2',
      name: 'Sara Admin',
      email: 'admin@voiago.com',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    },
  },
  'partner@voiago.com': {
    password: 'partner123',
    user: {
      id: '3',
      name: 'Omar Partner',
      email: 'partner@voiago.com',
      role: 'partner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
  },
};

const STORAGE_KEY = 'voiago_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistUser = useCallback((u: User | null) => {
    if (u) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
      const demo = DEMO_USERS[email.toLowerCase()];
      if (demo && demo.password === password) {
        setUser(demo.user);
        persistUser(demo.user);
        return { success: true, role: demo.user.role };
      }
      return { success: false, error: 'Invalid email or password' };
    },
    [persistUser]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string, role: UserRole = 'traveler'): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
      const key = email.toLowerCase();
      if (DEMO_USERS[key]) {
        return { success: false, error: 'Email already registered' };
      }
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email: key,
        role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff`,
      };
      setUser(newUser);
      persistUser(newUser);
      return { success: true, role };
    },
    [persistUser]
  );

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, [persistUser]);

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
