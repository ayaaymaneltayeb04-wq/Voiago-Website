import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export interface Country {
  code: string;
  name: string;
  flag: string;
  police: string;
  ambulance: string;
  timezone: string;
}

const countries: Country[] = [
  { code: 'EG', name: 'Egypt',       flag: '🇪🇬', police: '122', ambulance: '123', timezone: 'EET (UTC+2)' },
  { code: 'AE', name: 'UAE',         flag: '🇦🇪', police: '999', ambulance: '998', timezone: 'GST (UTC+4)' },
  { code: 'SA', name: 'Saudi Arabia',flag: '🇸🇦', police: '999', ambulance: '911', timezone: 'AST (UTC+3)' },
  { code: 'US', name: 'USA',         flag: '🇺🇸', police: '911', ambulance: '911', timezone: 'EST/PST' },
  { code: 'GB', name: 'UK',          flag: '🇬🇧', police: '999', ambulance: '999', timezone: 'GMT (UTC+0)' },
  { code: 'FR', name: 'France',      flag: '🇫🇷', police: '17',  ambulance: '15',  timezone: 'CET (UTC+1)' },
  { code: 'JP', name: 'Japan',       flag: '🇯🇵', police: '110', ambulance: '119', timezone: 'JST (UTC+9)' },
  { code: 'AU', name: 'Australia',   flag: '🇦🇺', police: '000', ambulance: '000', timezone: 'AEST (UTC+10)' },
];

interface CountrySelectorProps {
  selected: Country;
  onSelect: (country: Country) => void;
}

export function CountrySelector({ selected, onSelect }: CountrySelectorProps) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="card-premium p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-navy-400 mb-3">
        {language === 'ar' ? 'اختر الدولة' : 'Select Country'}
      </p>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex w-full items-center justify-between rounded-xl border border-navy-200 bg-navy-50 px-4 py-3 text-sm font-semibold text-navy-800 hover:border-azure-400 transition"
        >
          <span className="flex items-center gap-2">
            <span className="text-xl">{selected.flag}</span>
            {selected.name}
          </span>
          <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-2xl border border-navy-100 bg-white shadow-float overflow-hidden">
            {countries.map((c) => (
              <button
                key={c.code}
                onClick={() => { onSelect(c); setOpen(false); }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm text-navy-700 hover:bg-azure-50 transition ${c.code === selected.code ? 'bg-azure-50 font-semibold text-azure-700' : ''}`}
              >
                <span className="text-lg">{c.flag}</span>
                <span className="flex-1 text-left">{c.name}</span>
                <span className="text-xs text-navy-400">{c.timezone}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
