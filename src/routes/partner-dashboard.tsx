import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Briefcase, Star, Calendar, DollarSign, TrendingUp, AlertCircle, MapPin, Users, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { PartnerPortal } from '../components/PartnerPortal';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/partner-dashboard')({
  head: () => ({ meta: [{ title: 'Partner Dashboard — Voiago' }] }),
  component: PartnerDashboardPage,
});

const stats = [
  { id: '1', label: 'Total Bookings', value: '156', change: '+18%', icon: Calendar, color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400' },
  { id: '2', label: 'Revenue', value: '$24,500', change: '+12%', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' },
  { id: '3', label: 'Rating', value: '4.8', change: '+0.2', icon: Star, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
  { id: '4', label: 'Views', value: '3,240', change: '+35%', icon: TrendingUp, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
];

const recentBookings = [
  { id: '1', guest: 'Ahmed M.', dates: 'Jun 15-22', amount: 850, status: 'confirmed' },
  { id: '2', guest: 'Sara K.', dates: 'Jul 3-7', amount: 620, status: 'pending' },
  { id: '3', guest: 'Omar H.', dates: 'Aug 1-5', amount: 480, status: 'confirmed' },
];

export function PartnerDashboardPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'bookings' | 'reviews'>('overview');

  // Auth guard - only partner/admin can access
  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (user?.role !== 'partner' && user?.role !== 'admin') {
    navigate({ to: '/dashboard' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{t('common_access_denied')}</h3>
          <p className="text-slate-500 dark:text-slate-400">{t('common_partner_only')}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout title={t('partner_title')} subtitle={t('partner_subtitle')}>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['overview', 'listings', 'bookings', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'overview' ? t('common_overview') : tab === 'listings' ? t('partner_listings') : tab === 'bookings' ? t('partner_bookings') : t('partner_reviews')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Recent Bookings */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{t('partner_bookings')}</h3>
                    <button className="text-sm text-teal-600 dark:text-teal-400 hover:underline">{t('common_view_all')}</button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center gap-4 p-4">
                        <div className="p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                          <Users className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{booking.guest}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{booking.dates}</p>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">${booking.amount}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('partner_analytics')}</h3>
                  <div className="h-48 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t('common_chart_coming_soon')}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'listings' && (
              <PartnerPortal />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('common_quick_actions')}</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors text-sm font-medium">
                  <MapPin className="h-4 w-4" />
                  {t('common_add_listing')}
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  {t('common_view_payouts')}
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <Star className="h-4 w-4" />
                  {t('common_view_reviews')}
                </button>
              </div>
            </div>

            {/* Payout Status */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('partner_payouts')}</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('common_available')}</span>
                  <span className="font-medium text-slate-900 dark:text-white">$8,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('common_pending')}</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">$2,100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">{t('common_total_earned')}</span>
                  <span className="font-medium text-slate-900 dark:text-white">$45,200</span>
                </div>
              </div>
              <button className="w-full mt-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium transition-colors">
                {t('common_request_payout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
