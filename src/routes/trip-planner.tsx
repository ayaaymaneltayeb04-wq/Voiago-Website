import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { useLanguage } from '../lib/LanguageContext';
import { MapPin, DollarSign, Calendar, Sparkles, TrendingUp } from 'lucide-react';

export const Route = createFileRoute('/trip-planner')({
  head: () => ({ meta: [{ title: 'Trip Planner — Voiago' }] }),
  component: TripPlanner,
});

interface Plan { flight: number; hotel: number; food: number; activities: number; misc: number; }

const budgetTips = [
  'Book 6–8 weeks ahead for the best fares.',
  'Travel light — pack neutrals you can mix and match.',
  'Leave one afternoon entirely unplanned — magic happens.',
  'Book accommodations with free cancellation for flexibility.',
];

function TripPlanner() {
  const { t, language } = useLanguage();
  const [dest, setDest] = useState('');
  const [budget, setBudget] = useState('');
  const [days, setDays] = useState('7');
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    const b = Number(budget) || 1000;
    setLoading(true);
    setTimeout(() => {
      setPlan({ flight: Math.round(b * 0.35), hotel: Math.round(b * 0.30), food: Math.round(b * 0.20), activities: Math.round(b * 0.10), misc: Math.round(b * 0.05) });
      setLoading(false);
    }, 800);
  };

  const breakdownRows = plan ? [
    { label: t('trip_planner.accommodation'), value: plan.hotel, color: 'bg-azure-500', pct: 30 },
    { label: t('trip_planner.food'), value: plan.food, color: 'bg-orange-500', pct: 20 },
    { label: t('trip_planner.transportation'), value: plan.flight, color: 'bg-navy-700', pct: 35 },
    { label: t('trip_planner.activities'), value: plan.activities, color: 'bg-emerald-500', pct: 10 },
    { label: t('trip_planner.miscellaneous'), value: plan.misc, color: 'bg-amber-500', pct: 5 },
  ] : [];

  return (
    <DashboardLayout title={t('trip_planner.title')} subtitle={t('trip_planner.subtitle')}>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input card */}
        <div className="card-premium p-7">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-50">
              <Sparkles className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="section-label">{language === 'ar' ? 'خطط بعناية' : 'Plan with intention'}</p>
              <h3 className="text-lg font-bold text-navy-900">{language === 'ar' ? 'إلى أين بعد؟' : 'Where to next?'}</h3>
            </div>
          </div>

          <div className="space-y-4">
            <Field icon={MapPin} label={t('trip_planner.destination')} value={dest} onChange={setDest} placeholder={t('trip_planner.destination_placeholder')} />
            <Field icon={DollarSign} label={t('trip_planner.budget')} value={budget} onChange={setBudget} placeholder={t('trip_planner.budget_placeholder')} type="number" />
            <Field icon={Calendar} label={t('trip_planner.days')} value={days} onChange={setDays} placeholder={t('trip_planner.days_placeholder')} type="number" />

            <button
              onClick={generate}
              disabled={loading}
              className="btn-cta w-full py-3.5 text-sm mt-2"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {loading ? (language === 'ar' ? 'جارٍ الإنشاء...' : 'Generating...') : t('trip_planner.plan_button')}
            </button>
          </div>
        </div>

        {/* Budget breakdown */}
        <div className="card-premium p-7">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-azure-500" />
            <h3 className="text-lg font-bold text-navy-900">{t('trip_planner.budget_breakdown')}</h3>
          </div>

          {plan ? (
            <div className="space-y-4">
              {breakdownRows.map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-navy-700">{row.label}</span>
                    <span className="font-bold text-navy-900">${row.value.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-navy-100 overflow-hidden">
                    <div className={`h-full rounded-full ${row.color} transition-all duration-700`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="rounded-2xl bg-navy-50 p-4 mt-4">
                <p className="text-sm text-navy-600">
                  {language === 'ar' ? `رحلة ${days} أيام${dest ? ` إلى ${dest}` : ''}` : `For a ${days}-day trip${dest ? ` to ${dest}` : ''}.`}
                </p>
                <p className="text-lg font-black text-navy-900 mt-1">${Number(budget || 1000).toLocaleString()} {language === 'ar' ? 'إجمالي الميزانية' : 'Total Budget'}</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Sparkles className="h-12 w-12 text-navy-100 mb-4" />
              <p className="text-sm text-navy-400">
                {language === 'ar' ? 'تفصيل ميزانيتك سيظهر هنا بعد الإنشاء.' : 'Your beautifully calculated breakdown will appear here.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="card-premium p-6 mt-5">
        <h3 className="text-sm font-bold text-navy-800 mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-orange-400" />
          {language === 'ar' ? 'نصائح لرحلة هادئة' : 'Tips for a serene journey'}
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {budgetTips.map((tip) => (
            <div key={tip} className="flex items-start gap-2.5 rounded-xl bg-azure-50 px-4 py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-azure-500 flex-shrink-0 mt-1.5" />
              <p className="text-xs text-azure-800">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = 'text' }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; value: string;
  onChange: (v: string) => void;
  placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-navy-500 mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="input-field pl-10" />
      </div>
    </div>
  );
}
