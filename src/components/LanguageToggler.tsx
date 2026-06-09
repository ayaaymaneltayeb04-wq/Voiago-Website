import { Globe, Languages } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

export function LanguageToggler() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center gap-1.5 rounded-xl border border-navy-200 bg-white px-3 py-1.5 text-xs font-semibold text-navy-700 shadow-sm transition hover:border-azure-400 hover:text-azure-600 hover:shadow-glow-azure"
      title="Toggle Language"
    >
      <Languages className="h-3.5 w-3.5" />
      {language === 'en' ? 'عربي' : 'English'}
    </button>
  );
}
