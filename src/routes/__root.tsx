import { createRootRoute, Outlet } from '@tanstack/react-router';
import { AuthProvider } from '../lib/auth-context';
import { LanguageProvider } from '../lib/LanguageContext';
import { LanguageToggler } from '../components/LanguageToggler';

function RootLayout() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="relative">
          <div className="fixed top-4 right-4 z-[100]">
            <LanguageToggler />
          </div>
          <Outlet />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-hero flex items-center justify-center text-white">
      <div className="text-center">
        <p className="text-8xl font-black text-orange-500">404</p>
        <h1 className="text-2xl font-bold mt-4 mb-2">Page not found</h1>
        <p className="text-azure-200/70 mb-8">The page you're looking for doesn't exist.</p>
        <a href="/" className="btn-cta px-6 py-3 text-sm">Go Home</a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
});
