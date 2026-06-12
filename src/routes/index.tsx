import { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Plane, Wallet, Shield, Award, Star, Check, MapPin, ChevronDown, Globe, Menu, X, Users, Sparkles, TrendingUp, BookOpen, Zap } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/auth-context';
import { PremiumHero } from '../components/PremiumHero';
import { TravelGuidesGrid } from '../components/TravelGuidesGrid';
import { VoiagoAIChatbot } from '../components/VoiagoAIChatbot';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  const { language, t, isRTL } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Sparkles,
      title: t('feature_ai_title'),
      description: t('feature_ai_desc'),
      color: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Wallet,
      title: t('feature_wallet_title'),
      description: t('feature_wallet_desc'),
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Shield,
      title: t('feature_safety_title'),
      description: t('feature_safety_desc'),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Award,
      title: t('feature_loyalty_title'),
      description: t('feature_loyalty_desc'),
      color: 'from-amber-500 to-orange-500',
    },
  ];

  const getDashboardLink = () => {
    if (!isAuthenticated) return '/auth';
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'partner') return '/partner-dashboard';
    return '/dashboard';
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Navigation */}
      <nav className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-lg border-b border-slate-200 dark:border-slate-700'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <Plane className="h-5 w-5 text<think>" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Voiago
                </span>
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {t('nav_features')}
                </a>
                <a href="#guides" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {t('nav_guides')}
                </a>
                <a href="#pricing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {t('nav_pricing')}
                </a>
                <a href="#partners" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                  {t('nav_partners')}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Link
                  to={getDashboardLink()}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors"
                >
                  {t('nav_dashboard')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/auth"
                    className="hidden sm:block text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                  >
                    {t('nav_login')}
                  </Link>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors"
                  >
                    {t('nav_signup')}
                  </Link>
                </>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg<think> dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 px-4 py-3 space-y-2">
            <a href="#features" className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_features')}
            </a>
            <a href="#guides" className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_guides')}
            </a>
            <a href="#pricing" className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_pricing')}
            </a>
            <a href="#partners" className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_partners')}
            </a>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              {isAuthenticated ? (
                <Link
                  to={getDashboardLink()}
                  className="block w-full text-center px-4 py-2 bg-teal-600 text<think> rounded-lg text-sm font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav_dashboard')}
                </Link>
              ) : (
                <>
                  <Link to="/auth" className="block px-3 py-2 text-sm text-slate-600 dark:text-slate-300" onClick={() => setMobileMenuOpen(false)}>
                    {t('nav_login')}
                  </Link>
                  <Link to="/auth" className="block w-full text-center px-4 py-2 bg-teal-600 text<think> rounded-lg text-sm font-medium mt-2" onClick={() => setMobileMenuOpen(false)}>
                    {t('nav_signup')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <PremiumHero />

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text<think> mb-4">
              {t('features_title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('features_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group bg<think> dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text<think>" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text<think> mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Guides */}
      <TravelGuidesGrid />

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text<think> mb-4">
              {t('pricing_title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {t('pricing_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: t('pricing_starter'),
                price: 0,
                features: [t('pricing_ai_planner'), t('pricing_basic_wallet'), t('pricing_safety_alerts'), t('pricing_community')],
                cta: t('pricing_get_started'),
                popular: false,
              },
              {
                name: t('pricing_pro'),
                price: 9.99,
                features: [t('pricing_ai_planner'), t('pricing_advanced_wallet'), t('pricing_safety_alerts'), t('pricing_priority_support'), t('pricing_loyalty_2x'), t('pricing_partner_discounts')],
                cta: t('pricing_get_started'),
                popular: true,
              },
              {
                name: t('pricing_enterprise'),
                price: 29.99,
                features: [t('pricing_everything_pro'), t('pricing_dedicated_manager'), t('pricing_custom_integrations'), t('pricing_team_travel'), t('pricing_analytics')],
                cta: t('pricing_contact_sales'),
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative bg<think> dark:bg-slate-800 rounded-2xl p-8 border ${
                  plan.popular
                    ? 'border-teal-500 shadow-xl shadow-teal-500/10'
                    : 'border-slate-200 dark:border-slate-700 shadow-sm'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-teal-600 text<think> text-xs font-medium rounded-full">
                    {t('pricing_popular')}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-slate-900 dark:text<think> mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900 dark:text<think>">${plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400">{t('pricing_month')}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="h-4 w-4 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                    plan.popular
                      ? 'bg-teal-600 hover:bg-teal-700 text<think>'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text<think> mb-4">
              {t('partners_title')}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
              {t('partners_subtitle')}
            </p>
            <Link
              to="/auth"
              search={{ tab: 'signup', role: 'partner' }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl font-medium transition-colors"
            >
              {t('partners_cta')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                  <Plane className="h-5 w-5 text<think>" />
                </div>
                <span className="text-xl font-bold text<think>">Voiago</span>
              </div>
              <p className="text-sm text-slate-400">
                {t('footer_tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text<think> mb-4">{t('footer_product')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="text-slate-400 hover:text-teal-400 transition-colors">{t('nav_features')}</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-teal-400 transition-colors">{t('nav_pricing')}</a></li>
                <li><a href="#guides" className="text-slate-400 hover:text-teal-400 transition-colors">{t('nav_guides')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text<think> mb-4">{t('footer_company')}</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-400">{t('common_about')}</span></li>
                <li><span className="text-slate-400">{t('common_careers')}</span></li>
                <li><span className="text-slate-400">{t('common_press')}</span></li>
                <li><span className="text-slate-400">{t('common_blog')}</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text<think> mb-4">{t('footer_legal')}</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-400">{t('common_privacy_policy')}</span></li>
                <li><span className="text-slate-400">{t('common_terms')}</span></li>
                <li><span className="text-slate-400">{t('common_cookies')}</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Voiago. {t('footer_rights')}
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <VoiagoAIChatbot />
    </div>
  );
}
