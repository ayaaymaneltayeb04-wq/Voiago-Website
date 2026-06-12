import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Calendar, MapPin, Clock, Users, CreditCard, ChevronRight, Plane, Hotel, Car, UtensilsCrossed } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/bookings')({
  head: () => ({ meta: [{ title: 'Bookings — Voiago' }] }),
  component: BookingsPage,
});

type TabType = 'upcoming' | 'past' | 'cancelled';

const bookings = [
  {
    id: '1',
    title: 'Dahab Eco-Lodge',
    type: 'hotel',
    location: 'Dahab, Egypt',
    dates: 'Jun 15 - Jun 22, 2026',
    guests: 2,
    price: 850,
    status: 'upcoming' as TabType,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=250&fit=crop',
  },
  {
    id: '2',
    title: 'Cairo to Luxor Flight',
    type: 'flight',
    location: 'Cairo → Luxor',
    dates: 'Jul 10, 2026',
    guests: 2,
    price: 320,
    status: 'upcoming' as TabType,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    title: 'Desert Safari Camp',
    type: 'activity',
    location: 'Wadi Rum, Jordan',
    dates: 'May 20 - May 22, 2026',
    guests: 4,
    price: 450,
    status: 'past' as TabType,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=250&fit=crop',
  },
  {
    id: '4',
    title: 'Nile Dinner Cruise',
    type: 'activity',
    location: 'Cairo, Egypt',
    dates: 'Apr 15, 2026',
    guests: 2,
    price: 120,
    status: 'cancelled' as TabType,
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&h=250&fit=crop',
  },
];

const typeIcons: Record<string, typeof Hotel> = {
  hotel: Hotel,
  flight: Plane,
  car: Car,
  activity: UtensilsCrossed,
};

export function BookingsPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  const filtered = bookings.filter((b) => b.status === activeTab);

  return (
    <DashboardLayout title={t('bookings_title')} subtitle={t('bookings_subtitle')}>
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['upcoming', 'past', 'cancelled'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab === 'upcoming' ? t('bookings_upcoming') : tab === 'past' ? t('bookings_past') : t('bookings_cancelled')}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">{t('bookings_no_bookings')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{t('bookings_start_exploring')}</p>
            <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors">
              {t('bookings_book_now')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => {
              const Icon = typeIcons[booking.type] || Hotel;
              return (
                <div
                  key={booking.id}
                  className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48 sm:h-auto flex-shrink-0">
                      <img src={booking.image} alt={booking.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                            <span className="text-xs text-teal-600 dark:text-teal-400 font-medium capitalize">{booking.type}</span>
                          </div>
                          <h3 className="font-semibold text-slate-900 dark:text<think>">{booking.title}</h3>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          booking.status === 'upcoming' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                          booking.status === 'past' ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' :
                          'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.dates}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <Users className="h-4 w-4" />
                          <span>{booking.guests} {t('common_guests')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <CreditCard className="h-4 w-4" />
                          <span className="font-medium text-slate-900 dark:text<think>">${booking.price}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-lg text-sm font-medium transition-colors">
                          {t('bookings_details')}
                        </button>
                        {booking.status === 'upcoming' && (
                          <>
                            <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                              {t('bookings_modify')}
                            </button>
                            <button className="px-4 py-2 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                              {t('bookings_cancel')}
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
