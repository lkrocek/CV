import React from 'react';
import type { OnlineLink } from '../types';

export const Editable: React.FC<{
  children: string;
  onUpdate: (value: string) => void;
  className?: string;
  as?: React.ElementType;
  placeholder?: string;
  variant?: 'light' | 'dark';
}> = ({ children, className, as: Component = 'p', placeholder }) => {
  return (
    <Component
      className={className}
      data-placeholder={placeholder}
    >
      {children}
    </Component>
  );
};

export const ShieldsLabel: React.FC<{ label: string; value: string; valueColor?: string; }> = ({ label, value, valueColor = 'bg-green-500' }) => (
    <div className="inline-flex items-center rounded-sm overflow-hidden text-xs font-bold shadow">
        <span className="bg-gray-600 text-white px-2 py-1">{label}</span>
        <span className={`${valueColor} text-white px-2 py-1`}>{value}</span>
    </div>
);

export const SectionHeader: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
  <h3 className={`text-sm font-bold uppercase tracking-widest mb-4 ${className}`}>{children}</h3>
);

export const AboutMeSection: React.FC<{ 
    content: string[]; 
    language: 'en' | 'cs'; 
}> = ({ content, language }) => {
    return (
        <section className="mt-10 pt-8 border-t border-gray-200">
            <SectionHeader className="text-cyan-800">
                {language === 'en' ? 'About Me' : 'O mně'}
            </SectionHeader>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-xs text-justify">
                {content.map((point, index) => (
                    <li key={index}>{point}</li>
                ))}
            </ul>
        </section>
    );
};

export const OnlinePresenceSection: React.FC<{ 
    links: OnlineLink[]; 
    language: 'en' | 'cs'; 
    onCvLinkClick?: () => void;
}> = ({ links, language, onCvLinkClick }) => {
    if (!links || links.length === 0) {
        return null;
    }
    return (
        <section className="mt-10 pt-8 border-t border-gray-200">
            <SectionHeader className="text-cyan-800">
                {language === 'en' ? 'Online Presence' : 'Online Prezentace'}
            </SectionHeader>
            <div className="space-y-4 text-xs">
                {links.map((link, index) => {
                    const domain = new URL(link.url).hostname;
                    const isCvLink = link.label === 'Online CV';

                    return (
                        <div key={index}>
                             {isCvLink && onCvLinkClick ? (
                                <button 
                                    onClick={onCvLinkClick}
                                    className="inline-flex items-center text-white font-semibold rounded-sm shadow-md transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                >
                                    <span className="bg-gray-600 px-3 py-1 text-xs font-bold rounded-l-sm">{link.label}</span>
                                    <span className="bg-cyan-600 px-3 py-1 text-xs font-bold rounded-r-sm">{domain}</span>
                                </button>
                            ) : (
                                <a 
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-white font-semibold rounded-sm shadow-md transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                >
                                    <span className="bg-gray-600 px-3 py-1 text-xs font-bold rounded-l-sm">{link.label}</span>
                                    <span className="bg-cyan-600 px-3 py-1 text-xs font-bold rounded-r-sm">{domain}</span>
                                </a>
                            )}
                            <p className="text-gray-600 mt-1 text-justify">{link.description}</p>
                        </div>
                    );
                })}
                <div>
                    <a
                        href="/storybook/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-white font-semibold rounded-sm shadow-md transition-shadow duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                        <span className="bg-gray-600 px-3 py-1 text-xs font-bold rounded-l-sm">Storybook</span>
                        <span className="bg-cyan-600 px-3 py-1 text-xs font-bold rounded-r-sm">/storybook/</span>
                    </a>
                    <p className="text-gray-600 mt-1 text-justify">
                        {language === 'en'
                            ? 'Component catalog served from the same host as the main app.'
                            : 'Katalog komponent dostupny pod stejnym hostem jako hlavni aplikace.'}
                    </p>
                </div>
            </div>
        </section>
    );
};
