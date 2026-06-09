import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Shield, Users, Briefcase, Calendar, DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, BarChart3, Activity } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin — Voiago' }] }),
  component: AdminPage,
});

const stats = [
  { id: '1', label: 'Total Users', value: '12,450', change: '+12%', icon: Users, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: '2', label: 'Active Partners', value: '348', change: '+8%', icon: Briefcase, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
  { id: '3', label: 'Monthly Bookings', value: '2,840', change: '+24%', icon: Calendar, color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400' },
  { id: '4', label: 'Revenue', value: '$184K', change: '+18%', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' },
];

const recentActivity = [
  { id: '1', title: 'New partner application', desc: 'Desert Rose Hotel applied for partnership', time: '2 min ago', type: 'partner' },
  { id: '2', title: 'Booking dispute', desc: 'Refund request #4821 from Ahmed M.', time: '15 min ago', type: 'alert' },
  { id: '3', title: 'New user signup', desc: 'Sarah K. joined from Dubai', time: '1 hour ago', type: 'user' },
  { id: '4', title: 'Payout processed', desc: '$12,400 sent to 23 partners', time: '3 hours ago', type: 'success' },
];

const supportTickets = [
  { id: '1', title: 'Cannot modify booking dates', user: 'Ahmed M.', status: 'open', priority: 'high' },
  { id: '2', title: 'Wallet transaction failed', user: 'Sara K.', status: 'open', priority: 'medium' },
  { id: '3', title: 'Partner dashboard loading slow', user: 'Omar H.', status: 'pending', priority: 'low' },
];

export function AdminPage() {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'partners' | 'support'>('overview');

  // Auth guard - only admin can access
  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    navigate({ to: '/dashboard' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{t('common_access_denied')}</h3>
          <p className="text-slate-500 dark:text-slate-400">{t('common_admin_only')}</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout title={t('admin_title')} subtitle={t('admin_subtitle')}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.id} className="bg<think> dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text<think>">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {(['overview', 'users', 'partners', 'support'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'overview' ? t('common_overview') : tab === 'users' ? t('admin_users') : tab === 'partners' ? t('admin_partners') : t('admin_support')}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Revenue Chart Placeholder */}
                <div className="bg<think> dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900 dark:text<think>">{t('admin_revenue')}</h3>
                    <select className="text-sm border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-1.5 bg<think> dark:bg-slate-700">
                      <option>{t('common_last_30_days')}</option>
                      <option>{t('common_last_90_days')}</option>
                      <option>{t('common_last_year')}</option>
                    </select>
                  </div>
                  <div className="h-64 bg-slate-50 dark:bg-slate-700/50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t('common_chart_coming_soon')}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="font-semibold text-slate-900 dark:text<think>">{t('common_recent_activity')}</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {recentActivity.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4">
                        <div className={`p-2 rounded-lg ${
                          item.type === 'alert' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                          item.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                        }`}>
                          {item.type === 'alert' ? <AlertCircle className="h-4 w-4" /> :
                           item.type === 'success' ? <CheckCircle className="h-4 w-4" /> :
                           <Activity className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 dark:text<think>">{item.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'support' && (
              <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text<think>">{t('admin_support')}</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center gap-4 p-4">
                      <div className={`p-2 rounded-lg ${
                        ticket.priority === 'high' ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                        ticket.priority === 'medium' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                        'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                      }`}>
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text<think>">{ticket.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{ticket.user}</p>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        ticket.status === 'open' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                        'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Health */}
            <div className="bg<think> dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('common_system_health')}</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{t('common_api_status')}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('common_operational')}</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full w-[99%] bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{t('common_database')}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('common_operational')}</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full w-[99%] bg-emerald-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{t('common_cdn')}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">{t('common_operational')}</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full">
                    <div className="h-full w-[98%] bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg<think> dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('common_quick_actions')}</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <Users className="h-4 w-4" />
                  {t('common_manage_users')}
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <Briefcase className="h-4 w-4" />
                  {t('common_approve_partners')}
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  {t('common_process_payouts')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
