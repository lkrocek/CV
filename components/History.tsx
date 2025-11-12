import React from 'react';
import type { CVData, Experience, Education } from '../types';
import { Editable } from './common';

// Props passed down from the top
type CVCallbacks = {
  onChange: <K extends keyof CVData>(section: K, index: number | null, field: string, value: string) => void;
  onProjectChange: (itemType: 'experiences' | 'educations', itemIndex: number, projIndex: number, field: string, value: string) => void;
}

export type HistoryItem = (Experience & { type: 'experience'; originalIndex: number; }) | (Education & { type: 'education'; originalIndex: number; });

export const TimelineNode: React.FC<{
    item: HistoryItem;
    isLast: boolean;
    variant: 'compact' | 'full';
    logos: Record<string, string>;
} & CVCallbacks> = ({ item, isLast, variant, logos, onChange, onProjectChange }) => {
    const title = item.type === 'experience' ? item.role : item.degree;
    const subtitle = item.type === 'experience' ? item.company : item.institution;
    const section: 'experiences' | 'educations' = item.type === 'experience' ? 'experiences' : 'educations';
    const hasLogo = item.type === 'experience' && logos[item.company];

    const backgroundSize =
      item.type === 'experience' && item.company === 'mineus)(, s.r.o.'
        ? '100%'
        : 'contain';

    return (
        <div className={`relative group ${variant === 'full' ? 'pl-4' : 'pl-8'}`}>
            <div className="absolute top-2 left-[7px] w-0.5 h-full bg-gray-200"></div>
            <div className="absolute top-1 left-0 w-4 h-4 bg-cyan-800 rounded-full border-4 border-white z-10"></div>
            <div className="mb-6">
                <div className="-mt-1 flex items-start">
                    {/* Period */}
                    <div className="w-32 shrink-0">
                        <Editable as="p" className="text-xs font-medium text-gray-500 pt-1" onUpdate={v => onChange(section, item.originalIndex, 'period', v)}>{item.period}</Editable>
                    </div>
                    
                    {/* Logo & Title/Subtitle Container */}
                    <div className="flex-grow flex items-start">
                        {/* Logo (conditional) */}
                        {item.type === 'experience' && hasLogo && (
                             <div className="w-24 shrink-0 flex justify-end items-center h-12 pr-4">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundImage: `url(${logos[item.company]})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize,
                                    }}
                                />
                            </div>
                        )}
                        
                        {/* Title & Subtitle */}
                        <div className="flex-grow">
                            <div className="flex items-baseline gap-1 text-gray-800">
                                <span className="text-cyan-600 font-bold text-sm">&lt;</span>
                                <Editable as="span" className="font-bold text-sm" onUpdate={v => onChange(section, item.originalIndex, item.type === 'experience' ? 'role' : 'degree', v)}>{title}</Editable>
                                <span className="text-cyan-600 font-bold text-sm">/&gt;</span>
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className="text-cyan-600 font-bold text-sm">{'{'}</span>
                                <Editable as="p" className="text-sm text-gray-800 italic" onUpdate={v => onChange(section, item.originalIndex, item.type === 'experience' ? 'company' : 'institution', v)}>{subtitle}</Editable>
                                <span className="text-cyan-600 font-bold text-sm">{'}'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {variant === 'full' && (
                  <div className="mt-2 pl-4">
                    <Editable className="text-gray-700 whitespace-pre-wrap text-xs text-justify" onUpdate={v => onChange(section, item.originalIndex, 'description', v)}>{item.description}</Editable>
                    
                    {item.projects && item.projects.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {item.projects.map((project, index) => (
                          <div key={index} className="relative group/project pl-5">
                            <div className="absolute top-2 left-[-1.5rem] w-6 h-0.5 bg-gray-200"></div>
                            <div className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full border-2 border-cyan-800 z-10"></div>
                            {/* Fix: Use `section` variable which is correctly typed for onProjectChange */}
                             <Editable as="h5" className="font-semibold text-gray-700 text-xs" onUpdate={v => onProjectChange(section, item.originalIndex, index, 'name', v)}>{project.name}</Editable>
                            {/* Fix: Use `section` variable which is correctly typed for onProjectChange */}
                             <Editable className="text-gray-600 mt-1 whitespace-pre-wrap text-xs text-justify" onUpdate={v => onProjectChange(section, item.originalIndex, index, 'description', v)}>{project.description}</Editable>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </div>
        </div>
    );
};