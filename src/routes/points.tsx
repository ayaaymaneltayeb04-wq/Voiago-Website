import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { LoyaltyGamification } from '../components/LoyaltyGamification';
import { TravelGuidesGrid } from '../components/TravelGuidesGrid';
import { useLanguage } from '../lib/LanguageContext';
import { Gift, Star } from 'lucide-react';

export const Route = createFileRoute('/points')({
  head: () => ({ meta: [{ title: 'Loyalty & Rewards — Voiago' }] }),
  component: PointsPage,
});

const rewards = [
  { points: 500,  title: 'Hotel Room Upgrade', desc: 'Upgrade to a premium room on your next stay.', icon: '🏨' },
  { points: 1000, title: 'Free Airport Lounge', desc: 'Access premium lounges at 100+ airports.', icon: '✈️' },
  { points: 1500, title: '$50 Travel Credit', desc: 'Apply to any Voiago booking.', icon: '💳' },
  { points: 200,  title: 'Priority Check-in', desc: 'Skip the queue at partner properties.', icon: '⭐' },
];

function PointsPage() {
  const { t, language } = useLanguage();

  return (
    <DashboardLayout title={t('points.title')} subtitle={t('points.subtitle')}>
      {/* Loyalty status */}
      <LoyaltyGamification />

      {/* Rewards store */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-5">
          <Gift className="h-5 w-5 text-orange-500" />
          <h2 className="text-base font-bold text-navy-900">{t('points.rewards_store')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((r) => (
            <div key={r.title} className="card-premium p-5 text-center hover:shadow-float transition-all">
              <span className="text-3xl block mb-3">{r.icon}</span>
              <p className="text-xs font-bold text-orange-500 mb-1">{r.points.toLocaleString()} pts</p>
              <h4 className="text-sm font-bold text-navy-900">{r.title}</h4>
              <p className="text-xs text-navy-400 mt-1 mb-4">{r.desc}</p>
              <button className="btn-navy w-full py-2 text-xs">
                {language === 'ar' ? 'استبدال' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Travel guides */}
      <div className="mt-8">
        <TravelGuidesGrid />
      </div>
    </DashboardLayout>
  );
}
