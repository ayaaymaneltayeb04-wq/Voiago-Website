import { useState } from 'react';
import { Heart, Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const guides = [
  { id: 1, title: 'Hidden Gems of Cairo', location: 'Cairo, Egypt', img: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600&q=80', rating: 4.9, reviews: 218, readTime: '8 min', tags: ['Culture', 'History'] },
  { id: 2, title: 'Dubai Beyond the Skyscrapers', location: 'Dubai, UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', rating: 4.8, reviews: 341, readTime: '10 min', tags: ['Luxury', 'Nightlife'] },
  { id: 3, title: 'Santorini Slow Travel', location: 'Santorini, Greece', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', rating: 5.0, reviews: 189, readTime: '7 min', tags: ['Romance', 'Views'] },
  { id: 4, title: 'Kyoto Temple Walks', location: 'Kyoto, Japan', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', rating: 4.9, reviews: 156, readTime: '12 min', tags: ['Zen', 'Culture'] },
  { id: 5, title: 'Marrakech Medina Guide', location: 'Marrakech, Morocco', img: 'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=600&q=80', rating: 4.7, reviews: 204, readTime: '9 min', tags: ['Souks', 'Food'] },
  { id: 6, title: 'Bali Sacred & Serene', location: 'Bali, Indonesia', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80', rating: 4.8, reviews: 312, readTime: '11 min', tags: ['Nature', 'Wellness'] },
];

export function TravelGuidesGrid() {
  const { language } = useLanguage();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFav = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="section-label">{language === 'ar' ? 'أدلة السفر' : 'Travel Guides'}</p>
          <h3 className="text-xl font-bold text-navy-900 mt-1">
            {language === 'ar' ? 'دليلك الشامل لأجمل الوجهات' : 'Expert guides to top destinations'}
          </h3>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {guides.map((g) => (
          <article key={g.id} className="dest-card group bg-white">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={g.img} alt={g.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {g.tags.map((tag) => (
                  <span key={tag} className="badge bg-white/20 text-white backdrop-blur-sm">{tag}</span>
                ))}
              </div>
              <h4 className="text-sm font-bold text-white leading-tight">{g.title}</h4>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <MapPin className="h-3 w-3" /> {g.location}
                </div>
                <div className="flex items-center gap-1 text-xs text-amber-300">
                  <Star className="h-3 w-3 fill-amber-300" /> {g.rating}
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleFav(g.id)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition"
            >
              <Heart className={`h-4 w-4 ${favorites.has(g.id) ? 'fill-red-400 text-red-400' : 'text-white'}`} />
            </button>
            <div className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-medium text-white/80 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5">
              <Clock className="h-3 w-3" /> {g.readTime}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
