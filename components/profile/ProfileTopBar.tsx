import React from 'react';
import type { Language } from '../../types';
import { profileCopy } from './profileContent';

type ProfileTopBarProps = {
  isDarkMode: boolean;
  language: Language;
  onDownload: () => void;
  onLanguageToggle: () => void;
  onThemeToggle: () => void;
};

const navAnchors = ['about', 'experience', 'skills', 'projects'] as const;

export const ProfileTopBar: React.FC<ProfileTopBarProps> = ({
  isDarkMode,
  language,
  onDownload,
  onLanguageToggle,
  onThemeToggle,
}) => {
  const copy = profileCopy[language];
  const navLabels = [copy.about, copy.experience, copy.skills, copy.projects];
  const shellClass = isDarkMode
    ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(17,24,45,0.7)] text-slate-100 hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(23,31,57,0.86)]'
    : 'border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] text-slate-700 hover:border-[rgba(15,23,42,0.18)] hover:bg-white';

  return (
    <header className={`sticky top-0 z-20 border-b backdrop-blur-xl ${isDarkMode ? 'border-line bg-[rgba(5,8,22,0.7)]' : 'border-[rgba(15,23,42,0.08)] bg-[rgba(246,247,251,0.78)]'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 lg:px-10">
        <nav className="hidden items-center gap-8 md:flex">
          {navLabels.map((label, index) => (
            <a
              key={navAnchors[index]}
              href={`#${navAnchors[index]}`}
              className={`relative pb-3 text-lg transition ${
                index === 0
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-slate-900'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {label}
              {index === 0 && <span className={`absolute inset-x-0 -bottom-[1px] h-0.5 rounded-full ${isDarkMode ? 'bg-white' : 'bg-slate-900'}`} />}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={onDownload}
            className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium shadow-aurora transition ${shellClass}`}
          >
            <span className="text-base">↓</span>
            {copy.download}
          </button>
          <button
            onClick={onLanguageToggle}
            className={`inline-flex h-12 min-w-12 items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${shellClass}`}
            aria-label="Toggle language"
          >
            {language === 'en' ? 'CZ' : 'EN'}
          </button>
          <button
            onClick={onThemeToggle}
            className={`grid h-12 w-12 place-items-center rounded-full border text-xl transition ${shellClass} ${isDarkMode ? 'text-[#f0d98a]' : 'text-slate-700'}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☼' : '◐'}
          </button>
        </div>
      </div>
    </header>
  );
};
