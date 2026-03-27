import React from 'react';
import type { Language } from '../../types';
import { ProfilePill } from './ProfilePill';
import { formatDuration } from './profileContent';

export type CompanyDetailRole = {
  company: string;
  role: string;
  period: string;
  months: number;
  summary: string;
  projects: string[];
  projectDetails: Array<{ name: string; description: string; technologies?: string[]; from: string; to: string | null }>;
  technologies: string[];
  fromMonthIdx: number;
  toMonthIdx: number;
};

export type CompanyDetail = {
  company: string;
  totalMonths: number;
  roleCount: number;
  technologyCount: number;
  roles: CompanyDetailRole[];
};

type TechnologyExplorerCompanyPanelProps = {
  companyDetail: CompanyDetail;
  isDarkMode: boolean;
  language: Language;
};

export const TechnologyExplorerCompanyPanel: React.FC<TechnologyExplorerCompanyPanelProps> = ({
  companyDetail,
  isDarkMode,
  language,
}) => {
  const roleCountLabel = language === 'cs' ? 'role' : 'roles';
  const technologyCountLabel = language === 'cs' ? 'technologie' : 'technologies';

  return (
    <div className="xl:sticky xl:top-28 xl:self-start">
      <div className={`rounded-[20px] border p-5 ${isDarkMode ? 'border-[rgba(255,255,255,0.06)] bg-[rgba(11,18,41,0.72)]' : 'border-[rgba(148,163,184,0.24)] bg-[rgba(248,250,252,0.9)]'}`}>
        <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          {language === 'cs' ? 'Vybrané highlighty' : 'Selected Highlights'}
        </div>
        <div className={`mt-3 font-display text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          {companyDetail.company}
        </div>
        <div className={`mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>
            <span className={isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}>{formatDuration(companyDetail.totalMonths, language)}</span>{' '}
            {language === 'cs' ? 'celková praxe s technologií' : 'total hands-on experience'}
          </span>
          <span>{companyDetail.roleCount} {roleCountLabel}</span>
          <span>{companyDetail.technologyCount} {technologyCountLabel}</span>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {companyDetail.roles.map((role) => (
          <div key={`${role.company}-${role.role}-${role.period}`} className={`rounded-2xl border p-4 ${isDarkMode ? 'border-[rgba(255,255,255,0.06)] bg-white/[0.03]' : 'border-slate-200/60 bg-white/70'}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{role.company}</span>
                  <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{role.role}</span>
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-[0.18em] text-slate-500">{role.period}</div>
              </div>
              <ProfilePill isDarkMode={isDarkMode}>{formatDuration(role.months, language)}</ProfilePill>
            </div>
            <div className={`mt-3 border-t pt-3 ${isDarkMode ? 'border-[rgba(255,255,255,0.06)]' : 'border-slate-200/60'}`}>
              <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{role.summary}</p>
              {role.technologies.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {role.technologies.map((tech) => (
                    <ProfilePill key={`${role.company}-${role.role}-${tech}`} isDarkMode={isDarkMode}>{tech}</ProfilePill>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
