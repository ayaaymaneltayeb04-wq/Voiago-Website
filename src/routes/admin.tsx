import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { VoiagoLogo } from '../components/VoiagoLogo';
import { Users, BarChart3, DollarSign, Star, Mail, Lock, Shield, AlertTriangle } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  head: () => ({ meta: [{ title: 'Admin Dashboard — Voiago' }] }),
  component: AdminPage,
});

const ADMIN_EMAIL = 'admin@voiago.com';
const ADMIN_PASS = 'VoiagoAdmin2026';

const stats = [
  { label: 'Total Users', value: '24,832', change: '+12%', icon: Users, color: 'bg-azure-50 text-azure-700' },
  { label: 'Bookings This Month', value: '3,214', change: '+8%', icon: BarChart3, color: 'bg-orange-50 text-orange-600' },
  { label: 'Revenue (MTD)', value: '$142K', change: '+22%', icon: DollarSign, color: 'bg-emerald-50 text-emerald-700' },
  { label: 'Avg Rating', value: '4.9 / 5', change: '+0.1', icon: Star, color: 'bg-amber-50 text-amber-600' },
];

function AdminLogin() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      login({ id: 'admin-1', name: 'Admin', email, role: 'admin' });
      navigate({ to: '/admin' });
    } else {
      setError('Invalid credentials. Hint: admin@voiago.com / VoiagoAdmin2026');
    }
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-scale-in">
        <div className="rounded-4xl bg-white shadow-deep p-8">
          <div className="text-center mb-8">
            <VoiagoLogo size="lg" />
            <div className="flex items-center justify-center gap-2 mt-4">
              <Shield className="h-5 w-5 text-orange-500" />
              <h1 className="text-xl font-black text-navy-900">{t('admin.signin_title')}</h1>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('admin.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field pl-10" placeholder="admin@voiago.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('admin.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} required className="input-field pl-10" placeholder="••••••••" />
              </div>
            </div>
            {error && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}
            <button type="submit" className="btn-cta w-full py-3.5 text-sm">{t('admin.login')}</button>
          </form>
          <div className="text-center mt-5">
            <Link to="/" className="text-sm text-navy-400 hover:text-navy-700 transition">← Back to home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { t, language } = useLanguage();

  return (
    <DashboardLayout title={t('admin.title')} subtitle={t('admin.subtitle')}>
      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="badge bg-emerald-50 text-emerald-700">{s.change}</span>
            </div>
            <p className="text-2xl font-black text-navy-900">{s.value}</p>
            <p className="text-xs font-medium text-navy-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* User table placeholder */}
      <div className="card-premium p-6">
        <h3 className="text-sm font-bold text-navy-800 mb-4">{language === 'ar' ? 'أحدث المستخدمين' : 'Recent Users'}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-100">
                {['Name', 'Email', 'Role', 'Joined', 'Status'].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-bold text-navy-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {[
                { name: 'Aya Ayman', email: 'aya@voiago.com', role: 'Traveler', joined: 'Jun 1, 2026', status: 'Active' },
                { name: 'Mohamed Ali', email: 'mo@voiago.com', role: 'Traveler', joined: 'May 28, 2026', status: 'Active' },
                { name: 'Sarah K.', email: 'sarah@voiago.com', role: 'Partner', joined: 'May 20, 2026', status: 'Active' },
              ].map((u) => (
                <tr key={u.email}>
                  <td className="py-3 font-semibold text-navy-900">{u.name}</td>
                  <td className="py-3 text-navy-500">{u.email}</td>
                  <td className="py-3"><span className="badge bg-azure-50 text-azure-700">{u.role}</span></td>
                  <td className="py-3 text-navy-500">{u.joined}</td>
                  <td className="py-3"><span className="badge bg-emerald-50 text-emerald-700">{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AdminPage() {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || role !== 'admin') return <AdminLogin />;
  return <AdminDashboard />;
}
