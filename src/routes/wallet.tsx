import { createFileRoute, Link } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { BudgetTracker } from '../components/BudgetTracker';
import { useLanguage } from '../lib/LanguageContext';
import { ArrowUpRight, Plus, FileText, Wallet, TrendingUp, Lightbulb } from 'lucide-react';

export const Route = createFileRoute('/wallet')({
  head: () => ({ meta: [{ title: 'Wallet — Voiago' }] }),
  component: WalletPage,
});

function WalletPage() {
  const { t, language } = useLanguage();

  return (
    <DashboardLayout title={t('wallet.title')} subtitle={t('wallet.subtitle')}>
      {/* Balance hero */}
      <div className="rounded-3xl bg-hero p-8 mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-azure-300/70 mb-2">
            {t('wallet.available_balance')}
          </p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-black text-white">$8,532</span>
            <span className="text-2xl font-bold text-white/60">.40</span>
          </div>
          <p className="text-sm text-azure-200/60">
            {language === 'ar' ? 'رصيدك في جميع العملات' : 'Balance across all currencies'}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: language === 'ar' ? 'إضافة رصيد' : 'Add Funds', icon: Plus, primary: true },
              { label: language === 'ar' ? 'تحويل' : 'Transfer', icon: ArrowUpRight, primary: false },
              { label: language === 'ar' ? 'الكشف' : 'Statement', icon: FileText, primary: false },
            ].map((action) => (
              <button
                key={action.label}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  action.primary ? 'btn-cta' : 'bg-white/15 text-white hover:bg-white/25 border border-white/20 backdrop-blur-sm'
                }`}
              >
                <action.icon className="h-4 w-4" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cashback + Smart Insights row */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="card-premium p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-navy-400">{t('wallet.cashback')}</p>
              <p className="text-2xl font-black text-navy-900">$125.50</p>
            </div>
          </div>
          <button className="btn-cta w-full py-2.5 text-xs">
            {language === 'ar' ? 'استرداد الكاش باك' : 'Redeem Cashback'}
          </button>
        </div>

        <div className="card-premium p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-orange-500" />
            <h3 className="text-sm font-bold text-navy-800">{t('wallet.smart_insights')}</h3>
          </div>
          <ul className="space-y-2">
            {[
              language === 'ar' ? 'احجز عبر الشركاء لـ 4.5% كاش باك فوري.' : 'Book via partner hotels for 4.5% instant cashback.',
              language === 'ar' ? 'ضبط حد للميزانية لتلقي تنبيهات فورية.' : 'Set a budget threshold to receive instant alerts.',
              language === 'ar' ? 'استخدم نقاطك لترقيات الغرف.' : 'Use your points for free hotel upgrades.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-navy-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Budget Tracker */}
      <BudgetTracker />
    </DashboardLayout>
  );
}
