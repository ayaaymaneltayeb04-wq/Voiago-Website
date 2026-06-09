import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Plus, Minus, Wallet } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

const COLORS = ['#0d9488', '#f59e0b', '#8b5cf6', '#ec4899', '#64748b'];

const data = [
  { name: 'Accommodation', value: 450, color: COLORS[0] },
  { name: 'Food', value: 320, color: COLORS[1] },
  { name: 'Transport', value: 180, color: COLORS[2] },
  { name: 'Activities', value: 280, color: COLORS[3] },
  { name: 'Other', value: 75, color: COLORS[4] },
];

export function BudgetTracker() {
  const { t } = useLanguage();
  const [budget, setBudget] = useState(3500);
  const [spent, setSpent] = useState(1305);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 dark:text<think>">{t('wallet_expense_breakdown')}</h3>
        <Wallet className="h-5 w-5 text-slate-400" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('common_spent')}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text<think>">${spent.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('common_budget')}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text<think>">${budget.toLocaleString()}</p>
        </div>
      </div>

      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value}`, '']}
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
            </div>
            <span className="text-sm font-medium text-slate-900 dark:text<think>">${item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setSpent((s) => s + 50)}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {t('common_add')}
        </button>
        <button
          onClick={() => setSpent((s) => Math.max(0, s - 50))}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <Minus className="h-4 w-4" />
          {t('common_remove')}
        </button>
      </div>
    </div>
  );
}
