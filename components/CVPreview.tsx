import React from 'react';
import type { CVData, Language } from '../types';
import { ProfileHero } from './profile/ProfileHero';
import { ProfileSidebar } from './profile/ProfileSidebar';
import { ProfileTopBar } from './profile/ProfileTopBar';
import { Reveal } from './profile/Reveal';
import {
  flattenSkills,
  getHeroPills,
  getProfileHighlights,
} from './profile/profileContent';
import type { TechnologyInsight } from './profile/profileContent';

const TechnologyExplorer = React.lazy(() =>
  import('./profile/TechnologyExplorer').then((m) => ({ default: m.TechnologyExplorer }))
);
const ProfileExperienceSection = React.lazy(() =>
  import('./profile/ProfileExperienceSection').then((m) => ({ default: m.ProfileExperienceSection }))
);

interface CVPreviewProps {
  data: CVData;
  insights: TechnologyInsight[];
  isDarkMode: boolean;
  isDownloadingPdf?: boolean;
  language: Language;
  onLanguageChange: React.Dispatch<React.SetStateAction<Language>>;
  onThemeToggle: () => void;
  onDownloadPdf: () => void;
  onChange: <K extends keyof CVData>(section: K, index: number | null, field: string, value: string) => void;
  onProjectChange: (companyIndex: number, roleIndex: number, projectIndex: number, field: string, value: string) => void;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ data, insights, isDarkMode, isDownloadingPdf = false, language, onLanguageChange, onThemeToggle, onDownloadPdf }) => {
  const [activeTechnology, setActiveTechnology] = React.useState<string | null>(() => {
    if (typeof globalThis === 'undefined' || !globalThis.location.hash.startsWith('#skills')) {
      return null;
    }

    const queryStart = globalThis.location.hash.indexOf('?');
    if (queryStart === -1) return null;

    return new URLSearchParams(globalThis.location.hash.slice(queryStart + 1)).get('tech');
  });
  const [activeView, setActiveView] = React.useState<'about' | 'experience'>(() =>
    globalThis.location?.hash === '#experience' ? 'experience' : 'about',
  );
  const highlights = getProfileHighlights(data);
  const heroPills = getHeroPills(data, language);
  const expertise = flattenSkills(data.skills).slice(0, 4);
  const printSkills = insights.map((insight) => insight.name);

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
      <div className={`absolute inset-0 pointer-events-none ${isDarkMode ? 'bg-[radial-gradient(circle_at_12%_16%,rgba(96,165,250,0.12),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(129,140,248,0.14),transparent_18%),radial-gradient(circle_at_72%_82%,rgba(45,212,191,0.08),transparent_18%)]' : 'bg-[radial-gradient(circle_at_12%_16%,rgba(125,211,252,0.18),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(199,210,254,0.24),transparent_18%),radial-gradient(circle_at_72%_82%,rgba(148,163,184,0.12),transparent_18%)]'}`} />

      <div className="relative">
        <ProfileTopBar
          activeView={activeView}
          isDarkMode={isDarkMode}
          isDownloading={isDownloadingPdf}
          language={language}
          onDownload={onDownloadPdf}
          onLanguageToggle={() => onLanguageChange((prev) => (prev === 'en' ? 'cs' : 'en'))}
          onThemeToggle={onThemeToggle}
          onViewChange={setActiveView}
        />

        <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-10 lg:px-10 lg:pb-24 lg:pt-14">
          <span id="experience" className="scroll-mt-28 block h-0" aria-hidden="true" />
          <ProfileHero data={data} highlights={highlights} isDarkMode={isDarkMode} pills={heroPills} />

          <div className={activeView !== 'about' ? 'hidden' : 'contents'}>
            <Reveal delayMs={40}>
              <React.Suspense fallback={null}>
                <TechnologyExplorer
                  activeTechnology={activeTechnology}
                  insights={insights}
                  isDarkMode={isDarkMode}
                  isActive={activeView === 'about'}
                  language={language}
                  skills={data.skills}
                  onSelectTechnology={setActiveTechnology}
                />
              </React.Suspense>
            </Reveal>
            <ProfileSidebar
              data={data}
              expertise={expertise.length ? expertise : heroPills}
              isDarkMode={isDarkMode}
              language={language}
            />
          </div>

          {activeView === 'experience' && (
            <Reveal>
              <React.Suspense fallback={null}>
                <ProfileExperienceSection
                  companies={data.companies}
                  isDarkMode={isDarkMode}
                  language={language}
                  skillPills={printSkills}
                />
              </React.Suspense>
            </Reveal>
          )}
        </main>
      </div>
    </div>
  );
};
