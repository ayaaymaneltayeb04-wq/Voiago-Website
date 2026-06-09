import { useState } from 'react';
import { MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Guide {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  location: string;
  readTime: number;
  rating: number;
  tags: string[];
}

const guides: Guide[] = [
  {
    id: '1',
    title: 'Hidden Gems of Dahab',
    excerpt: 'Discover the untouched beauty of Dahab beyond the tourist trails. From secret lagoons to local Bedouin camps.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    location: 'Dahab, Egypt',
    readTime: 8,
    rating: 4.9,
    tags: ['adventure', 'culture'],
  },
  {
    id: '2',
    title: 'Wadi Rum Desert Guide',
    excerpt: 'A complete guide to exploring the Valley of the Moon. Best camps, trails, and stargazing spots.',
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&h=300&fit=crop',
    location: 'Wadi Rum, Jordan',
    readTime: 12,
    rating: 4.8,
    tags: ['desert', 'camping'],
  },
  {
    id: '3',
    title: 'Red Sea Diving Handbook',
    excerpt: 'Everything you need to know about diving in the Red Sea. Top sites, safety tips, and marine life.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
    location: 'Red Sea, Egypt',
    readTime: 15,
    rating: 4.7,
    tags: ['diving', 'nature'],
  },
  {
    id: '4',
    title: 'Cairo Street Food Tour',
    excerpt: 'The ultimate food lover guide to Cairo. From koshari to falafel, explore the city one bite at a time.',
    image: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&h=300&fit=crop',
    location: 'Cairo, Egypt',
    readTime: 10,
    rating: 4.6,
    tags: ['food', 'culture'],
  },
  {
    id: '5',
    title: 'Petra by Night',
    excerpt: 'Experience the magic of Petra after dark. Tips for the candlelit walk through the Siq to the Treasury.',
    image: 'https://images.unsplash.com/photo-1579606038888-82c0f02f7f89?w=400&h=300&fit=crop',
    location: 'Petra, Jordan',
    readTime: 6,
    rating: 4.9,
    tags: ['history', 'culture'],
  },
  {
    id: '6',
    title: 'Luxor Temple Guide',
    excerpt: 'A deep dive into ancient Thebes. Karnak, Luxor Temple, and the Valley of the Kings explained.',
    image: 'https://images.unsplash.com/photo-1568322445389-f64a57b1d5e2?w=400&h=300&fit=crop',
    location: 'Luxor, Egypt',
    readTime: 14,
    rating: 4.8,
    tags: ['history', 'culture'],
  },
];

export function TravelGuidesGrid() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'adventure', 'culture', 'food', 'nature', 'history'];

  const filtered = activeFilter === 'all'
    ? guides
    : guides.filter((g) => g.tags.includes(activeFilter));

  return (
    <section id="guides" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t('guides_title')}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t('guides_subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-teal-600 text<think> shadow-md'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {filter === 'all' ? t('common_all') : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((guide) => (
            <article
              key={guide.id}
              className="group bg<think> dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{guide.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{guide.location}</span>
                  <span className="mx-1">·</span>
                  <Clock className="h-3.5 w-3.5" />
                  <span>{guide.readTime} {t('guides_min_read')}</span>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text<think> text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {guide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-1 text-sm text-teal-600 dark:text-teal-400 font-medium hover:underline">
                    {t('guides_read_more')}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
