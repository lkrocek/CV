import React from 'react';
import type { Company, Language } from '../../types';
import { formatPeriod, profileCopy } from './profileContent';

type ProfileExperienceSectionProps = {
  companies: Company[];
  isDarkMode: boolean;
  language: Language;
  skillPills: string[];
};

export const ProfileExperienceSection: React.FC<ProfileExperienceSectionProps> = ({
  companies,
  isDarkMode,
  language,
  skillPills,
}) => {
  const copy = profileCopy[language];
  const visibleSkills = skillPills.slice(0, 30);
  const hasOverflow = skillPills.length > 30;

  return (
    <section id="experience" className="scroll-mt-28">
      {/* Paper / print-preview card */}
      <div
        className={`overflow-hidden rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.14),0_2px_12px_rgba(0,0,0,0.08)] ${
          isDarkMode ? 'bg-[#0b1229] text-slate-100' : 'bg-white text-slate-900'
        }`}
      >
        {/* Top accent stripe */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-500" />

        <div className="p-10 lg:p-14">
          {/* Document header */}
          <div className={`mb-8 flex items-end justify-between gap-4 border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <h2 className={`font-display text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{copy.experience}</h2>
            <span className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              Curriculum Vitæ
            </span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div className="space-y-8">
              {companies.map((company, companyIndex) => (
                <article
                  key={`${company.name}-${companyIndex}`}
                  className={`grid gap-4 border-b pb-7 last:border-0 last:pb-0 ${isDarkMode ? 'border-white/8' : 'border-slate-100'}`}
                >
                  <h3 className={`font-display text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{company.name}</h3>

                  {company.roles.map((role, roleIndex) => (
                    <div key={`${role.title}-${roleIndex}`} className={`grid gap-1.5 border-l-2 pl-4 ${isDarkMode ? 'border-indigo-400/30' : 'border-indigo-100'}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <span className={`text-base font-semibold ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{role.title}</span>
                        <span className={`text-sm tabular-nums ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                          {formatPeriod(role.projects ?? [], language)}
                        </span>
                      </div>
                      <p className={`text-sm leading-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{role.description}</p>
                    </div>
                  ))}
                </article>
              ))}
            </div>

            <aside className={`rounded-2xl border p-4 ${isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-slate-200 bg-slate-50/80'}`}>
              <div className={`mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                Technologie
              </div>
              <table className="w-full border-collapse text-sm">
                <tbody>
                  {visibleSkills.map((skill, index) => (
                    <tr key={skill} className={index === 0 ? '' : isDarkMode ? 'border-t border-white/8' : 'border-t border-slate-200/70'}>
                      <td className={`py-2 pr-3 font-medium ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>{skill}</td>
                      <td className="py-2 text-right text-slate-500">{index < 3 ? 'Core' : 'Used'}</td>
                    </tr>
                  ))}
                  {hasOverflow && (
                    <tr className={isDarkMode ? 'border-t border-white/8' : 'border-t border-slate-200/70'}>
                      <td className={`py-2 pr-3 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>...</td>
                      <td className="py-2 text-right text-slate-500">...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};
