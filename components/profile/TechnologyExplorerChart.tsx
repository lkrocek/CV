import React from 'react';
import type { Language } from '../../types';
import type { TechnologyInsight } from './profileContent';
import { BarRow as ExplorerBarRow, CompanyRow as ExplorerCompanyRow, TimelineRow as ExplorerTimelineRow } from './TechnologyExplorerRows';
import type { ViewMode } from './technologyExplorerState';

type TimelineData = {
  timelineSorted: TechnologyInsight[];
  careerStart: number;
  careerTotal: number;
  companyColors: Map<string, string>;
  companiesByFirst: string[];
  yearTicks: { year: number; pct: number }[];
};

type CompaniesData = {
  rows: Array<{ company: string; fromMonthIdx: number; toMonthIdx: number }>;
  careerStart: number;
  careerTotal: number;
  companyColors: Map<string, string>;
  yearTicks: { year: number; pct: number }[];
};

type TechnologyExplorerChartProps = {
  companiesData: CompaniesData | null;
  isDarkMode: boolean;
  language: Language;
  maxMonths: number;
  onSelectCompany: (company: string) => void;
  onSelectTechnology: (technology: string) => void;
  selectedCompany: string | null;
  selectedTechnology: string | null;
  sortedInsights: TechnologyInsight[];
  timelineData: TimelineData | null;
  viewMode: ViewMode;
};

const AxisHeader: React.FC<{
  isDarkMode: boolean;
  yearTicks: { year: number; pct: number }[];
}> = ({ isDarkMode, yearTicks }) => (
  <div className="mb-2 flex items-center gap-3 px-2">
    <div className="w-24 shrink-0" />
    <div className="relative h-4 flex-1">
      {yearTicks.map(({ year, pct }) => (
        <span
          key={year}
          className={`absolute top-0 -translate-x-1/2 text-[10px] font-medium tabular-nums leading-none ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}
          style={{ left: `${pct}%` }}
        >
          {year}
        </span>
      ))}
    </div>
  </div>
);

export const TechnologyExplorerChart: React.FC<TechnologyExplorerChartProps> = ({
  companiesData,
  isDarkMode,
  language,
  maxMonths,
  onSelectCompany,
  onSelectTechnology,
  selectedCompany,
  selectedTechnology,
  sortedInsights,
  timelineData,
  viewMode,
}) => {
  if (viewMode === 'companies' && companiesData) {
    const yearPcts = companiesData.yearTicks.map((tick) => tick.pct);
    return (
      <div>
        <AxisHeader isDarkMode={isDarkMode} yearTicks={companiesData.yearTicks} />
        <div className="space-y-1">
          {companiesData.rows.map(({ company, fromMonthIdx, toMonthIdx }) => (
            <ExplorerCompanyRow
              key={company}
              company={company}
              fromMonthIdx={fromMonthIdx}
              toMonthIdx={toMonthIdx}
              careerStart={companiesData.careerStart}
              careerTotal={companiesData.careerTotal}
              color={companiesData.companyColors.get(company) ?? '#6366f1'}
              yearPcts={yearPcts}
              isDarkMode={isDarkMode}
              isSelected={selectedCompany === company}
              language={language}
              onSelect={() => onSelectCompany(company)}
            />
          ))}
        </div>
      </div>
    );
  }

  if (viewMode === 'timeline' && timelineData) {
    const yearPcts = timelineData.yearTicks.map((tick) => tick.pct);
    return (
      <div>
        <AxisHeader isDarkMode={isDarkMode} yearTicks={timelineData.yearTicks} />
        <div className="space-y-0.5">
          {timelineData.timelineSorted.map((insight) => (
            <ExplorerTimelineRow
              key={insight.name}
              insight={insight}
              careerStart={timelineData.careerStart}
              careerTotal={timelineData.careerTotal}
              companyColors={timelineData.companyColors}
              yearPcts={yearPcts}
              isSelected={selectedTechnology === insight.name}
              isDarkMode={isDarkMode}
              language={language}
              onSelect={() => onSelectTechnology(insight.name)}
            />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 pl-[calc(6rem+1.25rem)]">
          {timelineData.companiesByFirst.map((company) => (
            <span key={company} className={`flex items-center gap-1.5 text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ background: timelineData.companyColors.get(company), opacity: 0.85 }}
              />
              {company}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {sortedInsights.map((insight) => (
        <ExplorerBarRow
          key={insight.name}
          insight={insight}
          maxMonths={maxMonths}
          isSelected={selectedTechnology === insight.name}
          isDarkMode={isDarkMode}
          language={language}
          onSelect={() => onSelectTechnology(insight.name)}
        />
      ))}
    </div>
  );
};
