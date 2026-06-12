import { createRootRouteWithContext, Outlet, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown, User, LogOut, Shield, Briefcase, LayoutDashboard, Wallet, MapPin, AlertTriangle, Settings, BookOpen, Star, Calendar } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth, type UserRole } from '../lib/auth-context';
import { VoiagoLogo } from '../components/VoiagoLogo';

interface RouterContext {
  auth: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const auth = useAuth();
  const { user, isAuthenticated, logout } = auth;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-lang-dropdown]')) setLangDropdownOpen(false);
      if (!target.closest('[data-user-menu]')) setUserMenuOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
    setLangDropdownOpen(false);
  };

  const navLinks = [
    { to: '/#features', label: t('nav_features'), icon: Star },
    { to: '/#guides', label: t('nav_guides'), icon: BookOpen },
    { to: '/#pricing', label: t('nav_pricing'), icon: Calendar },
    { to: '/#partners', label: t('nav_partners'), icon: Briefcase },
  ];

  const dashboardLinks: { to: string; label: string; icon: typeof LayoutDashboard; roles: UserRole[] }[] = [
    { to: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard, roles: ['traveler', 'admin'] },
    { to: '/wallet', label: t('nav_wallet'), icon: Wallet, roles: ['traveler', 'admin'] },
    { to: '/trip-planner', label: t('nav_trips'), icon: MapPin, roles: ['traveler', 'admin'] },
    { to: '/emergency', label: t('nav_emergency'), icon: AlertTriangle, roles: ['traveler', 'admin'] },
    { to: '/bookings', label: t('nav_bookings'), icon: Calendar, roles: ['traveler', 'admin'] },
    { to: '/points', label: t('nav_points'), icon: Star, roles: ['traveler', 'admin'] },
    { to: '/journal', label: t('nav_journal'), icon: BookOpen, roles: ['traveler', 'admin'] },
    { to: '/admin', label: t('nav_admin'), icon: Shield, roles: ['admin'] },
    { to: '/partner-dashboard', label: t('nav_partner'), icon: Briefcase, roles: ['partner', 'admin'] },
    { to: '/settings', label: t('nav_settings'), icon: Settings, roles: ['traveler', 'admin', 'partner'] },
  ];

  const getDashboardRoute = () => {
    if (!user) return '/auth';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'partner') return '/partner-dashboard';
    return '/dashboard';
  };

  const userNavLinks = user
    ? dashboardLinks.filter((l) => l.roles.includes(user.role))
    : [];

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <VoiagoLogo className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Voiago
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {!isAuthenticated ? (
                navLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                userNavLinks.slice(0, 6).map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    activeProps={{ className: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20' }}
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </nav>

            {/* Right side: Language + Auth */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative" data-lang-dropdown>
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={t('a11y_language_selector')}
                >
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{language === 'ar' ? 'العربية' : 'English'}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
                    <button
                      onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'en'
                          ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/20'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => { setLanguage('ar'); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === 'ar'
                          ? 'text-teal-600 bg-teal-50 dark:bg-teal-900/20'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      العربية
                    </button>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              {!isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/auth"
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {t('nav_login')}
                  </Link>
                  <Link
                    to="/auth"
                    search={{ tab: 'signup' }}
                    className="px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    {t('nav_signup')}
                  </Link>
                </div>
              ) : (
                <div className="relative" data-user-menu>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                        <User className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      </div>
                    )}
                    <span className="hidden lg:block text-sm font-medium text-slate-700 dark:text-slate-200">{user.name}</span>
                    <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                      </div>
                      <Link
                        to={getDashboardRoute()}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        {t('nav_dashboard')}
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings className="h-4 w-4" />
                        {t('nav_settings')}
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="h-4 w-4" />
                        {t('nav_logout')}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label={mobileMenuOpen ? t('a11y_close_menu') : t('a11y_open_menu')}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-3 space-y-1">
              {!isAuthenticated ? (
                navLinks.map((link) => (
                  <a
                    key={link.to}
                    href={link.to}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                userNavLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))
              )}
              {!isAuthenticated && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                  <Link
                    to="/auth"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav_login')}
                  </Link>
                  <Link
                    to="/auth"
                    search={{ tab: 'signup' }}
                    className="block w-full text-center px-4 py-2 text-sm font-medium bg-teal-600 text-white rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('nav_signup')}
                  </Link>
                </div>
              )}
              {isAuthenticated && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    {t('nav_logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
}
