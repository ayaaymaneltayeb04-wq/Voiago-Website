import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { BarChart3, TrendingUp, Star, DollarSign } from 'lucide-react';

export const Route = createFileRoute('/partner-dashboard')({
  head: () => ({ meta: [{ title: 'Partner Hub — Voiago' }] }),
  component: PartnerDashboardPage,
});

function PartnerDashboardPage() {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  return (
    <DashboardLayout title={t('partner_dashboard.title')} subtitle={`${t('partner_dashboard.subtitle')} — ${user?.name ?? 'Partner'}`}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: t('dashboard.total_bookings'), value: '148', sub: t('dashboard.this_month'), icon: BarChart3, color: 'bg-azure-50 text-azure-600' },
          { label: t('dashboard.net_revenue'), value: '$28,400', sub: t('dashboard.generated'), icon: DollarSign, color: 'bg-emerald-50 text-emerald-700' },
          { label: t('dashboard.commission_rate'), value: '12%', sub: language === 'ar' ? 'المعدل الحالي' : 'Current rate', icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
          { label: t('dashboard.guest_satisfaction'), value: '4.9', sub: t('dashboard.out_of_five'), icon: Star, color: 'bg-amber-50 text-amber-600' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-navy-900">{s.value}</p>
            <div>
              <p className="text-xs font-bold text-navy-700">{s.label}</p>
              <p className="text-[10px] text-navy-400">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card-premium p-6">
        <h3 className="text-sm font-bold text-navy-800 mb-4">{t('partner_dashboard.analytics')}</h3>
        <div className="flex items-center justify-center h-40 text-navy-300">
          <div className="text-center">
            <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">{language === 'ar' ? 'التحليلات التفصيلية قادمة قريباً' : 'Detailed analytics coming soon'}</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
