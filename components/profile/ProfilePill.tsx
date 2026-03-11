import React from 'react';

type ProfilePillProps = {
  children: React.ReactNode;
  tone?: 'default' | 'accent';
};

export const ProfilePill: React.FC<ProfilePillProps> = ({ children, tone = 'default' }) => {
  const toneClass =
    tone === 'accent'
      ? 'border-[rgba(215,195,122,0.28)] bg-[rgba(215,195,122,0.08)] text-[#f2e6b6]'
      : 'border-[rgba(142,162,255,0.18)] bg-[rgba(20,28,58,0.72)] text-slate-200';

  return (
    <span className={`inline-flex items-center rounded-full border px-4 py-2 text-sm tracking-[0.01em] backdrop-blur-sm ${toneClass}`}>
      {children}
    </span>
  );
};
