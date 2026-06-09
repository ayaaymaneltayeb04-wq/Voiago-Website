import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import {
  LayoutDashboard, Plane, Map, LifeBuoy, Wallet, Gift,
  BookOpen, Settings, LogOut, ChevronRight, Menu, X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { VoiagoLogo } from './VoiagoLogo';
import { LanguageToggler } from './LanguageToggler';

const navItems = [
  { to: '/dashboard',    label: 'My Trips',      labelAr: 'رحلاتي',        icon: Plane },
  { to: '/bookings',     label: 'Bookings',       labelAr: 'الحجوزات',       icon: LayoutDashboard },
  { to: '/trip-planner', label: 'Trip Planner',   labelAr: 'مخطط الرحلات',  icon: Map },
  { to: '/wallet',       label: 'Wallet',          labelAr: 'المحفظة',        icon: Wallet },
  { to: '/emergency',    label: 'Emergency',       labelAr: 'الطوارئ',        icon: LifeBuoy },
  { to: '/points',       label: 'Rewards',         labelAr: 'المكافآت',       icon: Gift },
  { to: '/journal',      label: 'Journal',         labelAr: 'اليومية',        icon: BookOpen },
  { to: '/settings',     label: 'Settings',        labelAr: 'الإعدادات',      icon: Settings },
];

interface Props {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function DashboardLayout({ title, subtitle, children }: Props) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { logout, user } = useAuth();
  const { language, isRtl } = useLanguage();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate({ to: '/' }); };

  return (
    <div className="flex min-h-screen bg-[#f5f8ff]" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 z-40 flex flex-col w-64 bg-navy-900 transition-transform duration-300 ${
          isRtl ? 'right-0' : 'left-0'
        } ${sidebarOpen ? 'translate-x-0' : isRtl ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
          <button onClick={() => navigate({ to: '/' })} className="flex items-center gap-2.5">
            <VoiagoLogo size="sm" showText dark />
          </button>
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white text-sm font-bold">
              {user?.name?.[0]?.toUpperCase() ?? 'V'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name ?? 'Traveler'}</p>
              <p className="text-xs text-azure-300/70 truncate">{user?.email ?? ''}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${active ? 'active' : ''}`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span>{language === 'ar' ? item.labelAr : item.label}</span>
                {active && <ChevronRight className={`ml-auto h-4 w-4 opacity-60 ${isRtl ? 'rotate-180' : ''}`} />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="sidebar-link w-full text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            <span>{language === 'ar' ? 'تسجيل الخروج' : 'Sign out'}</span>
          </button>
        </div>
      </aside>

      {/* Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content area */}
      <div className={`flex-1 flex flex-col min-w-0 ${isRtl ? 'lg:mr-64' : 'lg:ml-64'}`}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-navy-100 bg-white/95 backdrop-blur-md px-6">
          <button
            className="lg:hidden text-navy-600 hover:text-navy-900"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-navy-900 truncate">{title}</h1>
            {subtitle && <p className="text-xs text-navy-400 truncate">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggler />
            <button onClick={() => navigate({ to: '/' })} className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-navy-400 hover:text-navy-700 transition">
              <ChevronRight className={`h-3.5 w-3.5 ${isRtl ? '' : 'rotate-180'}`} />
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 page-enter">
          {children}
        </main>
      </div>
    </div>
  );
}
