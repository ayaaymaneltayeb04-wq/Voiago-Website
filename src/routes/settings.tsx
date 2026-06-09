import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { User, Bell, Settings, Shield, CreditCard, Camera, Save, Check } from 'lucide-react';

export const Route = createFileRoute('/settings')({
  head: () => ({ meta: [{ title: 'Settings — Voiago' }] }),
  component: SettingsPage,
});

type Tab = 'profile' | 'notifications' | 'preferences' | 'security' | 'subscription';

const tabs: { id: Tab; icon: typeof User; labelKey: string }[] = [
  { id: 'profile', icon: User, labelKey: 'settings.profile' },
  { id: 'notifications', icon: Bell, labelKey: 'settings.notifications' },
  { id: 'preferences', icon: Settings, labelKey: 'settings.preferences' },
  { id: 'security', icon: Shield, labelKey: 'settings.security' },
  { id: 'subscription', icon: CreditCard, labelKey: 'settings.subscription' },
];

function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, updatePreferences } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState(false);

  const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] ?? '');
  const [lastName, setLastName] = useState(user?.name?.split(' ')[1] ?? '');
  const [currency, setCurrency] = useState(user?.preferredCurrency ?? 'USD');
  const [notifs, setNotifs] = useState({ bookings: true, reminders: true, deals: false, newsletter: true });

  const save = () => {
    updatePreferences(currency, language as 'en' | 'ar');
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout title={t('settings.title')} subtitle={t('settings.subtitle')}>
      <div className="grid lg:grid-cols-4 gap-5">
        {/* Sidebar tabs */}
        <div className="card-premium p-3 lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sidebar-link w-full text-left ${activeTab === tab.id ? 'active' : ''}`}
              >
                <tab.icon className="h-4 w-4" />
                {t(tab.labelKey)}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3 card-premium p-7">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-6">{t('settings.profile')}</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-black">
                    {firstName[0] ?? 'V'}
                  </div>
                  <button className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-navy-900 text-white hover:bg-orange-500 transition">
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <p className="text-base font-bold text-navy-900">{firstName} {lastName}</p>
                  <p className="text-sm text-navy-400">{user?.email}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.first_name')}</label><input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="input-field" /></div>
                <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.last_name')}</label><input value={lastName} onChange={(e) => setLastName(e.target.value)} className="input-field" /></div>
                <div className="sm:col-span-2"><label className="block text-xs font-bold text-navy-500 mb-1.5">Email</label><input value={user?.email ?? ''} readOnly className="input-field bg-navy-50 cursor-not-allowed" /></div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-6">{t('settings.notifications')}</h3>
              <div className="space-y-4">
                {[
                  { key: 'bookings' as const, label: t('settings.booking_confirmations') },
                  { key: 'reminders' as const, label: t('settings.trip_reminders') },
                  { key: 'deals' as const, label: t('settings.personalized_deals') },
                  { key: 'newsletter' as const, label: t('settings.newsletter') },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between rounded-xl bg-navy-50 px-5 py-4 cursor-pointer hover:bg-azure-50 transition">
                    <span className="text-sm font-medium text-navy-800">{item.label}</span>
                    <div
                      onClick={() => setNotifs((p) => ({ ...p, [item.key]: !p[item.key] }))}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notifs[item.key] ? 'bg-orange-500' : 'bg-navy-200'}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notifs[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-6">{t('settings.preferences')}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.currency')}</label>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-field">
                    {['USD', 'EUR', 'EGP', 'SAR', 'AED', 'GBP'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.language')}</label>
                  <div className="flex gap-2">
                    {[{ id: 'en', label: 'English' }, { id: 'ar', label: 'العربية' }].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setLanguage(l.id as 'en' | 'ar')}
                        className={`flex-1 rounded-xl py-3 text-sm font-semibold border transition ${language === l.id ? 'bg-navy-900 text-white border-navy-900' : 'border-navy-200 text-navy-600 hover:border-navy-400'}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-6">{t('settings.security')}</h3>
              <div className="space-y-4">
                <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.current_password')}</label><input type="password" className="input-field" placeholder="••••••••" /></div>
                <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.new_password')}</label><input type="password" className="input-field" placeholder="••••••••" /></div>
                <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('settings.confirm_password')}</label><input type="password" className="input-field" placeholder="••••••••" /></div>
                <button className="btn-navy px-6 py-3 text-sm">{t('settings.update_password')}</button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div>
              <h3 className="text-base font-bold text-navy-900 mb-6">{t('settings.subscription')}</h3>
              <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-navy-700 p-6 text-white mb-5">
                <p className="text-xs font-bold uppercase tracking-widest text-azure-300/70 mb-1">{t('settings.current_plan')}</p>
                <p className="text-2xl font-black">Explorer (Free)</p>
                <p className="text-sm text-white/60 mt-1">Upgrade to unlock member deals & concierge.</p>
              </div>
              <div className="flex gap-3">
                <button className="btn-cta px-6 py-3 text-sm">{language === 'ar' ? 'ترقية للبريميوم' : 'Upgrade to Premium'}</button>
                <button className="rounded-xl border border-navy-200 px-5 py-3 text-sm font-medium text-navy-600 hover:border-navy-400 transition">{t('settings.cancel')}</button>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="mt-8 flex justify-end">
            <button onClick={save} className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition ${saved ? 'bg-emerald-500 text-white' : 'btn-navy text-white'}`}>
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {saved ? (language === 'ar' ? 'تم الحفظ!' : 'Saved!') : t('settings.save_changes')}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
