import React from 'react';
import type { CVData } from '../../types';
import { ProfilePill } from './ProfilePill';
import { Reveal } from './Reveal';

type ProfileHeroProps = {
  data: CVData;
  highlights: string[];
  isDarkMode: boolean;
  pills: string[];
};

export const ProfileHero: React.FC<ProfileHeroProps> = ({ data, highlights, isDarkMode, pills }) => {
  return (
    <section id="about" className="scroll-mt-28 grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
      <Reveal delayMs={40} y={18}>
        <div
          className={`relative mx-auto h-56 w-56 overflow-hidden rounded-full border transition-transform duration-700 ease-out hover:scale-[1.015] sm:h-64 sm:w-64 lg:mx-0 ${
            isDarkMode
              ? 'border-[rgba(142,162,255,0.28)] bg-[radial-gradient(circle_at_35%_30%,rgba(101,126,255,0.4),rgba(9,14,33,0.96)_70%)] shadow-[0_0_80px_rgba(84,108,255,0.18)]'
              : 'border-[rgba(148,163,184,0.4)] bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.96),rgba(203,213,225,0.8)_55%,rgba(148,163,184,0.65)_100%)] shadow-[0_20px_60px_rgba(148,163,184,0.25)]'
          }`}
        >
          <div className={`absolute inset-0 transition-opacity duration-700 ${isDarkMode ? 'bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.14),transparent_32%)] opacity-90' : 'bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.65),transparent_36%)] opacity-100'}`} />
          {data.personalInfo.profilePhoto ? (
            <img src={data.personalInfo.profilePhoto} alt={data.personalInfo.name} className="h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.14),transparent_35%),linear-gradient(145deg,rgba(142,162,255,0.16),transparent_55%)]" />
          )}
        </div>
      </Reveal>
      <div>
        <Reveal delayMs={110} y={20}>
          <h1 className={`font-name text-5xl font-bold tracking-tight sm:text-6xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {(() => {
              const spaceIdx = data.personalInfo.name.indexOf(' ');
              if (spaceIdx === -1) return data.personalInfo.name;
              return <>
                {data.personalInfo.name.slice(0, spaceIdx)}{' '}
                <span className={isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}>
                  {data.personalInfo.name.slice(spaceIdx + 1)}
                </span>
              </>;
            })()}
          </h1>
        </Reveal>
        <Reveal delayMs={180} y={20}>
          <p className={`mt-4 text-2xl sm:text-3xl ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{data.personalInfo.title}</p>
        </Reveal>
        <ul className={`mt-8 space-y-4 text-lg leading-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
          {highlights.map((item, index) => (
            <Reveal key={item} as="li" className="flex gap-4" delayMs={240 + index * 90} y={16}>
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#38bdf8]" />
              <span>{item}</span>
            </Reveal>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          {pills.map((pill, index) => (
            <Reveal key={pill} delayMs={420 + index * 55} y={12}>
              <ProfilePill tone={index === 0 ? 'accent' : 'default'} isDarkMode={isDarkMode}>
                {pill}
              </ProfilePill>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
