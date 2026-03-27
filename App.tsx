
import React, { useEffect, useRef, useState } from 'react';
import { CVPreview } from './components/CVPreview';
import { useCvData } from './hooks/useCvData';
import { useTechnologyInsights } from './hooks/useTechnologyInsights';
import type { Language } from './types';

const SPLASH_MIN_MS = 1800;

const buildPdfFileName = (name: string, language: Language) => {
  const base = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `${base || 'cv'}-${language}.pdf`;
};

const dismissSplash = () => {
  const splash = document.getElementById('splash');
  if (!splash) return;
  splash.classList.add('splash-hidden');
  splash.addEventListener('transitionend', () => {
    splash.remove();
    document.body.classList.add('splash-done');
    globalThis.dispatchEvent(new CustomEvent('splashDismissed'));
    const hash = globalThis.location.hash.slice(1);
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, { once: true });
};

const getInitialSettings = (): { lang: Language; dark: boolean } => {
  try {
    const lang: Language = localStorage.getItem('cv-lang') === 'cs' ? 'cs' : 'en';
    const dark = localStorage.getItem('cv-theme') !== 'light';
    return { lang, dark };
  } catch {
    return { lang: 'en', dark: true };
  }
};

const App: React.FC = () => {
  const { lang: initialLang, dark: initialDark } = getInitialSettings();
  const [language, setLanguage] = useState<Language>(initialLang);
  const [isDarkMode, setIsDarkMode] = useState(initialDark);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const { currentCvData, updateProjectField, updateSectionField } = useCvData(language);
  const { insights, ready: workerReady } = useTechnologyInsights(currentCvData);
  const minTimeReached = useRef(false);
  const appReady = useRef(false);
  const workerReadyRef = useRef(false);

  useEffect(() => {
    try {
      localStorage.setItem('cv-lang', language);
      localStorage.setItem('cv-theme', isDarkMode ? 'dark' : 'light');
    } catch { /* ignore */ }
  }, [language, isDarkMode]);

  const tryDismiss = () => {
    if (minTimeReached.current && appReady.current && workerReadyRef.current) dismissSplash();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      minTimeReached.current = true;
      tryDismiss();
    }, SPLASH_MIN_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    appReady.current = true;
    tryDismiss();
  }, []);

  useEffect(() => {
    if (workerReady) {
      workerReadyRef.current = true;
      tryDismiss();
    }
  }, [workerReady]);

  const handleDownloadPdf = async () => {
    if (isDownloadingPdf) return;

    setIsDownloadingPdf(true);
    try {
      const [{ pdf }, { CvPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./components/pdf/CvPdfDocument'),
      ]);

      const blob = await pdf(
        <CvPdfDocument data={currentCvData} language={language} />
      ).toBlob();

      const href = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.download = buildPdfFileName(currentCvData.personalInfo.name, language);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      globalThis.setTimeout(() => URL.revokeObjectURL(href), 1000);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="min-h-screen w-full">
        <CVPreview
          data={currentCvData}
          insights={insights}
          isDarkMode={isDarkMode}
          isDownloadingPdf={isDownloadingPdf}
          language={language}
          onDownloadPdf={handleDownloadPdf}
          onLanguageChange={setLanguage}
          onThemeToggle={() => setIsDarkMode((prev) => !prev)}
          onChange={updateSectionField}
          onProjectChange={updateProjectField}
        />
      </main>
    </div>
  );
};

export default App;
