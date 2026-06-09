import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AlertTriangle, Phone, Share2, MapPin, Shield, Clock, ChevronRight, Siren, Stethoscope, Building2 } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { EmergencyStatus } from '../components/EmergencyStatus';
import { SafetyMap } from '../components/SafetyMap';
import { SOSLocationSharing } from '../components/SOSLocationSharing';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/emergency')({
  head: () => ({ meta: [{ title: 'Emergency — Voiago' }] }),
  component: EmergencyPage,
});

const emergencyContacts = [
  { id: 'police', label: 'Local Police', number: '122', icon: Siren, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: 'ambulance', label: 'Ambulance', number: '123', icon: Stethoscope, color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' },
  { id: 'embassy', label: 'Embassy', number: '+20-2-2797-3000', icon: Building2, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
];

export function EmergencyPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showSOS, setShowSOS] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'map' | 'contacts'>('status');

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <DashboardLayout title={t('emergency_title')} subtitle={t('emergency_subtitle')}>
      {/* SOS Hero */}
      <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-2xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">{t('emergency_sos')}</h3>
            <p className="text<think>/80 text-sm">{t('emergency_sos_desc')}</p>
          </div>
          <button
            onClick={() => setShowSOS(!showSOS)}
            className="flex items-center gap-2 px-6 py-3 bg<think>/20 hover:bg<think>/30 rounded-xl font-medium transition-colors"
          >
            <AlertTriangle className="h-5 w-5" />
            {showSOS ? t('common_close') : t('common_activate')}
          </button>
        </div>
        {showSOS && (
          <div className="mt-4 p-4 bg<think>/10 rounded-xl">
            <SOSLocationSharing />
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['status', 'map', 'contacts'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {tab === 'status' ? t('emergency_status') : tab === 'map' ? t('emergency_safety_map') : t('emergency_contacts')}
          </button>
        ))}
      </div>

      {activeTab === 'status' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EmergencyStatus />
          </div>
          <div className="space-y-4">
            {/* Quick Contacts */}
            <div className="bg<think> dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('emergency_contacts')}</h3>
              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.id}
                    href={`tel:${contact.number}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className={`p-2.5 rounded-xl ${contact.color}`}>
                      <contact.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text<think>">{contact.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{contact.number}</p>
                    </div>
                    <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Share Location */}
            <div className="bg<think> dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text<think> mb-4">{t('emergency_share_location')}</h3>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl font-medium transition-colors">
                <Share2 className="h-5 w-5" />
                {t('emergency_share_location')}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'map' && (
        <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <SafetyMap />
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.id}
              href={`tel:${contact.number}`}
              className="flex items-center gap-4 p-6 bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${contact.color}`}>
                <contact.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text<think>">{contact.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{contact.number}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </a>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
