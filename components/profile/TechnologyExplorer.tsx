import React from 'react';
import type { Language } from '../../types';
import { ProfilePill } from './ProfilePill';
import { formatDuration, profileCopy, type TechnologyInsight } from './profileContent';

type TechnologyExplorerProps = {
  activeTechnology: string | null;
  insights: TechnologyInsight[];
  language: Language;
  onSelectTechnology: (technology: string) => void;
};

export const TechnologyExplorer: React.FC<TechnologyExplorerProps> = ({
  activeTechnology,
  insights,
  language,
  onSelectTechnology,
}) => {
  const copy = profileCopy[language];
  const selectedInsight = insights.find((item) => item.name === activeTechnology) ?? insights[0];

  return (
    <section id="skills" className="rounded-[32px] border border-line bg-[rgba(8,13,31,0.56)] p-8 shadow-aurora">
      <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-4xl font-bold text-white">{copy.technologyLens}</h2>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">{copy.technologyLensLead}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {insights.slice(0, 12).map((insight) => (
          <button key={insight.name} onClick={() => onSelectTechnology(insight.name)} className="text-left">
            <ProfilePill tone={selectedInsight?.name === insight.name ? 'accent' : 'default'}>
              <span className="flex items-center gap-3">
                <span>{insight.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-400">{formatDuration(insight.totalMonths)}</span>
              </span>
            </ProfilePill>
          </button>
        ))}
      </div>

      {selectedInsight && (
        <div className="mt-8 grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="rounded-[24px] border border-line bg-[rgba(11,18,41,0.72)] p-6">
            <div className="text-sm uppercase tracking-[0.24em] text-slate-500">{copy.selectedHighlights}</div>
            <h3 className="mt-4 font-display text-4xl font-bold text-white">{selectedInsight.name}</h3>
            <p className="mt-3 text-slate-300">{formatDuration(selectedInsight.totalMonths)} total inferred hands-on exposure</p>
            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <div>{selectedInsight.entries.length} matching experience blocks</div>
              <div>{new Set(selectedInsight.entries.map((entry) => entry.company)).size} companies or client contexts</div>
            </div>
          </aside>

          <div className="space-y-4">
            {selectedInsight.entries.map((entry) => (
              <article key={`${selectedInsight.name}-${entry.company}-${entry.period}`} className="rounded-[24px] border border-line bg-[rgba(9,14,33,0.76)] p-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <h4 className="font-display text-2xl font-bold text-white">{entry.company}</h4>
                      <span className="text-lg text-slate-300">{entry.role}</span>
                    </div>
                    <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-500">{entry.period}</p>
                  </div>
                  <ProfilePill>{formatDuration(entry.months)}</ProfilePill>
                </div>
                <p className="mt-5 text-lg leading-8 text-slate-300">{entry.summary}</p>
                {entry.projects.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-3">
                    {entry.projects.map((project) => (
                      <ProfilePill key={`${entry.company}-${project}`}>{project}</ProfilePill>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
