import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, AlertTriangle, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickPrompts = [
  { en: 'Plan a 3-day Sharm El Sheikh trip', ar: 'خطط لرحلة 3 أيام في شرم الشيخ' },
  { en: 'Budget tracking tips', ar: 'نصائح لتتبع الميزانية' },
  { en: 'Emergency SOS help', ar: 'مساعدة طارئة' },
];

const isEmergency = (t: string) =>
  ['emergency', 'lost', 'accident', 'help', 'sos', 'hospital', 'police', 'طوارئ', 'حادث', 'مساعدة']
    .some((k) => t.toLowerCase().includes(k));

const getReply = (text: string): string => {
  if (isEmergency(text)) {
    return `[EMERGENCY PROTOCOL ACTIVATED]\n\nVoiago SOS is ready:\n\n• Global Emergency Hotline: +1-800-VOIAGO-SOS\n• Local Support: Fetching nearby hospital & embassy locations\n• Priority Dispatch: Notification generated\n\nRelax, stay where you are — our systems are on it.`;
  }
  if (/plan|itinerary|خطة|رحلة/.test(text.toLowerCase())) {
    return `*Voiago AI Itinerary*:\n\n**Day 1:** Arrival & orientation — settle in, explore your neighborhood.\n**Day 2:** Core exploration — curated local experiences tailored to your pace.\n**Day 3:** Discovery & departure — free time + priority lounge transfer.\n\n*Synced with your Trip Planner dashboard!*`;
  }
  if (/budget|wallet|cashback|محفظة|ميزانية/.test(text.toLowerCase())) {
    return `*Voiago Wallet Insights*:\n\n1. Book via verified partners for 4.5% instant cashback.\n2. Set a budget threshold in the Budget Tracker for automated alerts.\n3. Redeem loyalty points for hotel upgrades and flight discounts.`;
  }
  return `Thank you for contacting Voiago Concierge. I'm analyzing your request to provide the most premium, personalized travel recommendations. Ask me about bookings, budgeting, or local secrets!`;
};

export function VoiagoAIChatbot() {
  const { language, isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: language === 'ar'
        ? 'مرحباً بك في فويآجو! يمكنني مساعدتك في تخطيط الرحلات، تتبع الميزانية، أو دعم الطوارئ.'
        : 'Welcome to Voiago Premium Concierge! I can help you plan itineraries, track budgets, or provide emergency support.',
      timestamp: new Date(),
    },
  ]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    if (isEmergency(text)) setEmergencyMode(true);
    setMessages((prev) => [...prev, { id: Date.now().toString(), type: 'user', content: text, timestamp: new Date() }]);
    setInputValue('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), type: 'assistant', content: getReply(text), timestamp: new Date() }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* FAB trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-glow-orange transition hover:scale-110 active:scale-95"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex w-96 max-h-[620px] flex-col overflow-hidden rounded-3xl bg-white shadow-deep border border-navy-100 animate-scale-in"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className={`p-4 ${emergencyMode ? 'bg-red-600' : 'bg-navy-900'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                  {emergencyMode ? <AlertTriangle className="h-4 w-4 text-white" /> : <Sparkles className="h-4 w-4 text-white" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    {emergencyMode ? 'Voiago SOS Active' : (language === 'ar' ? 'مساعد فويآجو الذكي' : 'Voiago AI Concierge')}
                  </p>
                  <p className="text-[10px] text-white/60">
                    {emergencyMode ? 'Priority Connection' : (language === 'ar' ? 'متصل الآن' : 'Online now')}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition">
                <X className="h-5 w-5" />
              </button>
            </div>
            {emergencyMode && (
              <a href="tel:+1800VOIAGO" className="mt-2 block text-xs font-medium text-red-100 underline">
                Call Emergency Desk Directly
              </a>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 dark-scroll">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-orange-500 text-white rounded-br-sm'
                      : 'bg-navy-50 text-navy-800 rounded-bl-sm border border-navy-100'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-navy-50 border border-navy-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                  {[0, 0.15, 0.3].map((d, i) => (
                    <span key={i} className="h-2 w-2 rounded-full bg-navy-400 animate-bounce" style={{ animationDelay: `${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="mt-2 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-navy-400">
                  {language === 'ar' ? 'اقتراحات:' : 'Suggested:'}
                </p>
                {quickPrompts.map((p) => (
                  <button
                    key={p.en}
                    onClick={() => send(language === 'ar' ? p.ar : p.en)}
                    className="w-full text-left rounded-xl border border-azure-100 bg-azure-50 px-3 py-2 text-xs font-medium text-navy-700 hover:bg-azure-100 transition"
                    dir={isRtl ? 'rtl' : 'ltr'}
                  >
                    {language === 'ar' ? p.ar : p.en}
                  </button>
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-navy-100 p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(inputValue)}
              placeholder={language === 'ar' ? 'اكتب رسالتك...' : emergencyMode ? 'Type emergency details...' : 'Ask anything about travel...'}
              className="flex-1 rounded-xl border border-navy-100 bg-navy-50 px-3 py-2 text-sm outline-none focus:border-azure-400 focus:ring-azure transition"
              dir={isRtl ? 'rtl' : 'ltr'}
            />
            <button
              onClick={() => send(inputValue)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition active:scale-95"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
