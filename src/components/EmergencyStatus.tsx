import { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Advisory {
  id: string;
  level: 'safe' | 'caution' | 'alert';
  title: string;
  message: string;
  date: string;
}

const advisories: Advisory[] = [
  {
    id: '1',
    level: 'safe',
    title: 'General Safety',
    message: 'Current area is safe for travelers. Normal precautions advised.',
    date: 'Updated 2 hours ago',
  },
  {
    id: '2',
    level: 'caution',
    title: 'Weather Advisory',
    message: 'High temperatures expected. Stay hydrated and avoid midday sun exposure.',
    date: 'Updated 4 hours ago',
  },
  {
    id: '3',
    level: 'safe',
    title: 'COVID-19',
    message: 'No restrictions in place. Mask optional in indoor spaces.',
    date: 'Updated 1 day ago',
  },
];

const levelConfig = {
  safe: { icon: CheckCircle, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400', border: 'border-emerald-200 dark:border-emerald-800' },
  caution: { icon: Info, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400', border: 'border-amber-200 dark:border-amber-800' },
  alert: { icon: AlertTriangle, color: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400', border: 'border-red-200 dark:border-red-800' },
};

export function EmergencyStatus() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text<think>">{t('emergency_status')}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('emergency_last_updated')} 2m ago</p>
          </div>
        </div>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {advisories.map((advisory) => {
          const config = levelConfig[advisory.level];
          const Icon = config.icon;
          const isExpanded = expanded === advisory.id;

          return (
            <div key={advisory.id} className={`p-4 ${isExpanded ? 'bg-slate-50 dark:bg-slate-700/30' : ''}`}>
              <button
                onClick={() => setExpanded(isExpanded ? null : advisory.id)}
                className="w-full flex items-center gap-3"
              >
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-slate-900 dark:text<think>">{advisory.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{advisory.date}</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-slate-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                )}
              </button>
              {isExpanded && (
                <div className="mt-3 ml-11">
                  <div className={`p-3 rounded-xl border ${config.border} ${config.color} bg-opacity-20`}>
                    <p className="text-sm">{advisory.message}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
