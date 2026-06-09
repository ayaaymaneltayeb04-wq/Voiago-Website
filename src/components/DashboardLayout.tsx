import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Menu,
  X,
  LayoutDashboard,
  Wallet,
  MapPin,
  AlertTriangle,
  Settings,
  BookOpen,
  Star,
  Calendar,
  Shield,
  Briefcase,
  ChevronRight,
  Bell,
  Search,
  LogOut,
} from 'lucide-react';
import { useAuth, type UserRole } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { VoiagoLogo } from './VoiagoLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const travelerLinks: { to: string; label: string; icon: typeof LayoutDashboard }[] = [
    { to: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { to: '/wallet', label: t('nav_wallet'), icon: Wallet },
    { to: '/trip-planner', label: t('nav_trips'), icon: MapPin },
    { to: '/emergency', label: t('nav_emergency'), icon: AlertTriangle },
    { to: '/bookings', label: t('nav_bookings'), icon: Calendar },
    { to: '/points', label: t('nav_points'), icon: Star },
    { to: '/journal', label: t('nav_journal'), icon: BookOpen },
    { to: '/settings', label: t('nav_settings'), icon: Settings },
  ];

  const adminLinks: { to: string; label: string; icon: typeof LayoutDashboard }[] = [
    { to: '/admin', label: t('nav_admin'), icon: Shield },
    { to: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { to: '/settings', label: t('nav_settings'), icon: Settings },
  ];

  const partnerLinks: { to: string; label: string; icon: typeof LayoutDashboard }[] = [
    { to: '/partner-dashboard', label: t('nav_partner'), icon: Briefcase },
    { to: '/settings', label: t('nav_settings'), icon: Settings },
  ];

  const getLinks = () => {
    if (user?.role === 'admin') return adminLinks;
    if (user?.role === 'partner') return partnerLinks;
    return travelerLinks;
  };

  const links = getLinks();
  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40 transform transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* User Card */}
          <div className="mb-6 p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover mb-3" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-teal-600 dark:text-teal-400">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
            )}
            <p className="font-medium text-slate-900 dark:text<think> text-sm">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
            <span className="inline-block mt-2 px-2 py-0.5 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-xs rounded-full capitalize">
              {user?.role}
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {isActive && <ChevronRight className="h-3 w-3 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 mt-6 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <LogOut className="h-4 w-4" />
            {t('nav_logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-16 z-30 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text<think>">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg<think> dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('common_search')}
                  className="bg-transparent text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none w-32 lg:w-48"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg<think> dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <span className="font-medium text-slate-900 dark:text<think> text-sm">{t('notif_title')}</span>
                      <button className="text-xs text-teal-600 dark:text-teal-400 hover:underline">
                        {t('notif_mark_all_read')}
                      </button>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <p className="text-sm font-medium text-slate-900 dark:text<think>">{t('notif_flight_reminder')}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('notif_flight_desc')}</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <p className="text-sm font-medium text-slate-900 dark:text<think>">{t('notif_points_earned')}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t('notif_points_desc')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
