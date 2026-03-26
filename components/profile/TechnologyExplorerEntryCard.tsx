import React from 'react';
import type { Language } from '../../types';
import { ProfilePill } from './ProfilePill';
import { formatDuration } from './profileContent';

type TechnologyExplorerEntryCardProps = {
  company: string;
  role: string;
  period: string;
  months: number;
  summary: string;
  projects: string[];
  isDarkMode: boolean;
  language: Language;
  onClick?: () => void;
  selected?: boolean;
};

export const TechnologyExplorerEntryCard: React.FC<TechnologyExplorerEntryCardProps> = ({
  company,
  role,
  period,
  months,
  summary,
  projects,
  isDarkMode,
  language,
  onClick,
  selected = false,
}) => (
  <div
    role={onClick ? 'button' : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={(event) => {
      if (onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick();
      }
    }}
    className={`w-full rounded-2xl border p-4 text-left ${
      onClick ? 'cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01]' : ''
    } ${
      isDarkMode
        ? selected
          ? 'border-[rgba(255,255,255,0.10)] bg-indigo-950/35 shadow-[0_16px_40px_rgba(79,70,229,0.14)]'
          : 'border-[rgba(255,255,255,0.06)] bg-white/[0.03] hover:border-indigo-300/18 hover:bg-white/[0.05]'
        : selected
          ? 'border-indigo-300/60 bg-indigo-50/70 shadow-[0_16px_40px_rgba(129,140,248,0.12)]'
          : 'border-slate-200/60 bg-white/70 hover:border-indigo-300/50 hover:bg-white/90'
    }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company}</span>
          <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{role}</span>
        </div>
        <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-slate-500">{period}</div>
      </div>
      <ProfilePill isDarkMode={isDarkMode}>{formatDuration(months, language)}</ProfilePill>
    </div>

    <div className={`mt-3 border-t pt-3 ${isDarkMode ? 'border-[rgba(255,255,255,0.06)]' : 'border-slate-200/60'}`}>
      <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{summary}</p>
      {projects.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {projects.map((project) => (
            <ProfilePill key={project} isDarkMode={isDarkMode}>{project}</ProfilePill>
          ))}
        </div>
      )}
    </div>
  </div>
);
