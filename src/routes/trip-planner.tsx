import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { MapPin, Calendar, Users, DollarSign, Sparkles, Wand2, Save, Share2, Clock, Sun, Sunset, Moon, Loader2 } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/trip-planner')({
  head: () => ({ meta: [{ title: 'Trip Planner — Voiago' }] }),
  component: TripPlannerPage,
});

interface Activity {
  time: string;
  title: string;
  desc: string;
  icon: typeof Sun;
  cost: string;
}

interface DayPlan {
  day: number;
  date: string;
  activities: Activity[];
}

const generateMockItinerary = (destination: string): DayPlan[] => [
  {
    day: 1,
    date: 'Jun 15',
    activities: [
      { time: '09:00', title: 'Arrival & Check-in', desc: `Arrive at ${destination} airport, transfer to your eco-lodge.`, icon: Sun, cost: '$0' },
      { time: '14:00', title: 'Local Market Exploration', desc: 'Visit the vibrant local souk for spices, textiles, and crafts.', icon: Sun, cost: '$25' },
      { time: '19:00', title: 'Welcome Dinner', desc: 'Traditional cuisine at a family-run restaurant.', icon: Moon, cost: '$40' },
    ],
  },
  {
    day: 2,
    date: 'Jun 16',
    activities: [
      { time: '08:00', title: 'Guided Heritage Walk', desc: 'Explore ancient ruins and historical sites with a local archaeologist.', icon: Sun, cost: '$55' },
      { time: '13:00', title: 'Lunch by the Oasis', desc: 'Fresh farm-to-table meal at a desert oasis.', icon: Sun, cost: '$30' },
      { time: '17:00', title: 'Sunset Camel Trek', desc: 'Experience the golden hour from a camelback perspective.', icon: Sunset, cost: '$45' },
    ],
  },
  {
    day: 3,
    date: 'Jun 17',
    activities: [
      { time: '09:00', title: 'Snorkeling Adventure', desc: 'Discover vibrant coral reefs and marine life.', icon: Sun, cost: '$65' },
      { time: '15:00', title: 'Beach Relaxation', desc: 'Unwind at a secluded beach with refreshments.', icon: Sun, cost: '$15' },
      { time: '20:00', title: 'Stargazing Dinner', desc: 'Astronomy-guided dinner under the desert sky.', icon: Moon, cost: '$50' },
    ],
  },
];

export function TripPlannerPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [budget, setBudget] = useState('medium');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<DayPlan[] | null>(null);

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  const togglePreference = (pref: string) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleGenerate = async () => {
    if (!destination) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setItinerary(generateMockItinerary(destination));
    setGenerating(false);
  };

  const prefOptions = [
    { id: 'adventure', label: t('common_adventure') },
    { id: 'culture', label: t('common_culture') },
    { id: 'food', label: t('common_food') },
    { id: 'nature', label: t('common_nature') },
    { id: 'relaxation', label: t('common_relaxation') },
    { id: 'nightlife', label: t('common_nightlife') },
  ];

  return (
    <DashboardLayout title={t('planner_title')} subtitle={t('planner_subtitle')}>
      <div className="max-w-4xl mx-auto">
        {/* Input Form */}
        <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <MapPin className="inline h-4 w-4 mr-1" />
                {t('planner_destination')}
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Dahab, Egypt"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Calendar className="inline h-4 w-4 mr-1" />
                {t('planner_dates')}
              </label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="Jun 15 - Jun 22"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <Users className="inline h-4 w-4 mr-1" />
                {t('planner_travelers')}
              </label>
              <select
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                <DollarSign className="inline h-4 w-4 mr-1" />
                {t('planner_budget')}
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
              >
                <option value="budget">{t('common_budget')}</option>
                <option value="medium">{t('common_standard')}</option>
                <option value="luxury">{t('common_luxury')}</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Sparkles className="inline h-4 w-4 mr-1" />
              {t('planner_preferences')}
            </label>
            <div className="flex flex-wrap gap-2">
              {prefOptions.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => togglePreference(pref.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    preferences.includes(pref.id)
                      ? 'bg-teal-600 text<think> shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {pref.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!destination || generating}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text<think> font-medium rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t('planner_generating')}
              </>
            ) : (
              <>
                <Wand2 className="h-5 w-5" />
                {t('planner_generate')}
              </>
            )}
          </button>
        </div>

        {/* Generated Itinerary */}
        {itinerary && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text<think>">
                {destination} — 3 {t('common_days')}
              </h3>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <Save className="h-4 w-4" />
                  {t('planner_save_trip')}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                  {t('planner_share')}
                </button>
              </div>
            </div>

            {itinerary.map((day) => (
              <div key={day.day} className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-teal-600 text<think> font-bold text-sm">
                      {t('planner_day')} {day.day}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text<think>">{day.date}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{day.activities.length} {t('common_activities')}</p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {day.activities.map((activity, idx) => (
                    <div key={idx} className="flex gap-4 p-5">
                      <div className="flex flex-col items-center">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                          <activity.icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        </div>
                        <div className="flex-1 w-px bg-slate-200 dark:bg-slate-700 my-2" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</span>
                          <span className="text-xs font-medium text-teal-600 dark:text-teal-400">{activity.cost}</span>
                        </div>
                        <h4 className="font-medium text-slate-900 dark:text<think> mb-1">{activity.title}</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{activity.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
