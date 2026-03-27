import React from 'react';
import type { Language } from '../../types';
import { profileCopy } from './profileContent';
import type { SortDirection, ViewMode } from './technologyExplorerState';

type TechnologyExplorerHeaderProps = {
  isDarkMode: boolean;
  language: Language;
  sortDirection: SortDirection;
  viewMode: ViewMode;
  onSortToggle: () => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const TechnologyExplorerHeader: React.FC<TechnologyExplorerHeaderProps> = ({
  isDarkMode,
  language,
  sortDirection,
  viewMode,
  onSortToggle,
  onViewModeChange,
}) => {
  const copy = profileCopy[language];
  const [isBlinking, setIsBlinking] = React.useState(false);

  React.useEffect(() => {
    const startBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 2500);
    };

    if (document.body.classList.contains('splash-done')) {
      startBlink();
      return;
    }

    globalThis.addEventListener('splashDismissed', startBlink, { once: true });
    return () => globalThis.removeEventListener('splashDismissed', startBlink);
  }, []);
  const isChronologicalView = viewMode === 'timeline' || viewMode === 'companies';
  const sortLabel = isChronologicalView
    ? (sortDirection === 'desc' ? copy.sortNewestFirst : copy.sortOldestFirst)
    : (sortDirection === 'desc' ? copy.sortDescending : copy.sortAscending);
  const tabs: { mode: ViewMode; label: string }[] = [
    { mode: 'duration', label: copy.viewByDuration },
    { mode: 'timeline', label: copy.viewByTimeline },
    { mode: 'companies', label: copy.viewByCompanies },
  ];

  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className={`font-display text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {copy.technologyLens}
        </h2>
        <p className={`mt-2 text-sm leading-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {copy.technologyLensLead}
        </p>
      </div>

      <div className="flex w-full flex-1 flex-wrap items-center justify-between gap-2 self-start">
        <div
          className={`flex rounded-xl p-1 text-sm font-medium ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'} ${isBlinking ? 'tabs-blink' : ''}`}
          style={{ boxShadow: '0 0 8px 2px rgba(99, 102, 241, 0.22)' }}
        >
          {tabs.map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`cursor-pointer rounded-lg px-4 py-1.5 transition-all ${
                viewMode === mode
                  ? isDarkMode ? 'bg-indigo-600 text-white shadow' : 'bg-white text-slate-900 shadow'
                  : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          onClick={onSortToggle}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
            isDarkMode
              ? 'border-[rgba(255,255,255,0.08)] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06]'
              : 'border-[rgba(148,163,184,0.24)] bg-white/80 text-slate-600 hover:bg-white'
          }`}
        >
          <span
            className={`inline-flex h-4 w-4 items-center justify-center transition-transform ${
              sortDirection === 'desc' ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
              <path d="M8 3.5V12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4.75 6.75L8 3.5L11.25 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {sortLabel}
        </button>
      </div>
    </div>
  );
};
