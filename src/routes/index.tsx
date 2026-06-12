import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  Search, MapPin, Plane, Hotel, Sparkles, Globe2, ShieldCheck, Compass,
  ArrowRight, Star, Wallet, Gift, Tag, Calendar, ChevronDown,
  Mail, Send, CreditCard, AlertTriangle, Moon, Camera,
  Zap, Shield, WifiOff, Bell, QrCode, Smartphone, Phone, Facebook, Instagram,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { PremiumHero } from '../components/PremiumHero';
import { VoiagoLogo } from '../components/VoiagoLogo';
import PartnerPortal from '../components/PartnerPortal';
import VoiagoAIChatbot from '../components/VoiagoAIChatbot';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Voiago — Smart Travel Platform' },
      { name: 'description', content: 'Discover beautiful places and find the best travel deals with Voiago.' },
    ],
  }),
  component: Index,
});

const destinations = [
  { name: 'Santorini', country: 'Greece', price: 'from 23,500 EGP', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80' },
  { name: 'Kyoto', country: 'Japan', price: 'from 35,200 EGP', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80' },
  { name: 'Marrakech', country: 'Morocco', price: 'from 19,100 EGP', img: 'https://images.unsplash.com/photo-1597211833712-5e41faa202ea?w=900&q=80' },
  { name: 'Banff', country: 'Canada', price: 'from 29,800 EGP', img: 'https://images.unsplash.com/photo-1561134643-668f9057cce4?w=900&q=80' },
  { name: 'Lisbon', country: 'Portugal', price: 'from 16,600 EGP', img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80' },
  { name: 'Bali', country: 'Indonesia', price: 'from 25,400 EGP', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=900&q=80' },
];

const services = [
  { icon: Plane, title: 'Flight Booking', desc: 'Search and book flights from 500+ airlines worldwide with real-time price comparison.', badge: 'MOST POPULAR', badgeStyle: 'bg-azure-50 text-azure-700 border-azure-200', iconStyle: 'bg-azure-600 text-white', tags: ['Cairo → Dubai', 'Cairo → Istanbul', 'Cairo → London', 'Cairo → Paris', '+5 more'] },
  { icon: Hotel, title: 'Hotel Booking', desc: 'Choose from 1M+ hotels, resorts, and boutique stays with verified reviews.', badge: 'BEST VALUE', badgeStyle: 'bg-orange-50 text-orange-600 border-orange-200', iconStyle: 'bg-orange-500 text-white', tags: ['5-Star Resorts', 'Budget Hotels', 'Beach Resorts', 'Boutique Hotels', '+5 more'] },
  { icon: Globe2, title: 'Transport', desc: 'Book airport transfers, rent cars, hire private drivers, and find local transport.', badge: 'FAST & EASY', badgeStyle: 'bg-emerald-50 text-emerald-600 border-emerald-200', iconStyle: 'bg-emerald-500 text-white', tags: ['Airport Transfer', 'Car Rental', 'Private Driver', 'Train Tickets', '+5 more'] },
  { icon: Compass, title: 'AI Trip Planning', desc: 'AI-powered itinerary builder creates personalized day-by-day travel plans.', badge: 'AI POWERED', badgeStyle: 'bg-navy-50 text-navy-700 border-navy-200', iconStyle: 'bg-navy-700 text-white', tags: ['3-Day Cairo', '7-Day Turkey', 'Honeymoon', 'Family Trip', '+5 more'] },
  { icon: CreditCard, title: 'Smart Payments', desc: 'Pay in EGP, USD, EUR, SAR, AED with flexible payment plans and secure checkout.', badge: 'MULTI-CURRENCY', badgeStyle: 'bg-azure-50 text-azure-600 border-azure-100', iconStyle: 'bg-azure-500 text-white', tags: [] },
  { icon: AlertTriangle, title: 'Emergency Support', desc: '24/7 emergency button with instant SOS alerts, local embassy routing, and real-time support.', badge: '24/7 AVAILABLE', badgeStyle: 'bg-red-50 text-red-600 border-red-200', iconStyle: 'bg-red-500 text-white', tags: [] },
  { icon: Moon, title: 'Hajj & Umrah', desc: 'Complete Hajj and Umrah packages including visa processing, guided tours, and premium stays.', badge: 'EXCLUSIVE', badgeStyle: 'bg-amber-50 text-amber-600 border-amber-200', iconStyle: 'bg-amber-600 text-white', tags: [] },
  { icon: Camera, title: 'Trip Journal', desc: 'Document your journey with photos, notes, and map timelines to share memories.', badge: 'NEW FEATURE', badgeStyle: 'bg-pink-50 text-pink-600 border-pink-200', iconStyle: 'bg-pink-500 text-white', tags: [] },
];

const packages = [
  { tag: 'Honeymoon', title: 'Maldives Serenity', nights: '7 nights', price: 'from $2,490', img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80', arabic: false },
  { tag: 'Family', title: 'Dubai Discovery', nights: '5 nights', price: 'from $1,290', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80', arabic: false },
  { tag: 'Solo', title: 'Lisbon Slow Days', nights: '6 nights', price: 'from $1,180', img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=900&q=80', arabic: false },
  { tag: 'Hajj 2026', title: 'موسم الحج الإيماني', nights: 'برامج متكاملة فاخرة', price: 'من 35,000 ج.م', img: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=900&q=80', arabic: true },
  { tag: 'Umrah', title: 'عمرة طوال العام', nights: 'رحلات شهرية مستمرة', price: 'من 6,200 ج.م', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=80', arabic: true },
  { tag: 'Ramadan', title: 'عمرة شهر رمضان المبارك', nights: 'شامل الطيران والإقامة', price: 'من 8,500 ج.م', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80', arabic: true },
];

const pricing = [
  { name: 'Explorer', price: 'Free', desc: 'All the essentials to start planning.', features: ['Browse destinations', 'Save trips', 'Standard support'], cta: 'Get started', featured: false },
  { name: 'Premium', price: '$9.90', suffix: '/mo', desc: 'For travelers who want more.', features: ['Smart recommendations', 'Member-only deals', 'Priority support', 'Concierge chat'], cta: 'Start free trial', featured: true },
  { name: 'Business', price: '$29', suffix: '/mo', desc: 'Plan trips for your whole team.', features: ['Team management', 'Invoices & VAT', 'Dedicated manager', 'Custom contracts'], cta: 'Contact sales', featured: false },
];

const offers = [
  { tag: '−25%', title: 'Summer in the Greek Isles', desc: 'Limited 4-night packages from May to September.' },
  { tag: '−15%', title: 'Early Winter in Kyoto', desc: 'Quiet temples, golden leaves, premium ryokans.' },
  { tag: '−30%', title: 'Last-minute Dubai', desc: 'Weekend stays with breakfast included.' },
];

const steps = [
  { n: '01', title: 'Tell us your vibe', desc: 'A few questions about pace, taste and budget.' },
  { n: '02', title: 'Get smart suggestions', desc: 'AI-curated routes and stays in seconds.' },
  { n: '03', title: 'Book in one place', desc: 'Flights, stays and experiences — one calm checkout.' },
];

const features = [
  { icon: Sparkles, title: 'Smart Recommendations', desc: 'AI-curated trips tailored to your style, budget and time of year.' },
  { icon: ShieldCheck, title: 'Trusted Booking', desc: 'Secure checkout with verified partners and instant confirmations.' },
  { icon: Globe2, title: 'Worldwide Coverage', desc: 'Over 200 countries, thousands of cities, one elegant interface.' },
];

const faqs = [
  { q: 'Can I cancel or change a booking?', a: 'Yes — every booking shows its cancellation window, and our 24/7 concierge can assist.' },
  { q: 'How do rewards points work?', a: 'You earn 1 point for every $1 spent. Redeem them for upgrades, discounts and free nights.' },
  { q: 'Is Voiago Premium worth it?', a: 'Most members recover the subscription in the first booking thanks to member-only deals.' },
  { q: 'Do you support group trips?', a: 'Absolutely — try Voiago Business for shared payment, invoicing and a dedicated manager.' },
];

const navLinks = [
  { label: 'Services', labelAr: 'الخدمات', href: '#services' },
  { label: 'Destinations', labelAr: 'الوجهات', href: '#destinations' },
  { label: 'Packages', labelAr: 'الباقات', href: '#packages' },
  { label: 'Pricing', labelAr: 'الأسعار', href: '#pricing' },
  { label: 'About', labelAr: 'عنا', href: '#about' },
];

function Index() {
  const { t, language, isRtl } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', subject: 'استفسار عام', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => { setFormSubmitted(false); setFormData({ name: '', subject: 'استفسار عام', message: '' }); }, 4000);
  };

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ── Navbar ── */}
      <header className="fixed top-4 left-1/2 z-50 w-[min(1200px,calc(100%-2rem))] -translate-x-1/2 glass-nav rounded-2xl px-5 py-3">
        <nav className="flex items-center justify-between gap-4">
          <button onClick={() => { if (isAuthenticated) logout(); navigate({ to: '/' }); }} className="flex-shrink-0">
            <VoiagoLogo size="md" />
          </button>

          <ul className="hidden items-center gap-7 md:flex">
            {!isAuthenticated
              ? navLinks.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="nav-link">{language === 'ar' ? l.labelAr : l.label}</a>
                  </li>
                ))
              : (
                <>
                  <li><Link to="/dashboard" className="nav-link">{language === 'ar' ? 'رحلاتي' : 'My Trips'}</Link></li>
                  <li><Link to="/trip-planner" className="nav-link">{language === 'ar' ? 'مخطط الرحلات' : 'Trip Planner'}</Link></li>
                  <li><Link to="/wallet" className="nav-link">{language === 'ar' ? 'المحفظة' : 'Wallet'}</Link></li>
                  <li><Link to="/emergency" className="nav-link">{language === 'ar' ? 'الطوارئ' : 'Emergency'}</Link></li>
                </>
              )}
          </ul>

          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/auth" className="hidden text-sm font-medium text-navy-600 hover:text-navy-900 transition sm:block">
                  {t('auth.title.signin')}
                </Link>
                <Link to="/auth" className="btn-cta px-5 py-2.5 text-sm">
                  {t('landing.hero.cta')}
                </Link>
              </>
            ) : (
              <button onClick={logout} className="btn-navy px-5 py-2.5 text-sm">
                {t('auth.title.signin')}
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* ── Hero ── */}
      <PremiumHero onSearch={() => navigate({ to: '/trip-planner' })} />

      {/* ── Services ── */}
      <section id="services" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="section-label">{language === 'ar' ? 'خدماتنا' : 'Our Services'}</p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
              {language === 'ar' ? 'كل ما تحتاجه في مكان واحد' : 'Everything you need, in one place'}
            </h2>
            <p className="mt-4 text-navy-500">
              {language === 'ar' ? 'من الحجوزات السلسة إلى المساعدة الطارئة المباشرة — فويآجو يغطي كل شيء.' : 'From seamless bookings to direct emergency assistance — Voiago covers it all.'}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="card-premium p-7 flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.iconStyle} shadow-soft`}>
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className={`badge border ${s.badgeStyle}`}>{s.badge}</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy-500 leading-relaxed">{s.desc}</p>
                </div>
                {s.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {s.tags.map((tag, i) => (
                      <span key={i} className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${tag.includes('+') ? 'bg-azure-50 text-azure-700 font-semibold' : 'bg-navy-50 text-navy-600'}`}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section id="destinations" className="py-24 bg-section-alt">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12">
            <div>
              <p className="section-label">{language === 'ar' ? 'الوجهات الشائعة' : 'Popular Destinations'}</p>
              <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
                {language === 'ar' ? 'حيث يذهب الحالمون' : 'Where dreamers wander'}
              </h2>
            </div>
            <Link to="/trip-planner" className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600">
              {language === 'ar' ? 'خطط رحلة' : 'Plan a trip'} <ArrowRight className={`h-4 w-4 ${isRtl ? 'rtl-flip' : ''}`} />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((d) => (
              <article key={d.name} className="dest-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={d.img} alt={`${d.name}, ${d.country}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-base font-bold text-white">{d.name}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-white/70">{d.country}</p>
                    <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">{d.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section id="packages" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="section-label">{language === 'ar' ? 'الباقات المنتقاة' : 'Curated Packages'}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              {language === 'ar' ? 'أفكار سفر تستحق الحجز' : 'Travel ideas worth saving'}
            </h2>
          </div>
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <article key={i} className="card-premium overflow-hidden group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-navy-800">{p.tag}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col" dir={p.arabic ? 'rtl' : 'ltr'}>
                  <h3 className="text-base font-bold text-navy-900">{p.title}</h3>
                  <p className="text-xs text-navy-400 mt-1">{p.nights}</p>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-navy-50 mt-4">
                    <span className="text-lg font-black text-orange-500">{p.price}</span>
                    <Link to="/bookings" className="text-sm font-bold text-navy-600 group-hover:text-orange-500 transition flex items-center gap-1">
                      {p.arabic ? 'احجز الآن' : 'Book now'} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-section-alt">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="section-label">{language === 'ar' ? 'كيف يعمل' : 'How it works'}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              {language === 'ar' ? 'من الفكرة إلى الحقيبة في ثلاث خطوات' : 'From spark to suitcase, in three steps'}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="card-premium p-8 relative overflow-hidden">
                <span className="absolute top-4 right-4 text-5xl font-black text-navy-50 select-none">{s.n}</span>
                <span className="text-sm font-bold text-orange-500">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold text-navy-900">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offers ── */}
      <section id="offers" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end mb-12">
            <div>
              <p className="section-label">{language === 'ar' ? 'عروض حصرية' : "Deals you'll love"}</p>
              <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
                {language === 'ar' ? 'عروض محدودة، مستوى فاخر' : 'Limited offers, premium feel'}
              </h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {offers.map((o) => (
              <div key={o.title} className="card-premium p-7 relative overflow-hidden">
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-bold text-white">
                  <Tag className="h-3 w-3" /> {o.tag}
                </span>
                <h3 className="mt-8 text-lg font-bold text-navy-900">{o.title}</h3>
                <p className="mt-2 text-sm text-navy-500">{o.desc}</p>
                <Link to="/bookings" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600">
                  {language === 'ar' ? 'احجز الآن' : 'Claim offer'} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features / Why Voiago ── */}
      <section className="py-24 bg-section-alt">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="section-label">{language === 'ar' ? 'لماذا فويآجو' : 'Why Voiago'}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              {language === 'ar' ? 'سفر مخطط بنية ورؤية' : 'Travel planned with intention'}
            </h2>
            <p className="mt-4 text-navy-500">
              {language === 'ar' ? 'أدوات راقية تجعل الرحلة بنفس روعة الوجهة.' : 'Premium tools that make the journey feel as good as the destination.'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card-premium p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50">
                  <f.icon className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="mt-6 text-lg font-bold text-navy-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-14">
            <p className="section-label">{language === 'ar' ? 'الأسعار' : 'Pricing'}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              {language === 'ar' ? 'اختر خطتك' : 'Choose your plan'}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3 items-end">
            {pricing.map((p) => (
              <div
                key={p.name}
                className={`rounded-3xl p-8 transition-all ${p.featured ? 'pricing-featured text-white -translate-y-3 shadow-deep' : 'card-premium'}`}
              >
                <p className={`text-sm font-bold ${p.featured ? 'text-azure-300' : 'text-azure-600'}`}>{p.name}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-4xl font-black">{p.price}</span>
                  {p.suffix && <span className={`pb-1 text-sm ${p.featured ? 'text-white/60' : 'text-navy-400'}`}>{p.suffix}</span>}
                </div>
                <p className={`mt-2 text-sm ${p.featured ? 'text-white/80' : 'text-navy-500'}`}>{p.desc}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Star className={`h-3.5 w-3.5 flex-shrink-0 ${p.featured ? 'fill-orange-400 text-orange-400' : 'fill-azure-500 text-azure-500'}`} />
                      <span className={p.featured ? 'text-white/90' : 'text-navy-700'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/auth"
                  className={`mt-7 block rounded-2xl px-5 py-3.5 text-center text-sm font-bold transition ${p.featured ? 'bg-orange-500 text-white hover:bg-orange-600' : 'btn-navy text-white'}`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App Download ── */}
      <section id="download" className="py-24 bg-hero overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-tr from-azure-900/20 via-transparent to-orange-500/5 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-6 text-azure-200">
                <Smartphone className="h-3.5 w-3.5 text-orange-400" /> Download Voiago
              </div>
              <h2 className="text-4xl font-extrabold sm:text-5xl text-white tracking-tight">
                {language === 'ar' ? (<>سافر بذكاء<br /><span className="text-gradient-orange">من هاتفك.</span></>) : (<>Travel Smarter,<br /><span className="text-gradient-orange">From Your Phone.</span></>)}
              </h2>
              <p className="mt-6 text-azure-100/70 text-base leading-relaxed max-w-md">
                {language === 'ar' ? 'احصل على تجربة فويآجو الكاملة على هاتفك. خطط واحجز وأدر كل رحلاتك من أي مكان.' : 'Get the full Voiago experience on your mobile device. Plan, book, and manage every journey from anywhere.'}
              </p>
              <div className="mt-10 space-y-4">
                {[
                  { icon: Zap, text: 'Book in under 60 seconds' },
                  { icon: Shield, text: 'Bank-grade security' },
                  { icon: WifiOff, text: 'Works offline too' },
                  { icon: Bell, text: 'Real-time notifications' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-orange-400">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-azure-100/80">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-10">
                {[{ v: '4.9 / 5', l: 'App Rating' }, { v: '2M+', l: 'Active Users' }, { v: '50MB', l: 'Lightweight' }].map((s) => (
                  <div key={s.l}>
                    <p className="text-2xl font-black text-white">{s.v}</p>
                    <p className="text-xs text-azure-400/70 mt-0.5 font-medium">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-[280px] h-[560px] bg-navy-800 rounded-[2.5rem] border-[5px] border-navy-700 shadow-deep relative overflow-hidden flex flex-col justify-between p-4 hover:border-orange-500/50 transition-all duration-500">
                <div>
                  <div className="flex justify-between items-center px-1 pt-1 mb-5">
                    <VoiagoLogo size="sm" dark />
                    <Bell className="h-4 w-4 text-navy-400" />
                  </div>
                  <div className="bg-navy-700 rounded-xl px-3 py-2.5 flex items-center gap-2 mb-4 border border-white/5">
                    <Search className="h-3.5 w-3.5 text-navy-400" />
                    <span className="text-xs text-navy-400">{language === 'ar' ? 'إلى أين؟' : 'Where to next?'}</span>
                  </div>
                  <div className="bg-navy-700 rounded-2xl p-3 border border-white/5 shadow flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl overflow-hidden bg-cover bg-center flex-shrink-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=150&q=80')" }} />
                    <div>
                      <h4 className="text-xs font-bold text-white">Dubai, UAE</h4>
                      <p className="text-[10px] text-navy-400 mt-0.5">May 15 – May 22</p>
                      <p className="text-xs font-bold text-orange-400 mt-1">EGP 8,900</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[Plane, Hotel, Globe2, Compass].map((Icon, i) => (
                      <div key={i} className="bg-navy-700 h-9 rounded-xl flex items-center justify-center text-navy-400 hover:bg-orange-500 hover:text-white cursor-pointer transition">
                        <Icon className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-navy-700 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-semibold text-navy-400">Budget</span>
                      <span className="text-[10px] font-bold text-orange-400">EGP 12,000</span>
                    </div>
                    <div className="w-full bg-navy-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-orange-500 h-full w-[66%]" />
                    </div>
                  </div>
                  <div className="bg-white text-navy-900 rounded-xl p-2.5 flex items-center gap-2 shadow animate-bounce">
                    <div className="h-4 w-4 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">✓</div>
                    <span className="text-[10px] font-bold">Booking Confirmed!</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="bg-white p-4 rounded-3xl shadow-float border border-navy-100 mb-5 flex flex-col items-center max-w-[170px]">
                <QrCode className="h-24 w-24 text-azure-600" strokeWidth={1.5} />
              </div>
              <h4 className="text-base font-bold text-white">{language === 'ar' ? 'امسح للتنزيل' : 'Scan to Download'}</h4>
              <p className="mt-2 text-xs text-azure-300/60 leading-relaxed max-w-[190px]">
                {language === 'ar' ? 'وجه كاميرتك نحو الرمز لتنزيل فويآجو فوراً.' : 'Point your camera at the QR code to download Voiago instantly.'}
              </p>
              <button className="mt-5 btn-cta px-5 py-2.5 text-sm">
                <Smartphone className="h-4 w-4" /> {language === 'ar' ? 'تنزيل التطبيق' : 'Download App'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-section-alt">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <p className="section-label">FAQ</p>
            <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
              {language === 'ar' ? 'أسئلة تجاب بلطف' : 'Questions, gently answered'}
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={f.q} className="card-premium overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-semibold text-navy-900">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 text-navy-400 transition-transform flex-shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-navy-500 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 bg-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="section-label">{language === 'ar' ? 'عن فويآجو' : 'About Voiago'}</p>
          <h2 className="mt-2 text-3xl font-bold text-navy-900 sm:text-4xl">
            {language === 'ar' ? 'طريقة سفر أهدأ' : 'A calmer way to travel'}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-navy-500 leading-relaxed">
            {language === 'ar'
              ? 'وُلدت فويآجو من مشروع تخرج عند تقاطع التصميم والذكاء الاصطناعي والسفر. نؤمن أن التكنولوجيا يجب أن تجعل الرحلات أكثر هدوءاً — لا ضجيجاً.'
              : 'Voiago was born from a graduation project at the intersection of design, AI and travel. We believe technology should make journeys quieter — not noisier — so we craft tools that help you plan with intention and feel present along the way.'}
          </p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact-section" className="py-24 bg-hero text-white border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">{language === 'ar' ? 'اتصل بنا' : 'Contact Us'}</h2>
            <p className="text-sm text-azure-300/70 mt-2">
              {language === 'ar' ? 'لديك أي استفسار؟ أرسل لنا رسالة وسنرد عليك.' : 'Have a question? Send us a message and we\'ll get back to you.'}
            </p>
          </div>
          <div className="bg-navy-800/80 border border-white/10 rounded-3xl p-8 shadow-deep backdrop-blur-sm" dir="rtl">
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-azure-300 mb-2">الاسم</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="اسمك الكريم" className="w-full rounded-xl border border-white/10 bg-white/10 text-white placeholder-white/30 px-4 py-3.5 text-sm outline-none focus:border-orange-400 transition" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-azure-300 mb-2">الموضوع</label>
                  <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full rounded-xl border border-white/10 bg-navy-800 text-white px-4 py-3.5 text-sm outline-none focus:border-orange-400 transition appearance-none cursor-pointer">
                    <option value="استفسار عام">استفسار عام</option>
                    <option value="دعم فني">دعم فني</option>
                    <option value="شراكة عمل">شراكة وأعمال</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-azure-300 mb-2">رسالتك</label>
                <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="اكتب رسالتك هنا..." className="w-full rounded-xl border border-white/10 bg-white/10 text-white placeholder-white/30 px-4 py-3.5 text-sm outline-none focus:border-orange-400 transition resize-none" />
              </div>
              <button type="submit" className="btn-cta w-full py-4 text-sm">
                <Send className="h-4 w-4" /> إرسال الرسالة
              </button>
              {formSubmitted && (
                <div className="toast-success flex items-center gap-2">
                  تم استلام رسالتك بنجاح! سيتواصل معك الفريق قريباً.
                </div>
              )}
            </form>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-azure-300/70">تواصل معنا عبر:</p>
              <div className="flex items-center gap-3">
                {[
                  { href: 'mailto:info@voiago.app', icon: Mail, title: 'Email' },
                  { href: 'https://wa.me/201000000000', icon: Phone, title: 'WhatsApp' },
                  { href: 'https://www.facebook.com/share/1EoeDdAsj3/', icon: Facebook, title: 'Facebook' },
                  { href: 'https://www.instagram.com/voia_go', icon: Instagram, title: 'Instagram' },
                ].map((s) => (
                  <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title} className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/10 text-azure-300 hover:bg-orange-500 hover:text-white transition">
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner Portal ── */}
      <PartnerPortal />

      {/* ── CTA Banner ── */}
      <section className="py-24 bg-section-alt">
        <div className="mx-auto max-w-5xl px-6">
          <div className="overflow-hidden rounded-4xl bg-hero p-12 text-center shadow-deep md:p-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-azure-500/10 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
                {language === 'ar' ? 'رحلتك القادمة، مخططة بإتقان.' : <>Your next journey,{' '}<span className="text-gradient-orange">beautifully planned.</span></>}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-azure-200/70">
                {language === 'ar' ? 'انضم إلى فويآجو اليوم وافتح عروضاً حصرية مصممة خصيصاً لأسلوب سفرك.' : 'Join Voiago today and unlock smart deals curated for the way you travel.'}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/auth" className="btn-cta px-7 py-3.5 text-sm">
                  {language === 'ar' ? 'ابدأ الاستكشاف' : 'Start exploring'}
                </Link>
                <Link to="/dashboard" className="btn-navy px-7 py-3.5 text-sm">
                  {language === 'ar' ? 'فتح لوحة التحكم' : 'Open dashboard'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-navy-100 bg-white py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-4 mb-10">
            <div>
              <VoiagoLogo size="md" />
              <p className="mt-3 text-xs text-navy-400 leading-relaxed max-w-[200px]">
                {language === 'ar' ? 'سفر ذكي، أناقة بلا حدود.' : 'Smart travel, beautifully simple.'}
              </p>
              <div className="mt-4 flex gap-2">
                {[Facebook, Instagram, Phone].map((Icon, i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 text-navy-400 hover:bg-orange-500 hover:text-white transition cursor-pointer">
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                ))}
              </div>
            </div>
            <FooterCol title={language === 'ar' ? 'استكشف' : 'Explore'} items={[
              { l: language === 'ar' ? 'الوجهات' : 'Destinations', to: '#destinations' },
              { l: language === 'ar' ? 'الباقات' : 'Packages', to: '#packages' },
              { l: language === 'ar' ? 'العروض' : 'Offers', to: '#offers' },
            ]} />
            <FooterCol title={language === 'ar' ? 'حسابي' : 'Account'} items={[
              { l: language === 'ar' ? 'لوحة التحكم' : 'Dashboard', to: '/dashboard', route: true },
              { l: language === 'ar' ? 'الحجوزات' : 'Bookings', to: '/bookings', route: true },
              { l: language === 'ar' ? 'المحفظة' : 'Wallet', to: '/wallet', route: true },
              { l: language === 'ar' ? 'تسجيل الدخول' : 'Sign in', to: '/auth', route: true },
            ]} />
            <FooterCol title={language === 'ar' ? 'الشركة' : 'Company'} items={[
              { l: language === 'ar' ? 'عنا' : 'About', to: '#about' },
              { l: 'FAQ', to: '#faq' },
              { l: language === 'ar' ? 'الإدارة' : 'Admin', to: '/admin', route: true },
            ]} />
          </div>
          <div className="border-t border-navy-50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-navy-400">© {new Date().getFullYear()} Voiago. Crafted with care.</p>
            <div className="flex gap-4 text-xs text-navy-400">
              <a href="#" className="hover:text-navy-700">Privacy Policy</a>
              <a href="#" className="hover:text-navy-700">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <VoiagoAIChatbot />
    </div>
  );
}

function FooterCol({ title, items }: { title: string; items: { l: string; to: string; route?: boolean }[] }) {
  return (
    <div>
      <h4 className="text-sm font-bold text-navy-900 mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.l}>
            {it.route ? (
              <Link to={it.to as '/'} className="text-sm text-navy-400 hover:text-orange-500 transition">{it.l}</Link>
            ) : (
              <a href={it.to} className="text-sm text-navy-400 hover:text-orange-500 transition">{it.l}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
