import React from 'react';
import type { Experience, Language } from '../../types';
import { ProfilePill } from './ProfilePill';
import { formatPeriod, profileCopy } from './profileContent';

type ProfileExperienceSectionProps = {
  experiences: Experience[];
  language: Language;
  skillPills: string[];
};

export const ProfileExperienceSection: React.FC<ProfileExperienceSectionProps> = ({ experiences, language, skillPills }) => {
  const copy = profileCopy[language];

  return (
    <section id="experience" className="rounded-[32px] border border-line bg-[rgba(8,13,31,0.56)] p-8 shadow-aurora">
      <div className="mb-8 flex items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-5">
        <div>
          <h2 className="font-display text-4xl font-bold text-white">{copy.experience}</h2>
          <p className="mt-2 text-sm uppercase tracking-[0.32em] text-slate-400">{experiences[0]?.period ? formatPeriod(experiences[0].period, language) : ''}</p>
        </div>
      </div>
      <div className="space-y-10">
        {experiences.map((experience, index) => (
          <article key={`${experience.company}-${experience.role}-${index}`} className="grid gap-5 border-b border-[rgba(255,255,255,0.05)] pb-8 last:border-b-0 last:pb-0">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h3 className="font-display text-3xl font-bold text-white">{experience.company}</h3>
                  <span className="text-2xl text-slate-300">{experience.role}</span>
                </div>
                <p className="mt-2 text-base text-slate-400">{formatPeriod(experience.period, language)}</p>
              </div>
              <a href="#projects" className="text-base font-medium text-slate-300 transition hover:text-white">
                Show more ›
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-14 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{copy.tech}</span>
              <div className="flex flex-wrap gap-3">
                {skillPills.slice(index, index + 4).map((pill) => (
                  <ProfilePill key={`${experience.company}-${pill}`}>{pill}</ProfilePill>
                ))}
              </div>
            </div>
            <div className="space-y-3 text-lg leading-8 text-slate-300">
              <p>
                <span className="mr-3 inline-block w-20 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{copy.work}</span>
                {experience.description}
              </p>
              {experience.projects?.slice(0, 2).map((project) => (
                <p key={project.name}>
                  <span className="mr-3 inline-block w-20 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{copy.impact}</span>
                  {project.description}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
