import React from 'react';

type ProfilePillProps = {
  children: React.ReactNode;
  tone?: 'default' | 'accent';
  isDarkMode?: boolean;
};

export const ProfilePill: React.FC<ProfilePillProps> = ({ children, tone = 'default', isDarkMode = true }) => {
  const toneClass = isDarkMode
    ? tone === 'accent'
      ? 'border-[rgba(125,211,252,0.34)] bg-[rgba(56,189,248,0.12)] text-[#d8f3ff]'
      : 'border-[rgba(142,162,255,0.18)] bg-[rgba(20,28,58,0.72)] text-slate-200'
    : tone === 'accent'
      ? 'border-[rgba(56,189,248,0.3)] bg-[rgba(125,211,252,0.16)] text-sky-800'
      : 'border-[rgba(148,163,184,0.35)] bg-[rgba(255,255,255,0.9)] text-slate-700 shadow-[0_10px_30px_rgba(148,163,184,0.18)]';

  return (
    <span className={`inline-flex items-center rounded-full border px-4 py-2 text-sm tracking-[0.01em] backdrop-blur-sm ${toneClass}`}>
      {children}
    </span>
  );
};
