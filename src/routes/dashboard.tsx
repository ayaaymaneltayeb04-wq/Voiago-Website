import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Calendar, Wallet, ShieldAlert, MapPin, Clock, ArrowUpRight, ArrowDownLeft, Sparkles, Award, TrendingUp, Plus } from 'lucide-react';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';

export const Route = createFileRoute('/dashboard')({
  head: () => ({ meta: [{ title: 'Dashboard — Voiago' }] }),
  component: DashboardPage,
});

const activeItinerary = [
  { id: '1', time: '09:00 AM', title: 'Eco-Lodge Check-in & Orientation', desc: 'Arrive at the coastal resort, unlock your premium room with the Voiago digital key, meet your coordinator.', type: 'stay', icon: '🏨' },
  { id: '2', time: '02:30 PM', title: 'Guided Red Sea Reef Exploration', desc: 'A calm, small-group diving and exploration tour around protected maritime coral reefs.', type: 'explore', icon: '🤿' },
  { id: '3', time: '07:00 PM', title: 'Bedouin Cultural Dinner & Astronomy', desc: 'An authentic, slow-paced dining experience under the desert stars with local hosts.', type: 'food', icon: '🌟' },
];

const walletTx = [
  { id: 't1', title: 'Boutique Hotel Cashback', amount: '+$45.20', date: 'Today', type: 'credit' },
  { id: 't2', title: 'Eco-Tour Booking', amount: '-$120.00', date: 'Yesterday', type: 'debit' },
  { id: 't3', title: 'Voiago Reward Points', amount: '+500 pts', date: '1 Jun', type: 'points' },
];

export function DashboardPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'insights'>('itinerary');

  return (
    <DashboardLayout
      title={language === 'ar' ? `مرحباً, ${user?.name ?? 'مسافر'}` : `Welcome back, ${user?.name ?? 'Traveler'}`}
      subtitle={language === 'ar' ? 'نظرة عامة على نظام السفر الذكي الخاص بك' : 'Here is your smart travel ecosystem overview'}
    >
      {/* Stats grid */}
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: language === 'ar' ? 'المحطة الحالية' : 'Current Station',
            value: 'Sharm El Sheikh, EG',
            sub: language === 'ar' ? 'خطة 3 أيام فعّالة' : '3-Day Premium Plan Active',
            icon: MapPin,
            color: 'bg-azure-50 text-azure-600',
          },
          {
            label: language === 'ar' ? 'رصيد المحفظة' : 'Wallet Balance',
            value: '$1,420.50',
            sub: language === 'ar' ? 'يشمل 4.5% كاش باك' : 'Includes 4.5% cashback',
            icon: Wallet,
            color: 'bg-orange-50 text-orange-500',
          },
          {
            label: language === 'ar' ? 'نقاط الولاء' : 'Elite Points',
            value: '2,450',
            sub: language === 'ar' ? 'المستوى: Gold Wanderer' : 'Tier: Gold Wanderer',
            icon: Award,
            color: 'bg-amber-50 text-amber-600',
          },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-navy-900">{s.value}</p>
            <div>
              <p className="text-xs font-bold text-navy-700">{s.label}</p>
              <p className="text-[10px] text-navy-400 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link to="/emergency" className="flex items-center gap-1.5 rounded-xl bg-red-50 border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition">
          <ShieldAlert className="h-3.5 w-3.5" /> SOS Emergency Hub
        </Link>
        <Link to="/trip-planner" className="flex items-center gap-1.5 rounded-xl bg-azure-50 border border-azure-200 px-4 py-2 text-xs font-bold text-azure-600 hover:bg-azure-100 transition">
          <Plus className="h-3.5 w-3.5" /> New Trip
        </Link>
        <Link to="/wallet" className="flex items-center gap-1.5 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition">
          <Wallet className="h-3.5 w-3.5" /> Wallet
        </Link>
      </div>

      {/* Main 2-col layout */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Itinerary / Insights */}
        <div className="lg:col-span-2 card-premium p-6">
          {/* Tabs */}
          <div className="flex gap-1 rounded-xl bg-navy-50 p-1 mb-5 w-fit">
            {(['itinerary', 'insights'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${activeTab === t ? 'bg-white text-navy-900 shadow-soft' : 'text-navy-400 hover:text-navy-700'}`}
              >
                {t === 'itinerary' ? (language === 'ar' ? 'جدول اليوم' : 'Today\'s Plan') : (language === 'ar' ? 'رؤى' : 'Insights')}
              </button>
            ))}
          </div>

          {activeTab === 'itinerary' ? (
            <div className="space-y-4">
              {activeItinerary.map((item, i) => (
                <div key={item.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-50 text-xl flex-shrink-0">{item.icon}</div>
                    {i < activeItinerary.length - 1 && <div className="w-px flex-1 bg-navy-100 mt-2 min-h-[24px]" />}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-orange-500">{item.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-navy-900">{item.title}</h4>
                    <p className="text-xs text-navy-400 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-2xl bg-azure-50 border border-azure-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-azure-600" />
                  <span className="text-sm font-bold text-azure-800">
                    {language === 'ar' ? 'رؤى شرم الشيخ' : 'Sharm El Sheikh Insights'}
                  </span>
                </div>
                <p className="text-sm text-azure-700 leading-relaxed">
                  Known as the City of Peace. Our systems verified optimal safety indexes, high premium infrastructure scores, and strong cultural compliance across all partner spots.
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-bold text-emerald-800">
                    {language === 'ar' ? 'توصية فويآجو' : 'Voiago Suggestion'}
                  </span>
                </div>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  Visit the Nabq Protected Area during the morning window to minimize crowd footprint and maximize tranquility.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Wallet activity */}
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-navy-900">{language === 'ar' ? 'نشاط المحفظة' : 'Wallet Activity'}</h3>
            <Link to="/wallet" className="text-xs text-azure-600 font-semibold hover:text-azure-700">
              {language === 'ar' ? 'عرض الكل' : 'View all'}
            </Link>
          </div>
          <div className="space-y-3">
            {walletTx.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 rounded-xl bg-navy-50 px-4 py-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl flex-shrink-0 ${tx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : tx.type === 'debit' ? 'bg-orange-100 text-orange-600' : 'bg-azure-100 text-azure-600'}`}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="h-4 w-4" /> : tx.type === 'debit' ? <ArrowUpRight className="h-4 w-4" /> : <Award className="h-4 w-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-navy-800 truncate">{tx.title}</p>
                  <p className="text-[10px] text-navy-400">{tx.date}</p>
                </div>
                <span className={`text-sm font-bold flex-shrink-0 ${tx.type === 'credit' || tx.type === 'points' ? 'text-emerald-600' : 'text-orange-500'}`}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
