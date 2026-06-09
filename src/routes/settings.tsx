import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { User, Bell, Shield, Globe, DollarSign, Camera, Save, Check } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/settings')({
  head: () => ({ meta: [{ title: 'Settings — Voiago' }] }),
  component: SettingsPage,
});

type TabType = 'profile' | 'notifications' | 'privacy' | 'language' | 'currency';

export function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+20 100 123 4567',
    bio: 'Adventure seeker and digital nomad. Love exploring hidden gems.',
  });

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs: { id: TabType; label: string; icon: typeof User }[] = [
    { id: 'profile', label: t('settings_profile'), icon: User },
    { id: 'notifications', label: t('settings_notifications'), icon: Bell },
    { id: 'privacy', label: t('settings_privacy'), icon: Shield },
    { id: 'language', label: t('settings_language'), icon: Globe },
    { id: 'currency', label: t('settings_currency'), icon: DollarSign },
  ];

  return (
    <DashboardLayout title={t('settings_title')} subtitle={t('settings_subtitle')}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-6 p-2">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                  <User className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
              )}
              <div>
                <p className="font-medium text-slate-900 dark:text<think>">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full object-cover" />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center">
                        <User className="h-10 w-10 text-teal-600 dark:text-teal-400" />
                      </div>
                    )}
                    <button className="absolute -bottom-1 -right-1 p-1.5 bg-teal-600 text<think> rounded-full shadow-sm hover:bg-teal-700 transition-colors">
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text<think>">{t('settings_profile')}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('settings_profile_desc')}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('settings_name')}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('settings_email')}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('settings_phone')}</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t('settings_bio')}</label>
                    <textarea
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('settings_notifications')}</h3>
                {[
                  { id: 'flight', label: t('notif_flight_reminder'), desc: t('notif_flight_desc') },
                  { id: 'checkin', label: t('notif_check_in'), desc: t('notif_checkin_desc') },
                  { id: 'safety', label: t('notif_safety_alert'), desc: t('notif_safety_desc') },
                  { id: 'points', label: t('notif_points_earned'), desc: t('notif_points_desc') },
                  { id: 'promo', label: t('notif_promo'), desc: t('notif_promo_desc') },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 dark:text<think>">{item.label}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <Toggle defaultOn />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('settings_privacy')}</h3>
                {[
                  { id: 'location', label: t('privacy_location'), desc: t('privacy_location_desc') },
                  { id: 'profile', label: t('privacy_profile'), desc: t('privacy_profile_desc') },
                  { id: 'data', label: t('privacy_data'), desc: t('privacy_data_desc') },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-slate-900 dark:text<think>">{item.label}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <Toggle defaultOn={item.id === 'location'} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'language' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('settings_language')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      language === 'en'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <p className="text-2xl mb-2">🇺🇸</p>
                    <p className="font-medium text-slate-900 dark:text<think>">English</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('common_english')}</p>
                  </button>
                  <button
                    onClick={() => setLanguage('ar')}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      language === 'ar'
                        ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                    }`}
                  >
                    <p className="text-2xl mb-2">🇸🇦</p>
                    <p className="font-medium text-slate-900 dark:text<think>">العربية</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{t('common_arabic')}</p>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'currency' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('settings_currency')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['USD', 'EUR', 'GBP', 'EGP', 'AED', 'SAR'].map((curr) => (
                    <button
                      key={curr}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-teal-500 dark:hover:border-teal-500 transition-colors text-center"
                    >
                      <p className="font-medium text-slate-900 dark:text<think>">{curr}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
              <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors">
                {t('settings_cancel')}
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors"
              >
                {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {saved ? t('common_saved') : t('settings_save')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        on ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-600'
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-4 h-4 bg<think> rounded-full transition-transform ${
          on ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}
