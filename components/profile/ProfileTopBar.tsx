import React from 'react';
import type { Language } from '../../types';
import { profileCopy } from './profileContent';

type ActiveView = 'about' | 'experience';

type ProfileTopBarProps = {
  activeView: ActiveView;
  isDarkMode: boolean;
  isDownloading?: boolean;
  language: Language;
  onDownload: () => void;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
  onViewChange: (view: ActiveView) => void;
};

export const ProfileTopBar: React.FC<ProfileTopBarProps> = ({
  activeView,
  isDarkMode,
  isDownloading = false,
  language,
  onDownload,
  onLanguageToggle,
  onThemeToggle,
  onViewChange,
}) => {
  const copy = profileCopy[language];

  const shellClass = isDarkMode
    ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(17,24,45,0.7)] text-slate-100 hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(23,31,57,0.86)]'
    : 'border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] text-slate-700 hover:border-[rgba(15,23,42,0.18)] hover:bg-white';

  const activeAbout = activeView === 'about';
  const activeExp   = activeView === 'experience';

  const baseLinkCls = 'relative pb-3 text-lg transition';
  const activeCls   = isDarkMode ? 'text-white' : 'text-slate-900';
  const idleCls     = isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800';

  const underline = (
    <span className={`absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-900'}`} />
  );

  return (
    <header className={`sticky top-0 z-20 border-b backdrop-blur-xl ${isDarkMode ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(5,8,22,0.7)]' : 'border-[rgba(15,23,42,0.08)] bg-[rgba(246,247,251,0.78)]'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <nav className="hidden items-end gap-4 md:flex">

          {/* About › Skills group */}
          <div className="flex items-end gap-1.5">
            <a
              href="#about"
              onClick={() => onViewChange('about')}
              className={`${baseLinkCls} cursor-pointer ${activeAbout ? activeCls : idleCls}`}
            >
              {copy.about}
              {activeAbout && underline}
            </a>
            <span className={`pb-3 text-sm select-none ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>›</span>
            <a
              href="#skills"
              onClick={() => onViewChange('about')}
              className={`cursor-pointer pb-3 text-sm transition ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {copy.skills}
            </a>
          </div>

          <span className={`pb-3 select-none text-lg ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`}>|</span>

          {/* Experience — full CV view */}
          <button
            onClick={() => onViewChange('experience')}
            className={`${baseLinkCls} cursor-pointer ${activeExp ? activeCls : idleCls}`}
          >
            {copy.experience}
            {activeExp && underline}
          </button>

        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={onDownload}
            disabled={isDownloading}
            className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium shadow-aurora transition ${isDownloading ? 'cursor-wait opacity-75' : 'cursor-pointer'} ${shellClass}`}
          >
            <span className="text-base" aria-hidden="true">↓</span>
            {isDownloading ? `${copy.download}...` : copy.download}
          </button>
          <button
            onClick={onLanguageToggle}
            className={`inline-flex h-12 min-w-12 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${shellClass}`}
            aria-label="Toggle language"
          >
            {language === 'en' ? 'CZ' : 'EN'}
          </button>
          <button
            onClick={onThemeToggle}
            className={`grid h-12 w-12 cursor-pointer place-items-center rounded-full border text-xl transition ${shellClass} ${isDarkMode ? 'text-sky-300' : 'text-slate-700'}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☼' : '◐'}
          </button>
        </div>
      </div>
    </header>
  );
};
