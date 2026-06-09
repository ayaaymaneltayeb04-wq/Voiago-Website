import { MapPin, Building2, Hospital } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Location {
  type: 'embassy' | 'hospital';
  name: string;
  address: string;
  distance: string;
  phone: string;
  hours: string;
}

interface SafetyMapProps {
  locations: Location[];
  countryName: string;
}

export function SafetyMap({ locations, countryName }: SafetyMapProps) {
  const { language } = useLanguage();

  return (
    <div className="card-premium p-6">
      <div className="flex items-center gap-2 mb-5">
        <MapPin className="h-5 w-5 text-azure-500" />
        <h3 className="text-base font-bold text-navy-900">
          {language === 'ar' ? `خريطة الأمان — ${countryName}` : `Safety Map — ${countryName}`}
        </h3>
      </div>

      {/* Map placeholder */}
      <div className="relative h-48 rounded-2xl bg-gradient-to-br from-azure-50 to-navy-50 border border-azure-100 mb-5 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-azure-400 mx-auto mb-2" />
          <p className="text-sm text-navy-400 font-medium">{countryName}</p>
          <p className="text-xs text-navy-300">{language === 'ar' ? 'خريطة تفاعلية' : 'Interactive Safety Map'}</p>
        </div>
        {/* Decorative dots */}
        {[
          { top: '30%', left: '25%', color: 'bg-azure-500' },
          { top: '55%', left: '60%', color: 'bg-orange-500' },
          { top: '40%', left: '75%', color: 'bg-azure-500' },
        ].map((dot, i) => (
          <div
            key={i}
            className={`absolute h-3 w-3 rounded-full ${dot.color} animate-pulse-soft shadow-lg ring-2 ring-white`}
            style={{ top: dot.top, left: dot.left }}
          />
        ))}
      </div>

      {/* Location cards */}
      <div className="space-y-3">
        {locations.map((loc, i) => (
          <div key={i} className="flex gap-3 rounded-xl bg-navy-50 p-4 border border-navy-100">
            <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${loc.type === 'embassy' ? 'bg-navy-100 text-navy-700' : 'bg-red-50 text-red-500'}`}>
              {loc.type === 'embassy' ? <Building2 className="h-4 w-4" /> : <Hospital className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-navy-800">{loc.name}</p>
                <span className="text-[10px] font-bold text-azure-600 bg-azure-50 px-2 py-0.5 rounded-full whitespace-nowrap">{loc.distance}</span>
              </div>
              <p className="text-xs text-navy-400 mt-0.5">{loc.address}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <a href={`tel:${loc.phone}`} className="text-[11px] font-semibold text-orange-600 hover:underline">{loc.phone}</a>
                <span className="text-[11px] text-navy-400">{loc.hours}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
