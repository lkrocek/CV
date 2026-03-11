import React from 'react';
import { ProfilePill } from './ProfilePill';

type QuickOverviewProps = {
  items: Array<{ label: string; value: string }>;
};

export const QuickOverview: React.FC<QuickOverviewProps> = ({ items }) => {
  return (
    <section className="rounded-[28px] border border-line bg-[rgba(8,13,31,0.56)] p-8 shadow-aurora">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, index) => (
          <div key={item.label} className={`rounded-[24px] border border-line p-5 ${index === 0 ? 'bg-[rgba(16,25,56,0.78)]' : 'bg-[rgba(8,13,31,0.42)]'}`}>
            <div className="text-sm uppercase tracking-[0.22em] text-slate-500">{item.label}</div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="font-display text-4xl font-bold text-white">{item.value}</div>
              <ProfilePill tone={index === 0 ? 'accent' : 'default'}>{item.label}</ProfilePill>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
