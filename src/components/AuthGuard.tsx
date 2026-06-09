import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { useAuth } from '../lib/auth-context';
import type { UserRole } from '../lib/auth-context';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, allowedRoles, fallback }: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate({ to: '/auth', search: { redirect: location.pathname } });
      return;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      if (user.role === 'admin') {
        navigate({ to: '/admin' });
      } else if (user.role === 'partner') {
        navigate({ to: '/partner-dashboard' });
      } else {
        navigate({ to: '/dashboard' });
      }
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || null;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return fallback || null;
  }

  return <>{children}</>;
}
