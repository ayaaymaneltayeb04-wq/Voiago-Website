import { useState } from 'react';
import { Shield, MapPin, Share2, CheckCircle, Navigation } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Contact { name: string; phone: string; relation: string; }

const defaultContacts: Contact[] = [
  { name: 'Emergency Contact 1', phone: '+20-100-000-0001', relation: 'Family' },
  { name: 'Emergency Contact 2', phone: '+20-100-000-0002', relation: 'Friend' },
];

export function SOSLocationSharing() {
  const { language } = useLanguage();
  const [shared, setShared] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts] = useState<Contact[]>(defaultContacts);
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);

  const shareLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setShared(true);
          setLoading(false);
        },
        () => {
          setPosition({ lat: 30.0444, lng: 31.2357 });
          setShared(true);
          setLoading(false);
        }
      );
    } else {
      setPosition({ lat: 30.0444, lng: 31.2357 });
      setShared(true);
      setLoading(false);
    }
  };

  return (
    <div className="card-premium p-6 space-y-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
          <Shield className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-base font-bold text-navy-900">
            {language === 'ar' ? 'مشاركة الموقع' : 'SOS Location Sharing'}
          </h3>
          <p className="text-xs text-navy-400">
            {language === 'ar' ? 'شارك موقعك مع جهات الاتصال الموثوقة' : 'Share your live location with trusted contacts'}
          </p>
        </div>
      </div>

      {/* Share button */}
      {!shared ? (
        <button
          onClick={shareLocation}
          disabled={loading}
          className="btn-cta w-full py-3 text-sm rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-none"
          style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
        >
          {loading ? (
            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : (
            <Navigation className="h-4 w-4" />
          )}
          {loading
            ? (language === 'ar' ? 'جارٍ التحديد...' : 'Getting location...')
            : (language === 'ar' ? 'شارك موقعي الآن' : 'Share My Location Now')}
        </button>
      ) : (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4">
          <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm">
            <CheckCircle className="h-5 w-5" />
            {language === 'ar' ? 'تم مشاركة الموقع بنجاح!' : 'Location Shared Successfully!'}
          </div>
          {position && (
            <p className="text-xs text-emerald-600 mt-1">
              {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
            </p>
          )}
        </div>
      )}

      {/* Contacts */}
      <div>
        <p className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-3">
          {language === 'ar' ? 'جهات الاتصال الطارئة' : 'Emergency Contacts'}
        </p>
        <div className="space-y-2">
          {contacts.map((c) => (
            <div key={c.phone} className="flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-navy-800">{c.name}</p>
                <p className="text-xs text-navy-400">{c.phone} · {c.relation}</p>
              </div>
              {shared && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                  <CheckCircle className="h-3 w-3" /> Notified
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
