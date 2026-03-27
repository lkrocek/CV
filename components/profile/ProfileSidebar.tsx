import React from 'react';
import type { CVData, Language } from '../../types';
import { profileCopy } from './profileContent';
import { Reveal } from './Reveal';

type ProfileSidebarProps = {
  data: CVData;
  expertise: string[];
  isDarkMode: boolean;
  language: Language;
};

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ data, expertise: _expertise, isDarkMode, language }) => {
  const copy = profileCopy[language];
  const email = data.personalInfo.email.join('');
  const cardClass = isDarkMode
    ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(8,13,31,0.56)]'
    : 'border-[rgba(148,163,184,0.24)] bg-[rgba(255,255,255,0.74)]';
  const bodyClass = isDarkMode ? 'text-slate-400' : 'text-slate-600';

  return (
    <Reveal>
      <div className="grid gap-8 xl:sticky xl:top-28">
        <section className={`rounded-[28px] border p-8 shadow-aurora transition-transform duration-500 ease-out hover:-translate-y-1 ${cardClass}`}>
          <div className={`flex items-center gap-4 text-2xl ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(142,162,255,0.14)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                <path d="M4 7.5H20C20.8284 7.5 21.5 8.17157 21.5 9V15C21.5 15.8284 20.8284 16.5 20 16.5H4C3.17157 16.5 2.5 15.8284 2.5 15V9C2.5 8.17157 3.17157 7.5 4 7.5Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 8L10.9393 13.293C11.5731 13.7155 12.4269 13.7155 13.0607 13.293L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <a href={`mailto:${email}`} className={`break-all transition ${isDarkMode ? 'hover:text-white' : 'hover:text-slate-700'}`}>{email}</a>
          </div>
          <div className={`mt-8 space-y-3 text-lg ${bodyClass}`}>
            <p>{copy.basedIn} {data.personalInfo.address}</p>
            <p>{copy.openTo}</p>
          </div>
        </section>
      </div>
    </Reveal>
  );
};
