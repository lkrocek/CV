import React from 'react';
import type { CVData, Language } from '../../types';
import { ProfilePill } from './ProfilePill';

type ProfileHeroProps = {
  data: CVData;
  highlights: string[];
  language: Language;
  pills: string[];
};

export const ProfileHero: React.FC<ProfileHeroProps> = ({ data, highlights, pills }) => {
  return (
    <section id="about" className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
      <div className="relative mx-auto h-56 w-56 overflow-hidden rounded-full border border-[rgba(142,162,255,0.28)] bg-[radial-gradient(circle_at_35%_30%,rgba(101,126,255,0.4),rgba(9,14,33,0.96)_70%)] shadow-[0_0_80px_rgba(84,108,255,0.18)] sm:h-64 sm:w-64 lg:mx-0">
        {data.personalInfo.profilePhoto ? (
          <img src={data.personalInfo.profilePhoto} alt={data.personalInfo.name} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.14),transparent_35%),linear-gradient(145deg,rgba(142,162,255,0.16),transparent_55%)]" />
        )}
      </div>
      <div>
        <h1 className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl">{data.personalInfo.name}</h1>
        <p className="mt-4 text-2xl text-slate-300 sm:text-3xl">{data.personalInfo.title}</p>
        <ul className="mt-8 space-y-4 text-lg leading-8 text-slate-300">
          {highlights.map((item) => (
            <li key={item} className="flex gap-4">
              <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#d7c37a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          {pills.map((pill, index) => (
            <ProfilePill key={pill} tone={index === 0 ? 'accent' : 'default'}>
              {pill}
            </ProfilePill>
          ))}
        </div>
      </div>
    </section>
  );
};
