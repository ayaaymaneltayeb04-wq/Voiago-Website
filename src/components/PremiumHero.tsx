import { useState } from 'react';
import { Search, MapPin, Plane, Hotel, Compass, ArrowRight, Star, Globe2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface PremiumHeroProps {
  onSearch?: (query: string) => void;
}

const heroImages = [
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=90',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1800&q=90',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=90',
];

const stats = [
  { value: '2M+', label: 'Happy Travelers' },
  { value: '190+', label: 'Countries' },
  { value: '500+', label: 'Airlines' },
  { value: '4.9★', label: 'App Rating' },
];

const popularSearches = [
  { icon: '🏝️', label: 'Maldives' },
  { icon: '🗼', label: 'Paris' },
  { icon: '🌃', label: 'Dubai' },
  { icon: '🏯', label: 'Kyoto' },
  { icon: '🌋', label: 'Bali' },
];

export function PremiumHero({ onSearch }: PremiumHeroProps) {
  const { language, isRtl } = useLanguage();
  const [activeTab, setActiveTab] = useState<'flights' | 'stays' | 'explore'>('flights');
  const [query, setQuery] = useState('');

  const tabs = [
    { id: 'flights' as const, label: language === 'ar' ? 'رحلات جوية' : 'Flights', icon: Plane },
    { id: 'stays' as const, label: language === 'ar' ? 'إقامة' : 'Stays', icon: Hotel },
    { id: 'explore' as const, label: language === 'ar' ? 'استكشف' : 'Explore', icon: Compass },
  ];

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImages[0]}
          alt="Travel destination"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 hero-overlay" />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-azure-500/10 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl animate-float animate-delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center pt-28 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-azure-400/30 bg-white/10 px-4 py-1.5 text-xs font-semibold text-azure-200 backdrop-blur-sm mb-8 animate-fade-up">
          <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
          {language === 'ar' ? 'منصة السفر الأفضل في المنطقة' : "Rated #1 Travel Platform in the Region"}
          <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-black text-white sm:text-6xl lg:text-7xl tracking-tight leading-tight animate-fade-up animate-delay-100">
          {language === 'ar' ? (
            <>اكتشف العالم <span className="text-gradient-orange">بأسلوب فاخر</span></>
          ) : (
            <>Discover the World <br /><span className="text-gradient-orange">in Premium Style</span></>
          )}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-azure-100/80 leading-relaxed animate-fade-up animate-delay-200">
          {language === 'ar'
            ? 'خطط، احجز، واستمتع — كل ما تحتاجه للسفر المثالي في مكان واحد، مدعوم بالذكاء الاصطناعي.'
            : 'Plan, book, and experience — everything you need for perfect travel, powered by AI and crafted for you.'}
        </p>

        {/* Search Box */}
        <div className="mt-10 mx-auto max-w-3xl animate-fade-up animate-delay-300">
          {/* Tabs */}
          <div className="flex justify-center gap-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-glow-orange'
                    : 'bg-white/15 text-white/80 hover:bg-white/25 backdrop-blur-sm'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search input row */}
          <div className="flex items-center rounded-2xl bg-white/95 p-2 shadow-deep backdrop-blur-md gap-2">
            <div className="flex flex-1 items-center gap-3 px-4">
              <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch?.(query)}
                placeholder={
                  language === 'ar' ? 'إلى أين تريد الذهاب؟' :
                  activeTab === 'flights' ? 'Where are you flying to?' :
                  activeTab === 'stays' ? 'Where are you staying?' : 'Discover a destination...'
                }
                className="flex-1 bg-transparent text-sm font-medium text-navy-900 placeholder-navy-400 outline-none"
                dir={isRtl ? 'rtl' : 'ltr'}
              />
            </div>
            <div className="hidden h-8 w-px bg-navy-100 sm:block" />
            <div className="hidden items-center gap-3 px-4 sm:flex">
              <Globe2 className="h-4 w-4 text-navy-400" />
              <span className="text-sm text-navy-400">{language === 'ar' ? 'أي وقت' : 'Any time'}</span>
            </div>
            <button
              onClick={() => onSearch?.(query)}
              className="btn-cta px-6 py-3 text-sm rounded-xl"
            >
              <Search className="h-4 w-4" />
              {language === 'ar' ? 'بحث' : 'Search'}
            </button>
          </div>

          {/* Popular searches */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-white/50">{language === 'ar' ? 'الأكثر بحثاً:' : 'Trending:'}</span>
            {popularSearches.map((s) => (
              <button
                key={s.label}
                onClick={() => { setQuery(s.label); onSearch?.(s.label); }}
                className="flex items-center gap-1 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-white/80 hover:bg-white/20 transition backdrop-blur-sm border border-white/10"
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up animate-delay-400">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-black text-white">{s.value}</p>
              <p className="text-xs text-azure-200/70 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-float">
        <div className="h-10 w-6 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
          <div className="h-2 w-1 rounded-full bg-white/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
