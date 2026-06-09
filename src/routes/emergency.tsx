import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { CountrySelector, type Country } from '../components/CountrySelector';
import { EmergencyStatus } from '../components/EmergencyStatus';
import { SafetyMap } from '../components/SafetyMap';
import { SOSLocationSharing } from '../components/SOSLocationSharing';
import { useLanguage } from '../lib/LanguageContext';
import { Shield, AlertTriangle, BookOpen, Languages, CurrencyIcon } from 'lucide-react';

export const Route = createFileRoute('/emergency')({
  head: () => ({ meta: [{ title: 'Safety & Emergency Hub — Voiago' }] }),
  component: Emergency,
});

const locationData: Record<string, Array<{ type: 'embassy' | 'hospital'; name: string; address: string; distance: string; phone: string; hours: string }>> = {
  EG: [
    { type: 'embassy', name: 'US Embassy Cairo', address: '5 Tawfik Diab Street, Garden City, Cairo', distance: '3.2 km', phone: '+20-2-2797-3000', hours: '24/7 emergencies' },
    { type: 'hospital', name: 'Dar Al-Fouad Hospital', address: '6 Guido Moinetti Street, Zamalek', distance: '2.1 km', phone: '+20-2-2728-3000', hours: '24/7 Emergency' },
    { type: 'hospital', name: 'International Hospital Cairo', address: '151 Sphinx Square, Heliopolis', distance: '5.8 km', phone: '+20-2-2418-0080', hours: '24/7 Emergency' },
  ],
  AE: [
    { type: 'embassy', name: 'US Embassy Abu Dhabi', address: 'Mohammed bin Zayed Al Nahyan St, Abu Dhabi', distance: '4.5 km', phone: '+971-2-414-2200', hours: '24/7 emergencies' },
    { type: 'hospital', name: 'Cleveland Clinic Abu Dhabi', address: 'Al Mina Street, Abu Dhabi', distance: '2.8 km', phone: '+971-2-608-0000', hours: '24/7 Emergency' },
  ],
  US: [
    { type: 'embassy', name: 'State Department', address: '2201 C Street NW, Washington D.C.', distance: 'Local', phone: '+1-202-647-1512', hours: '24/7 emergencies' },
    { type: 'hospital', name: 'Johns Hopkins Hospital', address: '600 North Wolfe Street, Baltimore', distance: 'Call 911', phone: '+1-410-955-5000', hours: '24/7 Emergency' },
  ],
  GB: [
    { type: 'embassy', name: 'Egyptian Embassy London', address: '26 South Street, Mayfair, London', distance: '5.0 km', phone: '+44-20-7499-3304', hours: 'Mon–Fri 9–5' },
    { type: 'hospital', name: 'St. Thomas Hospital', address: 'Westminster Bridge Rd, London', distance: '3.2 km', phone: '+44-20-7188-7188', hours: '24/7 Emergency' },
  ],
};

const safetyTips = [
  'Always share your location with trusted contacts.',
  'Keep your phone charged and carry a power bank.',
  'Inform someone of your travel plans before departure.',
  'Register with your embassy before traveling.',
  'Keep copies of important documents in cloud storage.',
  'Have local emergency numbers saved offline.',
];

function Emergency() {
  const { t, language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<Country>({ code: 'EG', name: 'Egypt', flag: '🇪🇬', police: '122', ambulance: '123', timezone: 'EET (UTC+2)' });

  const locations = locationData[selectedCountry.code] ?? locationData.EG;

  return (
    <DashboardLayout title={t('emergency.title')} subtitle={t('emergency.subtitle')}>
      {/* Header banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 text-9xl select-none leading-none">🆘</div>
        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black">
              {language === 'ar' ? 'سلامتك أولويتنا' : 'Your Safety, Our Priority'}
            </h2>
            <p className="text-sm text-red-100 mt-0.5">
              {language === 'ar' ? 'وصول فوري لخدمات الطوارئ المحلية.' : 'Access localized emergency services and get immediate assistance.'}
            </p>
          </div>
        </div>
      </div>

      {/* Country Selector */}
      <CountrySelector selected={selectedCountry} onSelect={setSelectedCountry} />

      {/* Emergency numbers */}
      <div className="mt-4">
        <EmergencyStatus police={selectedCountry.police} ambulance={selectedCountry.ambulance} countryName={selectedCountry.name} flag={selectedCountry.flag} />
      </div>

      {/* 2-col layout */}
      <div className="mt-4 grid lg:grid-cols-2 gap-4">
        <SafetyMap locations={locations} countryName={selectedCountry.name} />

        {/* Tips + concierge */}
        <div className="space-y-4">
          <div className="card-premium p-6">
            <h3 className="text-sm font-bold text-navy-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              {t('emergency.safety_tips')}
            </h3>
            <ul className="space-y-2.5">
              {safetyTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2.5 text-sm text-navy-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-premium p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 mb-3">
              <Shield className="h-6 w-6 text-navy-700" />
            </div>
            <h4 className="text-sm font-bold text-navy-900">24/7 Voiago Support</h4>
            <p className="text-xs text-navy-400 mt-1 mb-4">Concierge team available around the clock</p>
            <a href="tel:+201000000000" className="btn-cta px-6 py-2.5 text-sm block">
              {language === 'ar' ? 'اتصل بالكونسيرج' : 'Call Concierge'}
            </a>
          </div>
        </div>
      </div>

      {/* SOS Location Sharing */}
      <div className="mt-4">
        <SOSLocationSharing />
      </div>

      {/* Additional resources */}
      <div className="mt-4 card-premium p-6">
        <h3 className="text-sm font-bold text-navy-800 mb-4">{language === 'ar' ? 'موارد إضافية' : 'Additional Resources'}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { icon: '⚠️', title: 'Travel Advisories', desc: 'Check current warnings' },
            { icon: '🛡️', title: 'Insurance Info', desc: 'Access travel insurance' },
            { icon: '📋', title: 'Medical Records', desc: 'Emergency medical info' },
            { icon: '📄', title: 'Document Backup', desc: 'Copies of documents' },
            { icon: '💱', title: 'Currency Converter', desc: 'Real-time exchange rates' },
            { icon: '🗣️', title: 'Translator', desc: 'Instant 50+ languages' },
          ].map((r) => (
            <div key={r.title} className="flex items-center gap-3 rounded-xl bg-navy-50 px-4 py-3 hover:bg-azure-50 transition cursor-pointer">
              <span className="text-xl flex-shrink-0">{r.icon}</span>
              <div>
                <p className="text-xs font-bold text-navy-800">{r.title}</p>
                <p className="text-[10px] text-navy-400">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
