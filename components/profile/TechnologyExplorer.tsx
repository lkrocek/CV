import React, { useMemo } from 'react';
import type { Language } from '../../types';
import { formatDuration, profileCopy, type TechnologyInsight } from './profileContent';
import { TechnologyExplorerDetail } from './TechnologyExplorerDetail';
import { TechnologyExplorerHeader } from './TechnologyExplorerHeader';
import { TechnologyExplorerChart } from './TechnologyExplorerChart';
import { TechnologyExplorerEntryCard } from './TechnologyExplorerEntryCard';
import {
  TechnologyExplorerCompanyPanel,
  type CompanyDetail,
  type CompanyDetailRole,
} from './TechnologyExplorerCompanyPanel';
import { useTechnologyExplorerState } from './technologyExplorerState';

const COMPANY_PALETTE = ['#818cf8', '#34d399', '#f472b6', '#fb923c', '#60a5fa', '#a78bfa', '#4ade80', '#facc15'];

type TechnologyExplorerProps = {
  activeTechnology: string | null;
  insights: TechnologyInsight[];
  isDarkMode: boolean;
  language: Language;
  onSelectTechnology: (technology: string) => void;
};

export const TechnologyExplorer: React.FC<TechnologyExplorerProps> = ({
  activeTechnology,
  insights,
  isDarkMode,
  language,
  onSelectTechnology,
}) => {
  const {
    viewMode,
    setViewMode,
    sortDirection,
    setSortDirection,
    selectedEntryKey,
    setSelectedEntryKey,
    selectedCompany,
    setSelectedCompany,
  } = useTechnologyExplorerState({
    activeTechnology,
    onSelectTechnology,
  });

  const copy = profileCopy[language];

  const sortedInsights = useMemo(() => {
    const base = [...insights].sort((left, right) => right.totalMonths - left.totalMonths);
    return sortDirection === 'asc' ? base.reverse() : base;
  }, [insights, sortDirection]);

  const timelineData = useMemo(() => {
    if (viewMode !== 'timeline' && viewMode !== 'companies') return null;

    const timelineSorted = [...insights].sort((left, right) => {
      const leftFirst = Math.min(...left.entries.map((entry) => entry.fromMonthIdx));
      const rightFirst = Math.min(...right.entries.map((entry) => entry.fromMonthIdx));
      return sortDirection === 'asc' ? rightFirst - leftFirst : leftFirst - rightFirst;
    });

    const allEntries = insights.flatMap((insight) => insight.entries);
    const careerStart = Math.min(...allEntries.map((entry) => entry.fromMonthIdx));
    const careerEnd = Math.max(...allEntries.map((entry) => entry.toMonthIdx));
    const careerTotal = careerEnd - careerStart;

    const companiesByFirst = [...new Set(
      [...allEntries].sort((left, right) => left.fromMonthIdx - right.fromMonthIdx).map((entry) => entry.company),
    )];
    const companyColors = new Map(
      companiesByFirst.map((company, index) => [company, COMPANY_PALETTE[index % COMPANY_PALETTE.length]]),
    );

    const startYear = Math.ceil(careerStart / 12);
    const endYear = Math.floor(careerEnd / 12);
    const step = (endYear - startYear) > 14 ? 2 : 1;
    const yearTicks: { year: number; pct: number }[] = [];
    for (let year = startYear; year <= endYear; year += step) {
      const pct = ((year * 12 - careerStart) / careerTotal) * 100;
      if (pct >= 0 && pct <= 100) yearTicks.push({ year, pct });
    }

    return { timelineSorted, careerStart, careerTotal, companyColors, companiesByFirst, yearTicks };
  }, [insights, sortDirection, viewMode]);

  const companiesData = useMemo(() => {
    if (viewMode !== 'companies' || !timelineData) return null;

    const map = new Map<string, { fromMonthIdx: number; toMonthIdx: number }>();
    for (const insight of insights) {
      for (const entry of insight.entries) {
        const existing = map.get(entry.company);
        if (!existing) {
          map.set(entry.company, { fromMonthIdx: entry.fromMonthIdx, toMonthIdx: entry.toMonthIdx });
          continue;
        }

        map.set(entry.company, {
          fromMonthIdx: Math.min(existing.fromMonthIdx, entry.fromMonthIdx),
          toMonthIdx: Math.max(existing.toMonthIdx, entry.toMonthIdx),
        });
      }
    }

    const rows = [...map.entries()]
      .sort((left, right) => (
        sortDirection === 'asc'
          ? right[1].fromMonthIdx - left[1].fromMonthIdx
          : left[1].fromMonthIdx - right[1].fromMonthIdx
      ))
      .map(([company, range]) => ({ company, ...range }));

    return {
      rows,
      careerStart: timelineData.careerStart,
      careerTotal: timelineData.careerTotal,
      companyColors: timelineData.companyColors,
      yearTicks: timelineData.yearTicks,
    };
  }, [insights, sortDirection, timelineData, viewMode]);

  const companyDetails = useMemo(() => {
    const roleMap = new Map<string, CompanyDetailRole>();

    for (const insight of insights) {
      for (const entry of insight.entries) {
        const key = [entry.company, entry.role, entry.period, entry.summary].join('\x00');
        const existing = roleMap.get(key);

        if (!existing) {
          roleMap.set(key, {
            company: entry.company,
            role: entry.role,
            period: entry.period,
            months: entry.months,
            summary: entry.summary,
            projects: [...entry.projects],
            projectDetails: [...entry.projectDetails],
            technologies: [insight.name],
            fromMonthIdx: entry.fromMonthIdx,
            toMonthIdx: entry.toMonthIdx,
          });
          continue;
        }

        existing.months = Math.max(existing.months, entry.months);
        existing.fromMonthIdx = Math.min(existing.fromMonthIdx, entry.fromMonthIdx);
        existing.toMonthIdx = Math.max(existing.toMonthIdx, entry.toMonthIdx);
        existing.projects = [...new Set([...existing.projects, ...entry.projects])];
        existing.technologies = [...new Set([...existing.technologies, insight.name])];

        const projectMap = new Map(existing.projectDetails.map((project) => [`${project.name}-${project.from}-${project.to ?? 'now'}`, project]));
        for (const project of entry.projectDetails) {
          projectMap.set(`${project.name}-${project.from}-${project.to ?? 'now'}`, project);
        }
        existing.projectDetails = [...projectMap.values()];
      }
    }

    const companyMap = new Map<string, CompanyDetail>();
    for (const role of roleMap.values()) {
      const existing = companyMap.get(role.company);
      if (!existing) {
        companyMap.set(role.company, {
          company: role.company,
          totalMonths: role.toMonthIdx - role.fromMonthIdx + 1,
          roleCount: 1,
          technologyCount: role.technologies.length,
          roles: [role],
        });
        continue;
      }

      existing.roles.push(role);
      existing.roleCount += 1;
      existing.totalMonths = Math.max(existing.totalMonths, role.toMonthIdx - Math.min(...existing.roles.map((item) => item.fromMonthIdx)) + 1);
      existing.technologyCount = new Set(existing.roles.flatMap((item) => item.technologies)).size;
    }

    return [...companyMap.values()].sort((left, right) => right.totalMonths - left.totalMonths);
  }, [insights]);

  const selectedCompanyDetail = useMemo(() => {
    if (!companyDetails.length) return null;

    if (selectedCompany) {
      return companyDetails.find((item) => item.company === selectedCompany) ?? null;
    }

    const fallbackCompany = companiesData?.rows[0]?.company;
    return companyDetails.find((item) => item.company === fallbackCompany) ?? companyDetails[0];
  }, [companiesData, companyDetails, selectedCompany]);

  const selectedInsight = useMemo(() => {
    if (activeTechnology) {
      return insights.find((insight) => insight.name === activeTechnology) ?? null;
    }

    if (viewMode === 'timeline' && timelineData?.timelineSorted.length) {
      return timelineData.timelineSorted[0];
    }

    if (viewMode === 'duration' && sortedInsights.length) {
      return sortedInsights[0];
    }

    return insights[0] ?? null;
  }, [activeTechnology, insights, sortedInsights, timelineData, viewMode]);

  const maxMonths = insights.reduce((max, insight) => Math.max(max, insight.totalMonths), 1);
  const selectedEntry = selectedInsight?.entries.find((entry, index) => `${selectedInsight.name}-${entry.company}-${index}` === selectedEntryKey) ?? null;

  React.useEffect(() => {
    if (viewMode === 'companies' && !selectedCompany && companiesData?.rows.length) {
      setSelectedCompany(companiesData.rows[0].company);
    }
  }, [companiesData, selectedCompany, setSelectedCompany, viewMode]);

  return (
    <section
      id="skills"
      className={`scroll-mt-28 rounded-[32px] border p-8 shadow-aurora ${
        isDarkMode
          ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(8,13,31,0.56)]'
          : 'border-[rgba(148,163,184,0.24)] bg-[rgba(255,255,255,0.74)]'
      }`}
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0">
          <TechnologyExplorerHeader
            isDarkMode={isDarkMode}
            language={language}
            sortDirection={sortDirection}
            viewMode={viewMode}
            onSortToggle={() => setSortDirection((current) => current === 'desc' ? 'asc' : 'desc')}
            onViewModeChange={setViewMode}
          />

          <TechnologyExplorerChart
            companiesData={companiesData}
            isDarkMode={isDarkMode}
            language={language}
            maxMonths={maxMonths}
            onSelectCompany={setSelectedCompany}
            onSelectTechnology={onSelectTechnology}
            selectedCompany={selectedCompanyDetail?.company ?? null}
            selectedTechnology={selectedInsight?.name ?? null}
            sortedInsights={sortedInsights}
            timelineData={timelineData}
            viewMode={viewMode}
          />
        </div>

        {viewMode === 'companies' && selectedCompanyDetail && (
          <TechnologyExplorerCompanyPanel
            companyDetail={selectedCompanyDetail}
            isDarkMode={isDarkMode}
            language={language}
          />
        )}

        {selectedInsight && viewMode !== 'companies' && (
          <div className="xl:sticky xl:top-28 xl:self-start">
            <TechnologyExplorerDetail
              selectedInsight={selectedInsight}
              selectedEntry={selectedEntry}
              isDarkMode={isDarkMode}
              language={language}
              selectedEntryKey={selectedEntryKey}
              onClearSelection={() => setSelectedEntryKey(null)}
              onSelectEntry={setSelectedEntryKey}
            />

            {!selectedEntry && (
              <div className="mt-3 space-y-2">
                {selectedInsight.entries.map((entry, index) => {
                  const key = `${selectedInsight.name}-${entry.company}-${index}`;
                  return (
                    <TechnologyExplorerEntryCard
                      key={key}
                      company={entry.company}
                      role={entry.role}
                      period={entry.period}
                      months={entry.months}
                      summary={entry.summary}
                      projects={entry.projects}
                      isDarkMode={isDarkMode}
                      language={language}
                      onClick={() => setSelectedEntryKey(key)}
                    />
                  );
                })}
              </div>
            )}

            {selectedEntry && (
              <div className="mt-3 space-y-2">
                <TechnologyExplorerEntryCard
                  company={selectedEntry.company}
                  role={selectedEntry.role}
                  period={selectedEntry.period}
                  months={selectedEntry.months}
                  summary={selectedEntry.summary}
                  projects={[]}
                  isDarkMode={isDarkMode}
                  language={language}
                  selected
                />

                <div className="space-y-2 pt-1">
                  {selectedEntry.projectDetails.map((project) => (
                    <div
                      key={`${selectedEntry.company}-${project.name}`}
                      className={`rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${
                        isDarkMode ? 'border-emerald-400/10 bg-[rgba(10,18,34,0.9)] hover:border-emerald-300/16' : 'border-emerald-300/40 bg-[rgba(248,250,252,0.92)] hover:border-emerald-400/50'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{project.name}</div>
                        <div className={`mt-0.5 text-xs uppercase tracking-[0.18em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {project.from} {project.to ? `- ${project.to}` : `- ${copy.present}`}
                        </div>
                      </div>
                      <p className={`mt-3 text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {project.description}
                      </p>
                      {project.technologies?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`rounded-full border px-3 py-1.5 text-sm ${
                                isDarkMode ? 'border-[rgba(255,255,255,0.12)] text-slate-200' : 'border-slate-200 text-slate-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
