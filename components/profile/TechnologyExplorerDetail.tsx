import React from 'react';
import type { Language } from '../../types';
import { ProfilePill } from './ProfilePill';
import { formatDuration, formatPeriod, profileCopy, type TechnologyInsight } from './profileContent';

type Entry = TechnologyInsight['entries'][number] & {
  projectDetails: Array<{ name: string; description: string; technologies?: string[]; from: string; to: string | null }>;
};

type Props = {
  selectedInsight: TechnologyInsight;
  selectedEntry: Entry | null;
  isDarkMode: boolean;
  language: Language;
  onSelectEntry: (key: string) => void;
  onClearSelection: () => void;
};

export const TechnologyExplorerDetail: React.FC<Props> = ({
  selectedInsight,
  selectedEntry,
  isDarkMode,
  language,
  onClearSelection,
  onSelectEntry,
}) => {
  const copy = profileCopy[language];
  const [showArrow, setShowArrow] = React.useState(!selectedEntry);
  const [showOverview, setShowOverview] = React.useState(!selectedEntry);

  React.useEffect(() => {
    if (selectedEntry) {
      setShowOverview(false);
      setShowArrow(false);
      const timer = globalThis.setTimeout(() => setShowArrow(true), 300);
      return () => globalThis.clearTimeout(timer);
    }
    setShowArrow(false);
    const timer = globalThis.setTimeout(() => setShowOverview(true), 300);
    return () => globalThis.clearTimeout(timer);
  }, [selectedEntry]);

  return (
    <div>
      <div
        className={`rounded-[20px] border p-5 ${
          isDarkMode ? 'border-cyan-400/12 bg-[rgba(8,17,42,0.82)]' : 'border-cyan-500/18 bg-[rgba(240,249,255,0.92)]'
        }`}
      >
        <div className={`overflow-hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 transition-[max-height,opacity] duration-300 ease-out ${selectedEntry || !showOverview ? 'max-h-0 opacity-0' : 'max-h-6 opacity-100'}`}>
          <div className="pb-1">{copy.selectedHighlights}</div>
        </div>
        <button
          onClick={selectedEntry ? onClearSelection : undefined}
          disabled={!selectedEntry}
          className={`relative flex min-h-12 w-full items-center text-left transition-colors duration-300 ${
            selectedEntry
              ? `cursor-pointer ${isDarkMode ? 'text-white hover:text-slate-200' : 'text-slate-900 hover:text-slate-700'}`
              : `cursor-default ${isDarkMode ? 'text-white' : 'text-slate-900'}`
          }`}
        >
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 transition-[transform,opacity] duration-300 ${
              selectedEntry && showArrow ? 'translate-x-0 opacity-100' : 'translate-x-[-0.6rem] opacity-0'
            } ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
              <path d="M6 3L1.5 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 8H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span
            className={`block min-w-0 font-display font-bold leading-none transition-[padding] duration-300 ${
              selectedEntry && showArrow ? 'pl-6 text-2xl' : 'pl-0 text-2xl'
            }`}
          >
            {selectedInsight.name}
          </span>
        </button>
        <div className={`overflow-hidden transition-[max-height,opacity,margin] duration-300 ease-out ${selectedEntry || !showOverview ? 'max-h-0 opacity-0' : 'mt-3 max-h-40 opacity-100'}`}>
          <div className={`pb-1 flex flex-wrap gap-x-5 gap-y-1 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            <span>
              <span className={isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}>{formatDuration(selectedInsight.totalMonths, language)}</span>{' '}
              {copy.technologyExposure}
            </span>
            <span>{selectedInsight.entries.length} {copy.matchingExperienceBlocks}</span>
            <span>{new Set(selectedInsight.entries.map((e) => e.company)).size} {copy.companyContexts}</span>
          </div>
        </div>
      </div>
      {!selectedEntry && (
        <div className="mt-3 space-y-2">
          {selectedInsight.entries.map((entry, idx) => {
            const key = `${selectedInsight.name}-${entry.company}-${idx}`;
            return (
              <button
                key={key}
                onClick={() => onSelectEntry(key)}
                className={`w-full rounded-2xl border p-4 text-left cursor-pointer transition-[border-color,background-color] duration-300 ${
                  isDarkMode ? 'border-[rgba(255,255,255,0.06)] bg-white/[0.03] hover:border-indigo-400/40 hover:bg-white/[0.05]' : 'border-slate-200/60 bg-white/70 hover:border-indigo-400/55 hover:bg-white/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{entry.company}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{entry.role}</span>
                    </div>
                    <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-slate-500">{entry.period}</div>
                  </div>
                  <ProfilePill isDarkMode={isDarkMode}>{formatDuration(entry.months, language)}</ProfilePill>
                </div>
                <div className={`mt-3 border-t pt-3 ${isDarkMode ? 'border-[rgba(255,255,255,0.06)]' : 'border-slate-200/60'}`}>
                  <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{entry.summary}</p>
                  {entry.projects.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{entry.projects.map((p) => <ProfilePill key={p} isDarkMode={isDarkMode}>{p}</ProfilePill>)}</div>}
                </div>
              </button>
            );
          })}
        </div>
      )}
      {selectedEntry && (
        <div className="mt-3 space-y-2">
          <div className={`w-full rounded-2xl border p-4 transition-all duration-300 ${isDarkMode ? 'border-[rgba(255,255,255,0.10)] bg-indigo-950/35 shadow-[0_16px_40px_rgba(79,70,229,0.14)]' : 'border-indigo-300/60 bg-indigo-50/70 shadow-[0_16px_40px_rgba(129,140,248,0.12)]'}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedEntry.company}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{selectedEntry.role}</span>
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-slate-500">{selectedEntry.period}</div>
              </div>
              <ProfilePill isDarkMode={isDarkMode}>{formatDuration(selectedEntry.months, language)}</ProfilePill>
            </div>
            <div className={`mt-3 border-t pt-3 ${isDarkMode ? 'border-[rgba(255,255,255,0.06)]' : 'border-slate-200/60'}`}>
              <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{selectedEntry.summary}</p>
            </div>
          </div>
          {selectedEntry.projectDetails.map((project) => (
            <div key={`${selectedEntry.company}-${project.name}`} className={`rounded-2xl border p-4 transition-[border-color] duration-300 ${isDarkMode ? 'border-emerald-400/10 bg-[rgba(10,18,34,0.9)] hover:border-emerald-400/35' : 'border-emerald-300/40 bg-[rgba(248,250,252,0.92)] hover:border-emerald-500/60'}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{project.name}</div>
                  <div className={`mt-0.5 text-xs uppercase tracking-[0.18em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{formatPeriod([project], language)}</div>
                </div>
              </div>
              <p className={`mt-3 text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{project.description}</p>
              {project.technologies?.length ? <div className="mt-3 flex flex-wrap gap-2">{project.technologies.map((tech) => <ProfilePill key={tech} isDarkMode={isDarkMode}>{tech}</ProfilePill>)}</div> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
