import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { BookOpen, Plus, MapPin, Calendar, Smile, Image, Tag } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/journal')({
  head: () => ({ meta: [{ title: 'Journal — Voiago' }] }),
  component: JournalPage,
});

const entries = [
  {
    id: '1',
    title: 'Sunset at the Red Sea',
    content: 'The colors were absolutely breathtaking. The water was crystal clear and the coral reefs were teeming with life.',
    location: 'Dahab, Egypt',
    date: 'Jun 8, 2026',
    mood: 'happy',
    tags: ['diving', 'sunset', 'egypt'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Desert Camping Under Stars',
    content: 'Spent the night in a Bedouin camp. The silence of the desert is something else entirely.',
    location: 'Wadi Rum, Jordan',
    date: 'May 22, 2026',
    mood: 'peaceful',
    tags: ['camping', 'desert', 'stars'],
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop',
  },
];

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'excited', emoji: '🤩', label: 'Excited' },
  { id: 'peaceful', emoji: '😌', label: 'Peaceful' },
  { id: 'adventurous', emoji: '🏔️', label: 'Adventurous' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
];

export function JournalPage() {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: '', content: '', location: '', mood: 'happy', tags: '' });

  if (!isAuthenticated) {
    navigate({ to: '/auth' });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
      </div>
    );
  }

  return (
    <DashboardLayout title={t('journal_title')} subtitle={t('journal_subtitle')}>
      <div className="max-w-4xl mx-auto">
        {/* New Entry Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowNewEntry(!showNewEntry)}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors"
          >
            <Plus className="h-4 w-4" />
            {t('journal_new_entry')}
          </button>
        </div>

        {/* New Entry Form */}
        {showNewEntry && (
          <div className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 mb-6">
            <div className="space-y-4">
              <input
                type="text"
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                placeholder={t('journal_entry_title')}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={newEntry.location}
                    onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                    placeholder={t('journal_location')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t('journal_date')}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
              <textarea
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                placeholder={t('journal_write_your_thoughts')}
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Smile className="inline h-4 w-4 mr-1" />
                  {t('journal_mood')}
                </label>
                <div className="flex gap-2">
                  {moods.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setNewEntry({ ...newEntry, mood: m.id })}
                      className={`p-2 rounded-xl text-2xl transition-all ${
                        newEntry.mood === m.id
                          ? 'bg-teal-50 dark:bg-teal-900/20 ring-2 ring-teal-500'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={m.label}
                    >
                      {m.emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={newEntry.tags}
                  onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                  placeholder={t('journal_tags_placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg<think> dark:bg-slate-700 text-slate-900 dark:text<think> focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors"
                >
                  {t('common_cancel')}
                </button>
                <button className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors">
                  {t('common_save')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries */}
        {entries.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text<think> mb-2">{t('journal_no_entries')}</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">{t('journal_write_first')}</p>
            <button
              onClick={() => setShowNewEntry(true)}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text<think> rounded-xl text-sm font-medium transition-colors"
            >
              {t('journal_new_entry')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entries.map((entry) => (
              <div key={entry.id} className="bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                {entry.image && (
                  <div className="h-48 overflow-hidden">
                    <img src={entry.image} alt={entry.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">
                      {moods.find((m) => m.id === entry.mood)?.emoji}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{entry.date}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text<think> mb-2">{entry.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-3">{entry.content}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="h-3 w-3" />
                    <span>{entry.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
