import { useState } from 'react';
import { PlusCircle, Trash2, TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { PieChart as RechartPie, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../lib/LanguageContext';

interface Expense {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

const COLORS = ['#0a9aff', '#ff8c00', '#1e3a5f', '#36aaff', '#ffa02a'];

const CATEGORIES = ['Flights', 'Hotels', 'Food', 'Transport', 'Activities', 'Other'];

const defaultExpenses: Expense[] = [
  { id: '1', name: 'Cairo → Dubai Flight', amount: 480, category: 'Flights', date: '2026-06-15' },
  { id: '2', name: 'Burj Al Arab Hotel', amount: 600, category: 'Hotels', date: '2026-06-15' },
  { id: '3', name: 'Dinner at Nobu', amount: 120, category: 'Food', date: '2026-06-16' },
  { id: '4', name: 'Desert Safari', amount: 90, category: 'Activities', date: '2026-06-17' },
];

export function BudgetTracker() {
  const { language } = useLanguage();
  const [budget, setBudget] = useState(2000);
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Flights');
  const [showForm, setShowForm] = useState(false);

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;
  const pct = Math.min((totalSpent / budget) * 100, 100);

  const chartData = CATEGORIES
    .map((cat) => ({ name: cat, value: expenses.filter((e) => e.category === cat).reduce((s, e) => s + e.amount, 0) }))
    .filter((d) => d.value > 0);

  const addExpense = () => {
    if (!newName || !newAmount) return;
    setExpenses((prev) => [...prev, { id: Date.now().toString(), name: newName, amount: Number(newAmount), category: newCategory, date: new Date().toISOString().split('T')[0] }]);
    setNewName(''); setNewAmount(''); setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Budget overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: language === 'ar' ? 'الميزانية الكلية' : 'Total Budget', value: `$${budget.toLocaleString()}`, icon: DollarSign, color: 'bg-navy-100 text-navy-700' },
          { label: language === 'ar' ? 'المصروف' : 'Spent', value: `$${totalSpent.toLocaleString()}`, icon: ArrowUpRight, color: 'bg-orange-50 text-orange-600' },
          { label: language === 'ar' ? 'المتبقي' : 'Remaining', value: `$${remaining.toLocaleString()}`, icon: TrendingUp, color: remaining < 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-black text-navy-900">{s.value}</p>
            <p className="text-xs text-navy-400 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="card-premium p-5">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold text-navy-700">{language === 'ar' ? 'نسبة الإنفاق' : 'Budget Used'}</span>
          <span className={`font-bold ${pct >= 90 ? 'text-red-500' : pct >= 70 ? 'text-orange-500' : 'text-emerald-600'}`}>{pct.toFixed(0)}%</span>
        </div>
        <div className="h-3 rounded-full bg-navy-100 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-orange-500' : 'bg-azure-500'}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-navy-400 mt-1">
          <span>$0</span>
          <span>${budget.toLocaleString()}</span>
        </div>
      </div>

      {/* Pie chart + expenses */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Chart */}
        <div className="card-premium p-5">
          <h3 className="text-sm font-bold text-navy-800 mb-4 flex items-center gap-2">
            <PieChart className="h-4 w-4 text-azure-500" />
            {language === 'ar' ? 'توزيع المصروفات' : 'Expense Breakdown'}
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <RechartPie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
              {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </RechartPie>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-3">
            {chartData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-navy-600">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name}
              </div>
            ))}
          </div>
        </div>

        {/* Expenses list */}
        <div className="card-premium p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-navy-800">{language === 'ar' ? 'قائمة المصروفات' : 'Expense List'}</h3>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition"
            >
              <PlusCircle className="h-4 w-4" /> {language === 'ar' ? 'إضافة' : 'Add'}
            </button>
          </div>

          {showForm && (
            <div className="mb-4 space-y-2 rounded-xl border border-azure-100 bg-azure-50 p-3">
              <input className="input-field text-xs" placeholder="Expense name" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <div className="flex gap-2">
                <input className="input-field text-xs flex-1" placeholder="$" type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
                <select className="input-field text-xs flex-1" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={addExpense} className="btn-cta w-full py-2 text-xs">Add Expense</button>
            </div>
          )}

          <div className="space-y-2 max-h-48 overflow-y-auto">
            {expenses.map((e, i) => (
              <div key={e.id} className="flex items-center justify-between gap-2 rounded-xl bg-navy-50 px-3 py-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: COLORS[CATEGORIES.indexOf(e.category) % COLORS.length] }} />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-navy-800 truncate">{e.name}</p>
                    <p className="text-[10px] text-navy-400">{e.category} · {e.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">${e.amount}</span>
                  <button onClick={() => setExpenses((prev) => prev.filter((x) => x.id !== e.id))} className="text-navy-300 hover:text-red-400 transition">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
