import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface EmergencyStatusProps {
  police: string;
  ambulance: string;
  countryName: string;
  flag: string;
}

export function EmergencyStatus({ police, ambulance, countryName, flag }: EmergencyStatusProps) {
  const { language } = useLanguage();

  return (
    <div className="card-premium p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-base font-bold text-navy-900">
            {language === 'ar' ? 'أرقام الطوارئ' : 'Emergency Numbers'}
          </h3>
          <p className="text-xs text-navy-400">{flag} {countryName}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          <CheckCircle className="h-3 w-3" />
          {language === 'ar' ? 'نشط' : 'Active'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: language === 'ar' ? 'الشرطة' : 'Police', number: police, color: 'border-navy-200 bg-navy-50', numColor: 'text-navy-700' },
          { label: language === 'ar' ? 'الإسعاف' : 'Ambulance', number: ambulance, color: 'border-red-200 bg-red-50', numColor: 'text-red-600' },
        ].map((item) => (
          <a
            key={item.label}
            href={`tel:${item.number}`}
            className={`flex flex-col items-center rounded-2xl border-2 ${item.color} p-4 transition hover:shadow-soft`}
          >
            <span className="text-xs font-bold text-navy-400 uppercase tracking-wide">{item.label}</span>
            <span className={`text-3xl font-black mt-1 ${item.numColor}`}>{item.number}</span>
            <span className="text-[10px] text-navy-400 mt-1">{language === 'ar' ? 'اضغط للاتصال' : 'Tap to call'}</span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
        <Clock className="h-4 w-4 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-amber-700 font-medium">
          {language === 'ar' ? 'متوفر على مدار الساعة 24/7' : 'Available 24/7 for emergencies'}
        </p>
      </div>
    </div>
  );
}
