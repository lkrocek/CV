import React from 'react';
import { Reveal } from './Reveal';

type QuickOverviewProps = {
  isDarkMode: boolean;
  items: Array<{ label: string; value: string }>;
};

export const QuickOverview: React.FC<QuickOverviewProps> = ({ isDarkMode, items }) => {
  return (
    <Reveal>
      <section className={`rounded-[28px] border p-8 shadow-aurora ${
        isDarkMode
          ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(8,13,31,0.56)]'
          : 'border-[rgba(148,163,184,0.24)] bg-[rgba(255,255,255,0.72)]'
      }`}>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, index) => (
            <Reveal key={item.label} delayMs={index * 90} y={16}>
              <div
                className={`rounded-[24px] border p-5 transition-transform duration-500 ease-out hover:-translate-y-1 ${
                  isDarkMode
                    ? `${index === 0 ? 'bg-[rgba(16,25,56,0.78)]' : 'bg-[rgba(8,13,31,0.42)]'} border-[rgba(255,255,255,0.08)]`
                    : `${index === 0 ? 'bg-[rgba(255,255,255,0.96)]' : 'bg-[rgba(248,250,252,0.82)]'} border-[rgba(148,163,184,0.24)]`
                }`}
              >
                <div className="text-sm uppercase tracking-[0.22em] text-slate-500">{item.label}</div>
                <div className="mt-4">
                  <div className={`font-display text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.value}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Reveal>
  );
};
