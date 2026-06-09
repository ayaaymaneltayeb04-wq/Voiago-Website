import { useState } from 'react';
import { Star, Trophy, Award, Gift, ArrowUpRight, Zap } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const tiers = [
  { name: 'Bronze',   nameAr: 'برونز',   min: 0,    max: 999,   color: 'from-amber-700 to-amber-500',   icon: '🥉', benefits: ['5% cashback', 'Standard support', 'Basic deals'] },
  { name: 'Silver',   nameAr: 'فضي',     min: 1000, max: 4999,  color: 'from-slate-500 to-slate-400',   icon: '🥈', benefits: ['8% cashback', 'Priority support', 'Member deals'] },
  { name: 'Gold',     nameAr: 'ذهبي',    min: 5000, max: 14999, color: 'from-yellow-500 to-amber-400',  icon: '🥇', benefits: ['12% cashback', 'Concierge access', 'Lounge access'] },
  { name: 'Platinum', nameAr: 'بلاتيني', min: 15000,max: Infinity, color: 'from-navy-700 to-navy-500', icon: '💎', benefits: ['15% cashback', 'Dedicated manager', 'VIP everything'] },
];

const activities = [
  { action: 'Completed Dubai booking', points: +500, date: '2 days ago' },
  { action: 'Wrote a review', points: +50, date: '5 days ago' },
  { action: 'Referred a friend', points: +200, date: '1 week ago' },
  { action: 'Redeemed reward', points: -300, date: '2 weeks ago' },
];

export function LoyaltyGamification() {
  const { language } = useLanguage();
  const [points] = useState(6240);

  const currentTier = tiers.find((t) => points >= t.min && points <= t.max) ?? tiers[0];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progress = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <div className="space-y-5">
      {/* Current status hero */}
      <div className={`rounded-3xl p-6 bg-gradient-to-r ${currentTier.color} text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 text-6xl opacity-20 leading-none select-none">{currentTier.icon}</div>
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">
            {language === 'ar' ? 'مستواك الحالي' : 'Current Tier'}
          </p>
          <h3 className="text-3xl font-black">{language === 'ar' ? currentTier.nameAr : currentTier.name} Member</h3>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-black">{points.toLocaleString()}</span>
            <span className="text-white/70 font-medium">{language === 'ar' ? 'نقطة' : 'points'}</span>
          </div>

          {nextTier && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>{language === 'ar' ? 'التقدم نحو' : 'Progress to'} {nextTier.name}</span>
                <span>{(nextTier.min - points).toLocaleString()} pts to go</span>
              </div>
              <div className="h-2 rounded-full bg-white/20">
                <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tiers grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tiers.map((tier) => {
          const active = tier.name === currentTier.name;
          return (
            <div
              key={tier.name}
              className={`rounded-2xl p-4 border text-center transition ${active ? 'border-orange-300 bg-orange-50' : 'border-navy-100 bg-white'}`}
            >
              <span className="text-2xl">{tier.icon}</span>
              <p className={`text-sm font-bold mt-1 ${active ? 'text-orange-600' : 'text-navy-700'}`}>
                {language === 'ar' ? tier.nameAr : tier.name}
              </p>
              <p className="text-[10px] text-navy-400 mt-0.5">{tier.min.toLocaleString()}+ pts</p>
            </div>
          );
        })}
      </div>

      {/* Benefits */}
      <div className="card-premium p-5">
        <h4 className="text-sm font-bold text-navy-800 mb-3 flex items-center gap-2">
          <Award className="h-4 w-4 text-orange-500" />
          {language === 'ar' ? 'مزاياك الحالية' : 'Your Current Benefits'}
        </h4>
        <div className="grid sm:grid-cols-3 gap-2">
          {currentTier.benefits.map((b) => (
            <div key={b} className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2">
              <Zap className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
              <span className="text-xs font-medium text-emerald-800">{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="card-premium p-5">
        <h4 className="text-sm font-bold text-navy-800 mb-4 flex items-center gap-2">
          <Trophy className="h-4 w-4 text-azure-500" />
          {language === 'ar' ? 'النشاط الأخير' : 'Recent Activity'}
        </h4>
        <div className="space-y-2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-navy-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-navy-800">{a.action}</p>
                <p className="text-xs text-navy-400">{a.date}</p>
              </div>
              <span className={`text-sm font-bold ${a.points > 0 ? 'text-emerald-600' : 'text-orange-500'}`}>
                {a.points > 0 ? '+' : ''}{a.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
