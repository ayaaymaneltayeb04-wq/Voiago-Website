import { useState } from 'react';
import { Building2, Globe, TrendingUp, Users, CheckCircle, Send, BarChart3 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const stats = [
  { label: 'Global Reach', value: '150K+', sub: 'Partner Properties', icon: Globe, color: 'text-azure-600 bg-azure-50' },
  { label: 'Active Travelers', value: '2.5M+', sub: 'Monthly Users', icon: Users, color: 'text-orange-600 bg-orange-50' },
  { label: 'Partner Growth', value: '45%', sub: 'YoY Rate', icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
  { label: 'Avg Commission', value: '12%', sub: 'Per booking', icon: BarChart3, color: 'text-navy-600 bg-navy-50' },
];

const benefits = [
  'Advanced analytics dashboard to track bookings in real-time',
  'Dedicated partner success manager',
  'Marketing co-op fund for promotions',
  '24/7 priority support',
  'Multi-language booking interface (15+ languages)',
  'Flexible commission structure',
];

const serviceTypes = [
  { value: 'hotel', label: 'Hotel & Accommodation' },
  { value: 'airline', label: 'Airline & Transportation' },
  { value: 'experience', label: 'Experience & Activity' },
  { value: 'dining', label: 'Dining & Restaurant' },
  { value: 'other', label: 'Other Service' },
];

export default function PartnerPortal() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState({ name: '', service: 'hotel', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: '', service: 'hotel', email: '' }); }, 4000);
  };

  return (
    <section id="partners" className="py-24 bg-section-alt">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="section-label">{language === 'ar' ? 'برنامج الشراكة' : 'Partner Program'}</p>
          <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {t('partner.title')}
          </h2>
          <p className="mt-4 text-navy-500">{t('partner.subtitle')}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {stats.map((s) => (
            <div key={s.label} className="stat-card text-center items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-black text-navy-900">{s.value}</p>
              <div className="text-center">
                <p className="text-xs font-bold text-navy-700">{s.label}</p>
                <p className="text-[10px] text-navy-400">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Benefits */}
          <div>
            <h3 className="text-xl font-bold text-navy-900 mb-6">
              {language === 'ar' ? 'ما تحصل عليه كشريك' : 'What You Get as a Partner'}
            </h3>
            <div className="space-y-3 mb-8">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-navy-700">{b}</span>
                </div>
              ))}
            </div>

            {/* Commission model visual */}
            <div className="card-premium p-5">
              <h4 className="text-sm font-bold text-navy-800 mb-4">
                {language === 'ar' ? 'هيكل العمولة' : 'Commission Model'}
              </h4>
              <div className="space-y-3">
                {[
                  { tier: 'Starter', range: '0–10 bookings/mo', commission: '8%', color: 'bg-azure-500' },
                  { tier: 'Growth', range: '11–50 bookings/mo', commission: '10%', color: 'bg-orange-500' },
                  { tier: 'Premium', range: '50+ bookings/mo', commission: '12%+', color: 'bg-emerald-500' },
                ].map((row) => (
                  <div key={row.tier} className="flex items-center gap-3">
                    <div className={`h-2 rounded-full flex-1 ${row.color}`} />
                    <div className="flex items-center gap-2 w-48">
                      <span className="text-xs font-bold text-navy-800 w-16">{row.tier}</span>
                      <span className="text-[10px] text-navy-400">{row.range}</span>
                    </div>
                    <span className="text-sm font-black text-orange-600 w-10 text-right">{row.commission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration form */}
          <div className="card-premium p-7" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <h3 className="text-xl font-bold text-navy-900 mb-1">{t('partner.form_title')}</h3>
            <p className="text-sm text-navy-400 mb-6">{t('partner.form_subtitle')}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('partner.business_name')}</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t('partner.business_name_placeholder')}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('partner.service_type')}</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="input-field"
                >
                  {serviceTypes.map((s) => (
                    <option key={s.value} value={s.value}>{t(`partner.${s.value}`) || s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('partner.email')}</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t('partner.email_placeholder')}
                  className="input-field"
                />
              </div>

              <button type="submit" className="btn-cta w-full py-3.5 text-sm">
                <Send className="h-4 w-4" />
                {submitted ? t('partner.submitted') : t('partner.submit')}
              </button>

              {submitted && (
                <div className="toast-success flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  {language === 'ar' ? 'تم إرسال طلبك! سنتواصل معك خلال 24 ساعة.' : "Application submitted! We'll reach out within 24 hours."}
                </div>
              )}

              <p className="text-[10px] text-navy-400 text-center">{t('partner.terms')}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
