import { useState } from 'react';
import { Trophy, Star, Zap, Target, Award, Crown, ChevronRight, Lock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Challenge {
  id: string;
  title: string;
  desc: string;
  points: number;
  icon: typeof Trophy;
  completed: boolean;
  progress: number;
  total: number;
}

const challenges: Challenge[] = [
  { id: '1', title: 'First Booking', desc: 'Complete your first booking on Voiago', points: 100, icon: CheckCircle, completed: true, progress: 1, total: 1 },
  { id: '2', title: 'Explorer', desc: 'Visit 3 different countries', points: 300, icon: Target, completed: false, progress: 2, total: 3 },
  { id: '3', title: 'Social Butterfly', desc: 'Refer 5 friends to Voiago', points: 500, icon: Zap, completed: false, progress: 3, total: 5 },
  { id: '4', title: 'Review Master', desc: 'Write 10 detailed reviews', points: 250, icon: Star, completed: false, progress: 7, total: 10 },
];

const tiers = [
  { id: 'bronze', name: 'Bronze', min: 0, color: 'bg-amber-700', icon: Award },
  { id: 'silver', name: 'Silver', min: 1000, color: 'bg-slate-400', icon: Trophy },
  { id: 'gold', name: 'Gold', min: 2500, color: 'bg-amber-500', icon: Crown },
  { id: 'platinum', name: 'Platinum', min: 5000, color: 'bg-cyan-500', icon: Star },
];

export function LoyaltyGamification() {
  const { t } = useLanguage();
  const [points] = useState(2450);
  const [activeTab, setActiveTab] = useState<'challenges' | 'tiers'>('challenges');

  const currentTier = tiers.slice().reverse().find((t) => points >= t.min) || tiers[0];
  const nextTier = tiers.find((t) => t.min > points);
  const progress = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text<think>">{t('points_earn_more')}</h3>
        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">{points.toLocaleString()}</span>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className={`p-2 rounded-xl ${currentTier.color} text<think>`}>
            <currentTier.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text<think>">{currentTier.name} {t('points_tier')}</p>
            {nextTier && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {(nextTier.min - points).toLocaleString()} {t('points_next_tier')}
              </p>
            )}
          </div>
        </div>
        <div className="h-2 bg-white dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'challenges'
              ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t('common_challenges')}
        </button>
        <button
          onClick={() => setActiveTab('tiers')}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'tiers'
              ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
          }`}
        >
          {t('common_tiers')}
        </button>
      </div>

      {activeTab === 'challenges' && (
        <div className="space-y-3">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-4 rounded-xl border transition-all ${
                challenge.completed
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  challenge.completed
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400'
                }`}>
                  {challenge.completed ? <CheckCircle className="h-5 w-5" /> : <challenge.icon className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${challenge.completed ? 'text-emerald-700 dark:text-emerald-300' : 'text-slate-900 dark:text<think>'}`}>
                      {challenge.title}
                    </p>
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">+{challenge.points}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{challenge.desc}</p>
                  {!challenge.completed && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 dark:text-slate-400">{t('common_progress')}</span>
                        <span className="text-slate-700 dark:text-slate-300">{challenge.progress}/{challenge.total}</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(challenge.progress / challenge.total) * 100}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tiers' && (
        <div className="space-y-3">
          {tiers.map((tier) => {
            const unlocked = points >= tier.min;
            return (
              <div
                key={tier.id}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  unlocked
                    ? 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                    : 'bg-slate-50/50 dark:bg-slate-700/20 border-slate-200/50 dark:border-slate-600/50 opacity-60'
                }`}
              >
                <div className={`p-2 rounded-lg ${tier.color} text<think>`}>
                  {unlocked ? <tier.icon className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text<think>">{tier.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{tier.min.toLocaleString()} {t('common_points')} {t('common_min')}</p>
                </div>
                {unlocked && <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
