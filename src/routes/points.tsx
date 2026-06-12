import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Star, Gift, TrendingUp, Award, Zap, Plane, Hotel, UtensilsCrossed } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { LoyaltyGamification } from '../components/LoyaltyGamification';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/points')({
  head: () => ({ meta: [{ title: 'Points — Voiago' }] }),
  component: PointsPage,
});

const rewards = [
  { id: '1', title: 'Free Airport Transfer', points: 500, icon: Plane, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: '2', title: 'Hotel Room Upgrade', points: 1000, icon: Hotel, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400' },
  { id: '3', title: 'Dinner for Two', points: 750, icon: UtensilsCrossed, color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
  { id: '4', title: 'Priority Check-in', points: 300, icon: Zap, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
];

const history = [
  { id: '1', title: 'Booking: Dahab Eco-Lodge', points: 450, date: 'Jun 8', type: 'earn' },
  { id: '2', title: 'Redeemed: Airport Transfer', points: -500, date: 'Jun 5', type: 'redeem' },
  { id: '3', title: 'Review Bonus', points: 100, date: 'Jun 3', type: 'earn' },
  { id: '4', title: 'Referral: Ahmed', points: 200, date: 'May 28', type: 'earn' },
];

export function PointsPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'rewards' | 'history'>('rewards');

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <DashboardLayout title={t('points_title')} subtitle={t('points_subtitle')}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Points Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg<think>/20 rounded-xl">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <p className="text<think>/80 text-sm">{t('points_balance')}</p>
                  <p className="text-3xl font-bold">2,450</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text<think>/80">{t('points_tier')}</p>
                <p className="font-semibold">Gold</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text<think>/80">{t('points_next_tier')}</span>
                <span className="font-medium">550 / 3,000</span>
              </div>
              <div className="h-2 bg<think>/20 rounded-full overflow-hidden">
                <div className="h-full w-[82%] bg<think> rounded-full" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'rewards'
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {t('points_redeem')}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'history'
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {t('points_history')}
            </button>
          </div>

          {activeTab === 'rewards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg<think> dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${reward.color}`}>
                      <reward.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900 dark:text<think> mb-1">{reward.title}</h4>
                      <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm font-medium">{reward.points} {t('common_points')}</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text<think> rounded-lg text-xs font-medium transition-colors">
                      {t('points_redeem')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm divide-y divide-slate-100 dark:divide-slate-700">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      item.type === 'earn' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                      'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {item.type === 'earn' ? <TrendingUp className="h-4 w-4" /> : <Gift className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text<think>">{item.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.date}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.type === 'earn' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {item.points > 0 ? '+' : ''}{item.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <LoyaltyGamification />

          {/* Earn More */}
          <div className="bg<think> dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('points_earn_more')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Award className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text<think>">{t('common_book_hotel')}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">+100 {t('common_points')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Star className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text<think>">{t('common_write_review')}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">+50 {t('common_points')}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text<think>">{t('common_refer_friend')}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">+200 {t('common_points')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
