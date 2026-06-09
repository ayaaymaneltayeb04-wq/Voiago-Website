import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Calendar, Wallet, ShieldAlert, MapPin, Clock, ArrowUpRight, ArrowDownLeft, Sparkles, Award, TrendingUp, Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/dashboard')({
  head: () => ({ meta: [{ title: 'Dashboard — Voiago' }] }),
  component: DashboardPage,
});

const activeItinerary = [
  { id: '1', time: '09:00 AM', title: 'Eco-Lodge Check-in & Orientation', desc: 'Arrive at the coastal resort, unlock your premium room with the Voiago digital key, meet your coordinator.', type: 'stay', icon: '🏨' },
  { id: '2', time: '02:30 PM', title: 'Guided Red Sea Reef Exploration', desc: 'A calm, small-group diving and exploration tour around protected maritime coral reefs.', type: 'explore', icon: '🤿' },
  { id: '3', time: '07:00 PM', title: 'Bedouin Cultural Dinner & Astronomy', desc: 'An authentic, slow-paced dining experience under the desert stars with local hosts.', type: 'food', icon: '🌟' },
];

const walletTx = [
  { id: 't1', title: 'Boutique Hotel Cashback', amount: '+$45.20', date: 'Today', type: 'credit' },
  { id: 't2', title: 'Eco-Tour Booking', amount: '-$120.00', date: 'Yesterday', type: 'debit' },
  { id: 't3', title: 'Voiago Reward Points', amount: '+500 pts', date: '1 Jun', type: 'points' },
];

export function DashboardPage() {
  const { language, t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'insights'>('itinerary');

  // Auth guard - redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <DashboardLayout
      title={language === 'ar' ? `${t('dashboard_welcome')}, ${user?.name ?? t('common_traveler')}` : `${t('dashboard_welcome')}, ${user?.name ?? 'Traveler'}`}
      subtitle={t('dashboard_subtitle')}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
              <Calendar className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </div>
            <span className="text-xs font-medium text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 px-2.5 py-1 rounded-full">{t('dashboard_active_trip')}</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('dashboard_days_until')}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
              <Wallet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">$1,245.00</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('wallet_balance')}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">2,450</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('points_balance')}</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <ShieldAlert className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">{t('dashboard_safety_safe')}</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{t('dashboard_safety_status')}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('emergency_last_updated')} 2m ago</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Trip */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="relative h-48 bg-gradient-to-r from-teal-600 to-cyan-600">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=400&fit=crop"
                alt="Dahab"
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>Dahab, Egypt</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{t('dashboard_upcoming')}</h3>
                <p className="text-white/80 text-sm">Jun 15 - Jun 22, 2026 • 2 {t('dashboard_travelers')}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-600 dark:text-slate-400">{t('dashboard_budget')}</span>
                    <span className="font-medium text-slate-900 dark:text-white">$1,800 / $3,500</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-[51%] bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Itinerary Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'itinerary'
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {t('dashboard_itinerary')}
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'insights'
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {t('dashboard_insights')}
                </button>
              </div>

              {activeTab === 'itinerary' && (
                <div className="space-y-3">
                  {activeItinerary.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex flex-col items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{item.time}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{item.icon}</span>
                          <h4 className="font-medium text-slate-900 dark:text-white">{item.title}</h4>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'insights' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
                      <p className="text-lg font-bold text-slate-900 dark:text-white">85%</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('common_sustainability')}</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <Sparkles className="h-6 w-6 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                      <p className="text-lg font-bold text-slate-900 dark:text-white">4.8</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('common_rating')}</p>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <MapPin className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                      <p className="text-lg font-bold text-slate-900 dark:text-white">12</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('common_places')}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('common_quick_actions')}</h3>
            <div className="space-y-2">
              <Link to="/trip-planner" className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors">
                <Plus className="h-5 w-5" />
                <span className="text-sm font-medium">{t('planner_title')}</span>
              </Link>
              <Link to="/wallet" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <Wallet className="h-5 w-5" />
                <span className="text-sm font-medium">{t('wallet_title')}</span>
              </Link>
              <Link to="/emergency" className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                <ShieldAlert className="h-5 w-5" />
                <span className="text-sm font-medium">{t('emergency_title')}</span>
              </Link>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">{t('dashboard_recent_activity')}</h3>
              <Link to="/wallet" className="text-sm text-teal-600 dark:text-teal-400 hover:underline">{t('common_view_all')}</Link>
            </div>
            <div className="space-y-3">
              {walletTx.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      tx.type === 'credit' ? 'bg-emerald-50 dark:bg-emerald-900/20' :
                      tx.type === 'points' ? 'bg-amber-50 dark:bg-amber-900/20' :
                      'bg-red-50 dark:bg-red-900/20'
                    }`}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> :
                       tx.type === 'points' ? <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" /> :
                       <ArrowUpRight className="h-4 w-4 text-red-600 dark:text-red-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    tx.type === 'credit' ? 'text-emerald-600 dark:text-emerald-400' :
                    tx.type === 'points' ? 'text-amber-600 dark:text-amber-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>{tx.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
