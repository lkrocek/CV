import React from 'react';
import type { CVData, Language } from '../types';
import { ProfileExperienceSection } from './profile/ProfileExperienceSection';
import { ProfileHero } from './profile/ProfileHero';
import { ProfileSidebar } from './profile/ProfileSidebar';
import { ProfileTopBar } from './profile/ProfileTopBar';
import { QuickOverview } from './profile/QuickOverview';
import { TechnologyExplorer } from './profile/TechnologyExplorer';
import {
  buildTechnologyInsights,
  flattenSkills,
  formatDuration,
  getCareerSpanMonths,
  getFeaturedProjects,
  getHeroPills,
  getProfileHighlights,
  getVisibleExperiences,
  profileCopy,
} from './profile/profileContent';

interface CVPreviewProps {
  data: CVData;
  language: Language;
  onLanguageChange: React.Dispatch<React.SetStateAction<Language>>;
  onChange: <K extends keyof CVData>(section: K, index: number | null, field: string, value: string) => void;
  onProjectChange: (itemType: 'experiences' | 'educations', itemIndex: number, projIndex: number, field: string, value: string) => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, language, onLanguageChange }) => {
  const [activeTechnology, setActiveTechnology] = React.useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const highlights = getProfileHighlights(data);
  const heroPills = getHeroPills(data);
  const expertise = flattenSkills(data.skills).slice(0, 4);
  const featuredProjects = getFeaturedProjects(data);
  const experiences = getVisibleExperiences(data);
  const insights = buildTechnologyInsights(data);
  const copy = profileCopy[language];
  const overviewItems = [
    { label: copy.totalCareerSpan, value: formatDuration(getCareerSpanMonths(data)) },
    { label: copy.companies, value: String(new Set(data.experiences.map((experience) => experience.company)).size) },
    { label: copy.technologiesTracked, value: String(insights.length) },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? 'bg-[radial-gradient(circle_at_top_left,rgba(79,91,198,0.32),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(60,84,166,0.24),transparent_18%),linear-gradient(180deg,#050816_0%,#070c1b_36%,#050713_100%)] text-slate-100'
          : 'bg-[radial-gradient(circle_at_top_left,rgba(199,210,254,0.7),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(191,219,254,0.65),transparent_20%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_34%,#e2e8f0_100%)] text-slate-900'
      }`}
    >
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-[linear-gradient(168deg,transparent_12%,rgba(138,152,255,0.1)_13%,transparent_15%,transparent_48%,rgba(138,152,255,0.08)_49%,transparent_51%)] opacity-70' : 'bg-[linear-gradient(168deg,transparent_12%,rgba(255,255,255,0.55)_13%,transparent_15%,transparent_48%,rgba(148,163,184,0.12)_49%,transparent_51%)] opacity-90'}`} />
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,transparent,rgba(1,4,12,0.42)_68%,rgba(1,4,12,0.78)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent,rgba(255,255,255,0.12)_64%,rgba(226,232,240,0.62)_100%)]'}`} />

      <div className="relative">
        <ProfileTopBar
          isDarkMode={isDarkMode}
          language={language}
          onDownload={() => window.print()}
          onLanguageToggle={() => onLanguageChange((prev) => (prev === 'en' ? 'cs' : 'en'))}
          onThemeToggle={() => setIsDarkMode((prev) => !prev)}
        />

        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
          <ProfileHero data={data} highlights={highlights} language={language} pills={heroPills} />
          <QuickOverview items={overviewItems} />
          <TechnologyExplorer
            activeTechnology={activeTechnology}
            insights={insights}
            language={language}
            onSelectTechnology={setActiveTechnology}
          />

          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.7fr)_320px]">
            <ProfileExperienceSection experiences={experiences} language={language} skillPills={heroPills.length ? heroPills : expertise} />
            <ProfileSidebar data={data} expertise={expertise.length ? expertise : heroPills} featuredProjects={featuredProjects} language={language} />
          </div>
        </main>
      </div>
    </div>
  );
};
