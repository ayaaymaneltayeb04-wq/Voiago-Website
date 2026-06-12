import { useState } from 'react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { Mail, Lock, User, Eye, EyeOff, Globe, DollarSign, Plane } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { useLanguage } from '../lib/LanguageContext';
import { VoiagoLogo } from '../components/VoiagoLogo';

export const Route = createFileRoute('/auth')({
  head: () => ({ meta: [{ title: 'Sign In — Voiago' }] }),
  component: AuthPage,
});

function AuthPage() {
  const { t, language, isRtl } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'traveler' | 'admin'>('traveler');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { id: Date.now().toString(), name: name || email.split('@')[0], email, role };
    login(user);
    navigate({ to: role === 'admin' ? '/admin' : '/dashboard' });
  };

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4 py-20 relative overflow-hidden" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-azure-500/10 blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-orange-500/10 blur-3xl animate-float animate-delay-300 pointer-events-none" />

      <div className="relative w-full max-w-md animate-scale-in">
        {/* Card */}
        <div className="rounded-4xl bg-white shadow-deep p-8 md:p-10">
          {/* Logo + header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <VoiagoLogo size="lg" />
            </div>
            <h1 className="text-2xl font-black text-navy-900">
              {mode === 'signin' ? t('auth.title.signin') : t('auth.title.signup')}
            </h1>
            <p className="text-sm text-navy-400 mt-2">
              {mode === 'signin' ? t('auth.subtitle.signin') : t('auth.subtitle.signup')}
            </p>
          </div>

          {/* Role selector */}
          <div className="flex rounded-2xl bg-navy-50 p-1 mb-6 gap-1">
            {(['traveler', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all ${role === r ? 'bg-navy-900 text-white shadow-soft' : 'text-navy-500 hover:text-navy-800'}`}
              >
                {r === 'traveler' ? (
                  <><Plane className="inline h-3.5 w-3.5 mr-1" />{t('auth.role.traveler')}</>
                ) : (
                  <><Globe className="inline h-3.5 w-3.5 mr-1" />{t('auth.role.admin')}</>
                )}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('auth.fullname')}</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input-field pl-10" placeholder="Your full name" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('auth.email')}</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field pl-10" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('auth.password')}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field pl-10 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-300 hover:text-navy-600 transition">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-navy-500 mb-1.5">{t('auth.currency')}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="input-field pl-10 appearance-none cursor-pointer">
                    {['USD', 'EUR', 'EGP', 'SAR', 'AED'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            <button type="submit" className="btn-cta w-full py-3.5 text-sm mt-2">
              {mode === 'signin' ? t('auth.button.signin') : t('auth.button.signup')}
            </button>
          </form>

          {/* Toggle */}
          <p className="mt-6 text-center text-sm text-navy-400">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}
            {' '}
            <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="font-semibold text-orange-500 hover:text-orange-600 transition">
              {mode === 'signin' ? t('auth.title.signup') : t('auth.title.signin')}
            </button>
          </p>

          <p className="mt-4 text-center text-[11px] text-navy-300">
            {t('auth.terms_text')}{' '}
            <a href="#" className="underline hover:text-navy-500">{t('auth.terms_link')}</a>
            {' & '}
            <a href="#" className="underline hover:text-navy-500">{t('auth.privacy_link')}</a>
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-azure-300/70 hover:text-white transition">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
