import { useState, useEffect } from 'react';
import { Share2, MapPin, Clock, Users, AlertTriangle, CheckCircle, Phone, Copy, X } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

const emergencyContacts: Contact[] = [
  { id: '1', name: 'Sarah Ahmed', phone: '+20 100 123 4567', relation: 'Sister' },
  { id: '2', name: 'Mohamed Ali', phone: '+20 111 987 6543', relation: 'Friend' },
  { id: '3', name: 'Voiago Support', phone: '+20 2 2797 3000', relation: 'Support' },
];

export function SOSLocationSharing() {
  const { t } = useLanguage();
  const [sharing, setSharing] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [shared, setShared] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    if (sharing && countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (sharing && countdown === 0) {
      setShared(true);
      setSharing(false);
    }
  }, [sharing, countdown]);

  const startSharing = () => {
    setSharing(true);
    setCountdown(5);
    setShared(false);
    // Mock location
    setLocation({ lat: 28.5, lng: 34.5 });
  };

  const copyLocation = () => {
    if (location) {
      navigator.clipboard.writeText(`${location.lat}, ${location.lng}`);
    }
  };

  return (
    <div className="space-y-4">
      {!sharing && !shared && (
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-3" />
          <h4 className="font-semibold text-slate-900 dark:text<think> mb-2">{t('emergency_sos')}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            {t('emergency_sos_desc')}
          </p>
          <button
            onClick={startSharing}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text<think> rounded-xl font-medium transition-colors"
          >
            {t('common_activate')} SOS
          </button>
        </div>
      )}

      {sharing && (
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-2 bg-red-500 rounded-full animate-ping opacity-40 delay-150" />
            <div className="absolute inset-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text<think>">{countdown}</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t('common_sharing_location_in')} {countdown}...
          </p>
          <button
            onClick={() => { setSharing(false); setCountdown(5); }}
            className="mt-3 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline"
          >
            {t('common_cancel')}
          </button>
        </div>
      )}

      {shared && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{t('common_location_shared')}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{t('common_contacts_notified')}</p>
            </div>
          </div>

          {location && (
            <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </span>
                </div>
                <button
                  onClick={copyLocation}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title={t('common_copy')}
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              <div className="h-32 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center">
                <MapPin className="h-8 w-8 text-slate-400" />
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => setShowContacts(!showContacts)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <Users className="h-4 w-4" />
              {t('emergency_contacts')}
            </button>
            <button
              onClick={startSharing}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              {t('common_share_again')}
            </button>
          </div>

          {showContacts && (
            <div className="space-y-2">
              {emergencyContacts.map((contact) => (
                <a
                  key={contact.id}
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                    <Phone className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text<think>">{contact.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{contact.relation}</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{contact.phone}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
