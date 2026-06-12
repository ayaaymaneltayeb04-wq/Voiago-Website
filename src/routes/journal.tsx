import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { useLanguage } from '../lib/LanguageContext';
import { Plus, MapPin, Camera, Heart } from 'lucide-react';

export const Route = createFileRoute('/journal')({
  head: () => ({ meta: [{ title: 'Travel Journal — Voiago' }] }),
  component: JournalPage,
});

const entries = [
  { id: 1, title: 'Golden Hour at Santorini', place: 'Santorini, Greece', date: 'May 12, 2026', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', notes: 'Watched the sunset from the caldera edge — pure magic.', likes: 24 },
  { id: 2, title: 'Lost in Kyoto\'s Temples', place: 'Kyoto, Japan', date: 'Mar 8, 2026', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', notes: 'Bamboo grove at dawn, no crowds. The silence was sacred.', likes: 31 },
  { id: 3, title: 'Marrakech Night Market', place: 'Marrakech, Morocco', date: 'Jan 15, 2026', img: 'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=600&q=80', notes: 'Spices, lanterns, laughter — Djemaa el-Fna at its best.', likes: 18 },
  { id: 4, title: 'Dubai From Above', place: 'Dubai, UAE', date: 'Dec 20, 2025', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', notes: 'Burj Khalifa observation deck at sunset — breathtaking.', likes: 42 },
];

function JournalPage() {
  const { t, language } = useLanguage();
  const [likes, setLikes] = useState<Set<number>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', place: '', notes: '' });

  return (
    <DashboardLayout title={t('journal.title')} subtitle={t('journal.subtitle')}>
      {/* Stats + add button */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div className="flex gap-4">
          {[
            { value: entries.length + (showForm ? 1 : 0), label: language === 'ar' ? 'إدخالات' : 'Entries' },
            { value: '186', label: language === 'ar' ? 'صورة' : 'Photos' },
            { value: '8', label: language === 'ar' ? 'دول' : 'Countries' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-black text-navy-900">{s.value}</p>
              <p className="text-xs text-navy-400">{s.label}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-cta px-5 py-2.5 text-sm">
          <Plus className="h-4 w-4" /> {t('journal.add_entry')}
        </button>
      </div>

      {/* New entry form */}
      {showForm && (
        <div className="card-premium p-6 mb-5 animate-fade-up">
          <h3 className="text-sm font-bold text-navy-800 mb-4">{language === 'ar' ? 'إضافة ذكرى جديدة' : 'Add a new memory'}</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('journal.place')}</label><input value={newEntry.title} onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })} placeholder="Trip title" className="input-field" /></div>
            <div><label className="block text-xs font-bold text-navy-500 mb-1.5">{t('journal.date')}</label><input value={newEntry.place} onChange={(e) => setNewEntry({ ...newEntry, place: e.target.value })} placeholder="Location" className="input-field" /></div>
          </div>
          <textarea rows={3} value={newEntry.notes} onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })} placeholder={t('journal.notes')} className="input-field w-full resize-none mb-4" />
          <div className="flex gap-2">
            <button onClick={() => setShowForm(false)} className="btn-cta px-6 py-2.5 text-sm">{t('journal.save')}</button>
            <button onClick={() => setShowForm(false)} className="rounded-xl border border-navy-200 px-5 py-2.5 text-sm font-medium text-navy-600 hover:border-navy-400 transition">{language === 'ar' ? 'إلغاء' : 'Cancel'}</button>
          </div>
        </div>
      )}

      {/* Entries grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {entries.map((entry) => (
          <article key={entry.id} className="card-premium overflow-hidden group">
            <div className="relative aspect-video overflow-hidden">
              <img src={entry.img} alt={entry.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-base font-bold text-white">{entry.title}</h3>
                <div className="flex items-center gap-1 mt-1 text-white/70 text-xs">
                  <MapPin className="h-3 w-3" /> {entry.place}
                </div>
              </div>
              <button
                onClick={() => setLikes((prev) => { const n = new Set(prev); n.has(entry.id) ? n.delete(entry.id) : n.add(entry.id); return n; })}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
              >
                <Heart className={`h-4 w-4 ${likes.has(entry.id) ? 'fill-red-400 text-red-400' : 'text-white'}`} />
              </button>
            </div>
            <div className="p-5">
              <p className="text-xs text-navy-400 mb-2">{entry.date}</p>
              <p className="text-sm text-navy-600 leading-relaxed line-clamp-2">{entry.notes}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 text-xs text-navy-400">
                  <Camera className="h-3.5 w-3.5" /> {language === 'ar' ? 'عرض الصور' : 'View Photos'}
                </div>
                <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                  <Heart className="h-3.5 w-3.5 fill-red-400" /> {entry.likes + (likes.has(entry.id) ? 1 : 0)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </DashboardLayout>
  );
}
