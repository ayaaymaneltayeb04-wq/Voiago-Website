import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, Send, Filter, Download, CreditCard, Building2, UtensilsCrossed, Bus, ShoppingBag, HelpCircle } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { BudgetTracker } from '../components/BudgetTracker';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/wallet')({
  head: () => ({ meta: [{ title: 'Wallet — Voiago' }] }),
  component: WalletPage,
});

const transactions = [
  { id: '1', title: 'Boutique Hotel Cashback', amount: 45.20, date: '2026-06-08', category: 'accommodation', type: 'credit' as const },
  { id: '2', title: 'Eco-Tour Booking', amount: -120.00, date: '2026-06-07', category: 'activities', type: 'debit' as const },
  { id: '3', title: 'Voiago Reward Points', amount: 500, date: '2026-06-06', category: 'other', type: 'points' as const },
  { id: '4', title: 'Desert Camp Dinner', amount: -65.00, date: '2026-06-05', category: 'food', type: 'debit' as const },
  { id: '5', title: 'Airport Transfer', amount: -35.00, date: '2026-06-04', category: 'transport', type: 'debit' as const },
  { id: '6', title: 'Souvenir Shop', amount: -28.50, date: '2026-06-03', category: 'shopping', type: 'debit' as const },
];

const categoryIcons: Record<string, typeof CreditCard> = {
  accommodation: Building2,
  food: UtensilsCrossed,
  transport: Bus,
  activities: HelpCircle,
  shopping: ShoppingBag,
  other: CreditCard,
};

const categoryColors: Record<string, string> = {
  accommodation: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  food: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
  transport: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  activities: 'bg-teal-50 text-teal-600 dark:bg-teal-900/20 dark:text-teal-400',
  shopping: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
  other: 'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
};

type FilterType = 'all' | 'credits' | 'debits';

export function WalletPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [showAddFunds, setShowAddFunds] = useState(false);

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  const filtered = transactions.filter((tx) => {
    if (filter === 'credits') return tx.type === 'credit' || tx.type === 'points';
    if (filter === 'debits') return tx.type === 'debit';
    return true;
  });

  const balance = 1245.00;
  const totalSpent = Math.abs(transactions.filter((t) => t.type === 'debit').reduce((s, t) => s + t.amount, 0));

  return (
    <DashboardLayout title={t('wallet_title')} subtitle={t('wallet_subtitle')}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-teal-600 to-cyan-700 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Wallet className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-white/80 text-sm">{t('wallet_balance')}</p>
                  <p className="text-3xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAddFunds(!showAddFunds)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  {t('wallet_add_funds')}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
                  <Send className="h-4 w-4" />
                  {t('wallet_send')}
                </button>
              </div>
            </div>
            {showAddFunds && (
              <div className="mt-4 p-4 bg-white/10 rounded-xl">
                <p className="text-sm text-white/80 mb-3">{t('common_coming_soon')}</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white text-teal-700 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">$50</button>
                  <button className="px-4 py-2 bg-white text-teal-700 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">$100</button>
                  <button className="px-4 py-2 bg-white text-teal-700 rounded-lg text-sm font-medium hover:bg-white/90 transition-colors">$250</button>
                </div>
              </div>
            )}
          </div>

          {/* Transactions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">{t('wallet_transactions')}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex rounded-lg bg-slate-100 dark:bg-slate-700 p-1">
                    {(['all', 'credits', 'debits'] as FilterType[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          filter === f
                            ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-teal-400 shadow-sm'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                      >
                        {f === 'all' ? t('wallet_all') : f === 'credits' ? t('wallet_credits') : t('wallet_debits')}
                      </button>
                    ))}
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((tx) => {
                const Icon = categoryIcons[tx.category] || CreditCard;
                return (
                  <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className={`p-2.5 rounded-xl ${categoryColors[tx.category]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{tx.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{tx.date}</p>
                    </div>
                    <span className={`text-sm font-medium ${
                      tx.type === 'debit' ? 'text-red-600 dark:text-red-400' :
                      tx.type === 'points' ? 'text-amber-600 dark:text-amber-400' :
                      'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {tx.type === 'debit' ? '' : '+'}{tx.amount > 0 && tx.type !== 'points' ? '$' : ''}{Math.abs(tx.amount)}{tx.type === 'points' ? ' pts' : ''}
                    </span>
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                  <p>{t('wallet_no_transactions')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <BudgetTracker />

          {/* Spending Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">{t('wallet_expense_breakdown')}</h3>
            <div className="space-y-3">
              {[
                { label: t('wallet_category_accommodation'), amount: 450, color: 'bg-blue-500' },
                { label: t('wallet_category_food'), amount: 320, color: 'bg-orange-500' },
                { label: t('wallet_category_transport'), amount: 180, color: 'bg-purple-500' },
                { label: t('wallet_category_activities'), amount: 280, color: 'bg-teal-500' },
                { label: t('wallet_category_shopping'), amount: 150, color: 'bg-pink-500' },
                { label: t('wallet_category_other'), amount: 75, color: 'bg-slate-400' },
              ].map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-400">{cat.label}</span>
                    <span className="font-medium text-slate-900 dark:text-white">${cat.amount}</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${(cat.amount / totalSpent) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between">
              <span className="text-sm font-medium text-slate-900 dark:text-white">{t('common_total')}</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">${totalSpent.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
