import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { useLanguage } from '../lib/LanguageContext';
import { Search, Plane, Hotel } from 'lucide-react';

export const Route = createFileRoute('/bookings')({
  head: () => ({ meta: [{ title: 'Bookings — Voiago' }] }),
  component: Bookings,
});

const bookings = [
  { id: 'EK-2026-4815', type: 'Flight', title: 'Cairo → Dubai', date: 'Jun 15, 2026', price: '$480', status: 'Confirmed' },
  { id: 'HT-9023', type: 'Hotel', title: 'Burj Al Arab, Dubai', date: 'Jun 15 – Jun 20', price: '$2,400', status: 'Confirmed' },
  { id: 'TK-1183', type: 'Flight', title: 'Cairo → Istanbul', date: 'Apr 3, 2026', price: '$320', status: 'Completed' },
  { id: 'HT-7711', type: 'Hotel', title: 'Four Seasons, Istanbul', date: 'Apr 3 – Apr 7', price: '$1,150', status: 'Completed' },
  { id: 'AF-908', type: 'Flight', title: 'Cairo → Paris', date: 'Feb 12, 2026', price: '$610', status: 'Completed' },
];

const STATUS_STYLES: Record<string, string> = {
  Confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Completed: 'bg-navy-50 text-navy-600 border border-navy-200',
  Cancelled: 'bg-red-50 text-red-600 border border-red-200',
};

function Bookings() {
  const { t, language } = useLanguage();
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('bookings.all') },
    { id: 'confirmed', label: t('bookings.upcoming') },
    { id: 'completed', label: t('bookings.completed') },
    { id: 'cancelled', label: t('bookings.cancelled') },
  ];

  const filtered = bookings.filter(
    (b) =>
      (filter === 'all' || b.status.toLowerCase() === filter) &&
      (b.title.toLowerCase().includes(q.toLowerCase()) || b.id.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <DashboardLayout title={t('bookings.title')} subtitle={t('bookings.subtitle')}>
      {/* Search + Filters */}
      <div className="card-premium p-4 mb-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-navy-100 bg-navy-50 px-3.5 py-2.5">
          <Search className="h-4 w-4 text-navy-400 flex-shrink-0" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('bookings.search')}
            className="flex-1 bg-transparent text-sm outline-none text-navy-800 placeholder-navy-400"
          />
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition ${filter === f.id ? 'bg-navy-900 text-white' : 'bg-navy-50 text-navy-500 hover:bg-navy-100'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings list */}
      <div className="space-y-3">
        {filtered.map((b) => (
          <div key={b.id} className="card-premium p-5 flex items-center gap-4">
            <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${b.type === 'Flight' ? 'bg-azure-50 text-azure-600' : 'bg-orange-50 text-orange-500'}`}>
              {b.type === 'Flight' ? <Plane className="h-5 w-5" /> : <Hotel className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-bold uppercase text-navy-400">{b.type}</span>
                <span className={`badge ${STATUS_STYLES[b.status]}`}>{b.status}</span>
              </div>
              <h4 className="text-sm font-bold text-navy-900 truncate">{b.title}</h4>
              <p className="text-xs text-navy-400 mt-0.5">{b.date} · #{b.id}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-base font-black text-navy-900">{b.price}</p>
              <button className="text-xs font-semibold text-azure-600 hover:text-azure-700 mt-1 transition">
                {language === 'ar' ? 'التفاصيل' : 'Details'}
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="card-premium p-12 text-center">
            <p className="text-navy-400 text-sm">{language === 'ar' ? 'لا توجد حجوزات تطابق فلترك.' : 'No bookings match your filter.'}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
