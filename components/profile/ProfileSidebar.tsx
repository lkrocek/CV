import React from 'react';
import type { CVData, Language } from '../../types';
import { ProfilePill } from './ProfilePill';
import { profileCopy } from './profileContent';

type ProfileSidebarProps = {
  data: CVData;
  expertise: string[];
  featuredProjects: string[];
  language: Language;
};

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ data, expertise, featuredProjects, language }) => {
  const copy = profileCopy[language];
  const email = data.personalInfo.email.join('');

  return (
    <div className="grid gap-8 xl:sticky xl:top-28">
      <section id="skills" className="rounded-[28px] border border-line bg-[rgba(8,13,31,0.56)] p-8 shadow-aurora">
        <h2 className="font-display text-3xl font-bold text-white">{copy.coreExpertise}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {expertise.map((item) => (
            <ProfilePill key={item}>{item}</ProfilePill>
          ))}
        </div>
      </section>

      <section id="projects" className="rounded-[28px] border border-line bg-[rgba(8,13,31,0.56)] p-8 shadow-aurora">
        <h2 className="font-display text-3xl font-bold text-white">{copy.selectedWork}</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {featuredProjects.map((item) => (
            <ProfilePill key={item}>{item}</ProfilePill>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-line bg-[rgba(8,13,31,0.56)] p-8 shadow-aurora">
        <div className="flex items-center gap-4 text-2xl text-slate-100">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(142,162,255,0.14)]">✉</span>
          <a href={`mailto:${email}`} className="break-all transition hover:text-white">{email}</a>
        </div>
        <div className="mt-8 space-y-3 text-lg text-slate-400">
          <p>{copy.basedIn} {data.personalInfo.address}</p>
          <p>{copy.openTo}</p>
        </div>
      </section>
    </div>
  );
};
