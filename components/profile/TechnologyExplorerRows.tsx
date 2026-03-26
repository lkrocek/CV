import React from 'react';
import type { Language } from '../../types';
import { formatDuration, type TechnologyInsight } from './profileContent';

export const BarRow: React.FC<{
  insight: TechnologyInsight;
  maxMonths: number;
  isSelected: boolean;
  isDarkMode: boolean;
  language: Language;
  onSelect: () => void;
}> = ({ insight, maxMonths, isSelected, isDarkMode, language, onSelect }) => {
  const pct = (insight.totalMonths / maxMonths) * 100;
  return (
    <button onClick={onSelect} className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition-all duration-300 ${isSelected ? 'translate-x-1' : 'hover:translate-x-1 hover:scale-[1.01]'} ${isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100/80'}`}>
      <span className={`w-24 shrink-0 text-right text-sm font-medium transition-colors ${
        isSelected ? (isDarkMode ? 'text-white' : 'text-slate-900') : (isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-700')
      }`}>{insight.name}</span>
      <div className={`relative h-4 flex-1 overflow-hidden rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
        <div className="h-full rounded-full transition-all duration-500 group-hover:brightness-110" style={{ width: `${pct}%`, background: isSelected ? 'linear-gradient(90deg,#6366f1,#818cf8)' : (isDarkMode ? 'rgba(99,102,241,0.28)' : 'rgba(99,102,241,0.18)'), boxShadow: isSelected ? '0 0 24px rgba(129,140,248,0.22)' : 'none' }} />
      </div>
      <span className={`w-11 shrink-0 text-right text-xs tabular-nums transition-colors ${isSelected ? (isDarkMode ? 'text-indigo-300' : 'text-indigo-600') : 'text-slate-500'}`}>
        {formatDuration(insight.totalMonths, language)}
      </span>
    </button>
  );
};

export const TimelineRow: React.FC<{
  insight: TechnologyInsight;
  careerStart: number;
  careerTotal: number;
  companyColors: Map<string, string>;
  yearPcts: number[];
  isSelected: boolean;
  isDarkMode: boolean;
  language: Language;
  onSelect: () => void;
}> = ({ insight, careerStart, careerTotal, companyColors, yearPcts, isSelected, isDarkMode, language, onSelect }) => (
  <button onClick={onSelect} className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition-all duration-300 ${isSelected ? 'translate-x-1' : 'hover:translate-x-1 hover:scale-[1.01]'} ${isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100/80'}`}>
    <span className={`w-24 shrink-0 text-right text-sm font-medium transition-colors ${
      isSelected ? (isDarkMode ? 'text-white' : 'text-slate-900') : (isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-700')
    }`}>{insight.name}</span>
    <div className={`relative h-4 flex-1 overflow-hidden rounded-sm ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
      {yearPcts.map((pct) => <div key={pct} className="pointer-events-none absolute top-0 h-full w-px" style={{ left: `${pct}%`, background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' }} />)}
      {insight.entries.map((entry, i) => {
        const left = Math.max(0, ((entry.fromMonthIdx - careerStart) / careerTotal) * 100);
        const right = Math.min(100, ((entry.toMonthIdx - careerStart) / careerTotal) * 100);
        const width = Math.max(0.4, right - left);
        const color = companyColors.get(entry.company) ?? '#6366f1';
        return <div key={i} className="absolute top-0.5 bottom-0.5 rounded-sm transition-opacity" style={{ left: `${left}%`, width: `${width}%`, background: color, opacity: isSelected ? 0.9 : 0.5 }} />;
      })}
    </div>
    <span className={`w-11 shrink-0 text-right text-xs tabular-nums transition-colors ${isSelected ? (isDarkMode ? 'text-indigo-300' : 'text-indigo-600') : 'text-slate-500'}`}>
      {formatDuration(insight.totalMonths, language)}
    </span>
  </button>
);

export const CompanyRow: React.FC<{
  company: string;
  fromMonthIdx: number;
  toMonthIdx: number;
  careerStart: number;
  careerTotal: number;
  color: string;
  yearPcts: number[];
  isDarkMode: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  language?: Language;
}> = ({ company, fromMonthIdx, toMonthIdx, careerStart, careerTotal, color, yearPcts, isDarkMode, isSelected = false, onSelect }) => {
  const left = Math.max(0, ((fromMonthIdx - careerStart) / careerTotal) * 100);
  const right = Math.min(100, ((toMonthIdx - careerStart) / careerTotal) * 100);
  const width = Math.max(0.4, right - left);
  return (
    <button onClick={onSelect} className={`group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-1 text-left transition-all duration-300 ${isSelected ? 'translate-x-1' : 'hover:translate-x-1 hover:scale-[1.01]'} ${isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-100/80'}`}>
      <span className={`w-24 shrink-0 text-right text-sm font-medium transition-colors ${isSelected ? (isDarkMode ? 'text-white' : 'text-slate-900') : (isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-700')}`}>{company}</span>
      <div className={`relative h-4 flex-1 overflow-hidden rounded-sm ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
        {yearPcts.map((pct) => <div key={pct} className="pointer-events-none absolute top-0 h-full w-px" style={{ left: `${pct}%`, background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)' }} />)}
        <div className="absolute top-0.5 bottom-0.5 rounded-sm transition-all duration-300 group-hover:brightness-110" style={{ left: `${left}%`, width: `${width}%`, background: color, opacity: isSelected ? 0.92 : 0.75, boxShadow: isSelected ? `0 0 20px ${color}44` : 'none' }} />
      </div>
    </button>
  );
};
