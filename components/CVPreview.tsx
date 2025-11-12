import React, { useState, useEffect, useRef } from 'react';
import type { CVData } from '../types';
import { ShieldsLabel, SectionHeader, AboutMeSection, OnlinePresenceSection } from './common';
import { SkillNode } from './Skills';
import { TimelineNode, HistoryItem } from './History';
import { CVHeader } from './Header';
import { CodeBlock } from './CodeBlock';
import { QuoteBubble } from './QuoteBubble';
import { logoInfo } from './logos';

type Language = 'en' | 'cs';

interface CVPreviewProps {
  data: CVData;
  language: Language;
  onLanguageChange: React.Dispatch<React.SetStateAction<Language>>;
  onChange: <K extends keyof CVData>(section: K, index: number | null, field: string, value: string) => void;
  onSimpleChange: (field: keyof CVData, value: string | string[]) => void;
  onProjectChange: (itemType: 'experiences' | 'educations', itemIndex: number, projIndex: number, field: string, value: string) => void;
}

const PageOne = (props: CVPreviewProps & { historyItems: HistoryItem[]; logos: Record<string, string>; onPhotoClick: () => void; }) => {
    const pageOneHistoryItems = props.historyItems.filter(item => !item.hideOnPageOne);
    
    return (
    <div className="print-page w-[210mm] h-[297mm] bg-white shadow-lg flex text-sm flex-shrink-0">
        <aside className="shrink-0 bg-cyan-600 text-white w-1/3 p-10 overflow-hidden shadow-[8px_0px_20px_-5px_rgba(0,0,0,0.3)] print-keep-overflow">
            <section className="h-full">
                <div className="relative font-mono bg-cyan-700/50 p-4 rounded-md text-sm h-full flex flex-col">
                    <h3 className="absolute -top-2.5 left-4 bg-cyan-800 px-2 text-sm font-bold uppercase tracking-widest text-cyan-200">
                      {props.language === 'en' ? 'Skills' : 'Dovednosti'}
                    </h3>
                    
                    {/* Faux Scrollbar: Thumb is 50% height, indicating half the content is visible */}
                    <div className="absolute top-8 right-2 bottom-4 w-1.5 bg-cyan-800/50 rounded-full" aria-hidden="true">
                        <div className="w-full h-1/2 bg-cyan-300/80 rounded-full"></div>
                    </div>

                    <div className="pt-2 flex-grow overflow-hidden rounded-md print-keep-overflow">
                        {props.data.skills.map((skill, index) => (
                            <div key={index} className={index > 0 ? 'mt-2' : ''}>
                                <SkillNode skill={skill} />
                            </div>
                        ))}
                        <p className="font-mono text-cyan-300 leading-snug">...</p>
                    </div>
                </div>
            </section>
        </aside>

        <div className="flex-grow flex flex-col">
             <CVHeader personalInfo={props.data.personalInfo} onChange={props.onChange} onPhotoClick={props.onPhotoClick} />
            <main className="flex-grow px-10 pb-10 flex flex-col">
                 <div className="bg-[rgb(122,129,138)] text-center -mx-10 px-10 py-3 mb-6">
                    <blockquote className="text-sm italic text-white">
                      {props.language === 'en' ? '“Proven by 15+ years of experience, ready to change the world.”' : '“Ověřeno 15+ lety zkušeností, připraven měnit svět.”'}
                    </blockquote>
                </div>
                <section className="mb-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2">
                            <ShieldsLabel label={props.language === 'en' ? 'Drive Licence A' : 'Řidičský průkaz A'} value="Passed" />
                            <ShieldsLabel label={props.language === 'en' ? 'Drive Licence B' : 'Řidičský průkaz B'} value="Passed" />
                            <ShieldsLabel label="Genius" value="Passed" valueColor="bg-green-500" />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <ShieldsLabel label={props.language === 'en' ? 'English' : 'Angličtina'} value="Fluent" valueColor="bg-blue-500" />
                            <ShieldsLabel label={props.language === 'en' ? 'Czech' : 'Čeština'} value="Native" valueColor="bg-blue-500" />
                        </div>
                    </div>
                </section>
                <section className="group/history flex-grow relative">
                    <SectionHeader className="text-cyan-800">
                      {props.language === 'en' ? 'Experiences & Knowledge' : 'Zkušenosti a znalosti'}
                    </SectionHeader>
                    {pageOneHistoryItems.map((item, index) => (
                        <TimelineNode key={`${item.type}-${item.originalIndex}`} item={item} isLast={index === pageOneHistoryItems.length - 1} variant="compact" onChange={props.onChange} onProjectChange={props.onProjectChange} logos={props.logos} />
                    ))}
                </section>
                 <section className="pt-4 relative">
                    <CodeBlock />
                    <div
                        className="absolute top-16 right-4 z-10"
                    >
                        <QuoteBubble language={props.language} />
                    </div>
                </section>
            </main>
        </div>
    </div>
    );
};

const SubsequentPage = (props: CVPreviewProps & { historyItems: HistoryItem[]; pageNumber: number; totalPages: number; logos: Record<string, string>; children?: React.ReactNode; }) => {
    if (props.historyItems.length === 0) {
        return null;
    }

    return (
        <div className="print-page w-[210mm] h-[297mm] bg-white shadow-lg p-10 text-sm overflow-hidden flex-shrink-0">
            <header className="flex justify-between items-center bg-cyan-800 text-white -mx-10 -mt-10 mb-6">
                <h1 className="text-lg font-bold text-white px-10 py-4">{props.data.personalInfo.name}</h1>
                <div className="bg-gray-600 py-4 self-stretch flex items-center justify-center shrink-0 w-40">
                    <span className="text-white text-sm">
                      {props.language === 'en' ? `Page ${props.pageNumber} / ${props.totalPages}` : `Strana ${props.pageNumber} / ${props.totalPages}`}
                    </span>
                </div>
            </header>
            <main className="pr-10">
                <section className="relative">
                    {props.pageNumber === 2 && (
                        <h3 className="text-sm font-bold text-cyan-800 uppercase tracking-widest mb-4">
                          {props.language === 'en' ? 'Detailed Experiences & Knowledge' : 'Detailní zkušenosti a znalosti'}
                        </h3>
                    )}
                    {props.historyItems.map((item, index) => (
                        <TimelineNode key={`sub-${item.type}-${item.originalIndex}`} item={item} isLast={index === props.historyItems.length - 1} variant="full" onChange={props.onChange} onProjectChange={props.onProjectChange} logos={props.logos}/>
                    ))}
                </section>
                {props.children}
            </main>
        </div>
    );
};

export const CVPreview: React.FC<CVPreviewProps> = (props) => {
  const [logos, setLogos] = useState<Record<string, string>>({});
  const [showWizard, setShowWizard] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [wizardImage, setWizardImage] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(false);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const activeElementRef = useRef<{ element: HTMLElement, timer: number } | null>(null);
  const wizardRef = useRef<HTMLDivElement>(null);
  const wizardImageRef = useRef<HTMLImageElement>(null);
  const wizardQuoteRef = useRef<HTMLDivElement>(null);


  const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    const isOpeningAnimation = ['fade-in', 'fly-in-closer', 'drop-in'].includes(e.animationName);
    if (isOpeningAnimation && e.currentTarget.classList.contains('opacity-0')) {
        e.currentTarget.classList.remove('opacity-0');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleLanguage = () => {
    props.onLanguageChange(prev => (prev === 'en' ? 'cs' : 'en'));
  };

  const handleCloseWizard = () => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setShowWizard(false);
      setIsAnimatingOut(false);
    }, 1200); // Adjusted to match the longest closing animation (overlay: 0.9s delay + 0.3s duration)
  };
  
  useEffect(() => {
    if (showWizard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup function to restore scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showWizard]);


  useEffect(() => {
    if (!showWizard) return;

    const wizardEl = wizardRef.current;
    if (!wizardEl) return;

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const centerX = innerWidth / 2;
        const centerY = innerHeight / 2;

        const maxRotation = 25;
        const rotateY = ((clientX - centerX) / centerX) * maxRotation;
        const rotateX = ((clientY - centerY) / centerY) * -maxRotation;

        wizardEl.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        wizardEl.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        document.body.removeEventListener('mouseleave', handleMouseLeave);
        if (wizardRef.current) {
            handleMouseLeave(); // Reset on close
        }
    };
  }, [showWizard]);


  useEffect(() => {
    fetch('/wizard.json')
      .then(response => response.ok ? response.json() : { image: '' })
      .then(data => {
        if (data.image) {
          setWizardImage(data.image);
        }
      })
      .catch(error => console.error('Error fetching wizard image:', error));
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const allowedTags = ['P', 'H1', 'H5', 'SPAN', 'LI', 'BLOCKQUOTE'];
        
        if (target && allowedTags.includes(target.tagName)) {
            if (activeElementRef.current) {
                clearTimeout(activeElementRef.current.timer);
                activeElementRef.current.element.classList.remove('shadow-[0_0_25px_5px_rgba(45,212,191,0.5)]', 'rounded-sm', 'transition-all', 'duration-150');
            }

            target.classList.add('shadow-[0_0_25px_5px_rgba(45,212,191,0.5)]', 'rounded-sm', 'transition-all', 'duration-150');

            const timer = window.setTimeout(() => {
                target.classList.remove('shadow-[0_0_25px_5px_rgba(45,212,191,0.5)]', 'rounded-sm', 'transition-all', 'duration-150');
                if (activeElementRef.current && activeElementRef.current.element === target) {
                    activeElementRef.current = null;
                }
            }, 1500);

            activeElementRef.current = { element: target, timer };
        }
    };

    container.addEventListener('click', handleClick);

    return () => {
      if (container) {
        container.removeEventListener('click', handleClick);
      }
      if (activeElementRef.current) {
          clearTimeout(activeElementRef.current.timer);
      }
    };
  }, []);
  
  const checkForOverflow = () => {
    const el = scrollContainerRef.current;
    if (el) {
      const hasOverflow = el.scrollWidth > el.clientWidth;
      setShowNav(hasOverflow);
      if (!hasOverflow) {
        setShowPrev(false);
        setShowNext(false);
      } else {
        handleScroll();
      }
    }
  };

  useEffect(() => {
    const loadedLogos: Record<string, string> = {};
    for (const companyName in logoInfo) {
      const { base64, mimeType } = logoInfo[companyName];
      loadedLogos[companyName] = `data:${mimeType};base64,${base64}`;
    }
    setLogos(loadedLogos);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => checkForOverflow(), 100);
    window.addEventListener('resize', checkForOverflow);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkForOverflow);
    };
  }, [props.data]);

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (el) {
      setShowPrev(el.scrollLeft > 5);
      setShowNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }
  };

  const scrollByPage = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (container && container.firstElementChild) {
      const pageWrapper = container.firstElementChild;
      if (pageWrapper && pageWrapper.firstElementChild) {
        const firstPage = pageWrapper.firstElementChild as HTMLElement;
        const scrollAmount = firstPage.offsetWidth + 28;
        
        container.scrollBy({
          left: direction === 'next' ? scrollAmount : -scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  const experiencesReversed = [...props.data.experiences].reverse();
  const educationsReversed = [...props.data.educations].reverse();

  const allHistoryItems: HistoryItem[] = [
    ...educationsReversed.map((e, i) => ({ ...e, type: 'education' as const, originalIndex: props.data.educations.length - 1 - i })),
    ...experiencesReversed.map((e, i) => ({ ...e, type: 'experience' as const, originalIndex: props.data.experiences.length - 1 - i }))
  ];

  const splitIndex1 = 4;
  const splitIndex2 = 6;
  const historyPage2 = allHistoryItems.slice(0, splitIndex1);
  const historyPage3 = allHistoryItems.slice(splitIndex1, splitIndex2);
  const historyPage4 = allHistoryItems.slice(splitIndex2);

  const totalPages = 1 + (historyPage2.length > 0 ? 1 : 0) + (historyPage3.length > 0 ? 1 : 0) + (historyPage4.length > 0 ? 1 : 0);
  
  const aboutMeSection = (
      props.data.aboutMe && props.data.aboutMe.length > 0 ? (
          <AboutMeSection 
              content={props.data.aboutMe} 
              language={props.language} 
          />
      ) : null
  );

  const onlinePresenceSection = (
      props.data.onlinePresence && props.data.onlinePresence.length > 0 ? (
          <OnlinePresenceSection
              links={props.data.onlinePresence}
              language={props.language}
              onCvLinkClick={() => setShowWizard(true)}
          />
      ) : null
  );

  const page2isLast = historyPage2.length > 0 && historyPage3.length === 0;
  const page3isLast = historyPage3.length > 0 && historyPage4.length === 0;
  const page4isLast = historyPage4.length > 0;

  const lastPageContent = (
    <>
      {aboutMeSection}
      {onlinePresenceSection}
    </>
  );

  const wizardQuotes = {
    en: "Any sufficiently advanced technology is indistinguishable from magic.",
    cs: "Každá dostatečně vyspělá technologie je nerozeznatelná od magie."
  };

  return (
    <div className="relative w-full min-h-full flex flex-col">
      <div 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
        className={`w-full flex-grow flex items-center px-8 overflow-x-auto no-scrollbar print:overflow-visible print:p-0 ${
          showNav ? 'justify-start' : 'justify-center'
        }`}
      >
        <div className="flex-shrink-0 flex flex-row gap-8 py-8 print:flex-col print:gap-0 print:py-0">
          <PageOne {...props} historyItems={allHistoryItems} logos={logos} onPhotoClick={() => setShowWizard(true)} />
          {historyPage2.length > 0 && (
            <SubsequentPage {...props} historyItems={historyPage2} pageNumber={2} totalPages={totalPages} logos={logos}>
              {page2isLast && lastPageContent}
            </SubsequentPage>
          )}
          {historyPage3.length > 0 && (
             <SubsequentPage {...props} historyItems={historyPage3} pageNumber={3} totalPages={totalPages} logos={logos}>
                {page3isLast && lastPageContent}
             </SubsequentPage>
          )}
          {historyPage4.length > 0 && (
             <SubsequentPage {...props} historyItems={historyPage4} pageNumber={4} totalPages={totalPages} logos={logos}>
                {page4isLast && lastPageContent}
             </SubsequentPage>
          )}
        </div>
      </div>
      
      {showWizard && (
        <>
          <div 
            className={`no-print fixed inset-0 z-40 bg-gray-900 flex items-center justify-center p-4 ${
              isAnimatingOut 
                ? 'animate-modal-overlay-out' 
                : 'opacity-0 animate-modal-overlay-in'
            }`}
            onClick={handleCloseWizard}
            onAnimationEnd={handleAnimationEnd}
            role="dialog"
            aria-modal="true"
          >
          </div>
          <div 
            ref={wizardRef}
            className={`no-print fixed inset-0 z-50 flex items-center justify-center p-4 [perspective:1000px] pointer-events-none`}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className={`relative bg-white p-4 rounded-lg shadow-2xl shadow-cyan-500/20 w-full max-w-sm [transform-style:preserve-3d] transition-transform duration-300 ease-out opacity-0 pointer-events-auto ${isAnimatingOut ? 'animate-modal-window-out' : 'animate-modal-window-in'}`}
              onAnimationEnd={handleAnimationEnd}
            >
                <div className="relative [transform-style:preserve-3d]">
                  {wizardImage && <img ref={wizardImageRef} src={wizardImage} alt="A wizard character" className="w-full h-auto block transition-transform duration-300 ease-out transform-gpu opacity-0 animate-fade-in" style={{ transform: 'translateZ(20px)', animationDelay: '1.5s' }} onAnimationEnd={handleAnimationEnd} />}
                  <div ref={wizardQuoteRef} className="absolute bottom-2 right-2 w-4/5 bg-white p-2 border-4 border-black rounded-lg transition-transform duration-300 ease-out transform-gpu opacity-0 animate-fly-in-closer" style={{ transform: 'translateZ(40px)', animationDelay: '1.6s' }} onAnimationEnd={handleAnimationEnd}>
                    <blockquote className="text-sm italic text-gray-900 text-center">
                      “{wizardQuotes[props.language]}”
                    </blockquote>
                    <cite className="block text-right text-xs text-gray-600 mt-1 not-italic">— Arthur C. Clarke</cite>
                  </div>
                </div>
              </div>
          </div>
           <button
              onClick={handleCloseWizard}
              className={`no-print fixed top-4 right-4 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-all shadow-md border-2 border-white z-50 opacity-0 ${isAnimatingOut ? 'animate-modal-close-out' : 'animate-modal-close-in'}`}
              aria-label="Close modal"
              onAnimationEnd={handleAnimationEnd}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </>
      )}

      {showNav && (
        <>
          <button 
            onClick={() => scrollByPage('prev')}
            className={`no-print fixed top-1/2 left-4 -translate-y-1/2 z-20 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-opacity duration-300 ${showPrev ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={() => scrollByPage('next')}
            className={`no-print fixed top-1/2 right-4 -translate-y-1/2 z-20 p-2 bg-black/40 text-white rounded-full hover:bg-black/60 transition-opacity duration-300 ${showNext ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      <div className="no-print fixed bottom-8 right-8 z-20 flex flex-col sm:flex-row gap-4">
        <button
          onClick={toggleLanguage}
          className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md shadow-lg hover:bg-gray-700 transition flex items-center gap-2 justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20z"/><path d="M2 12h20"/></svg>
          {props.language === 'en' ? 'Česky' : 'English'}
        </button>
        <button
          onClick={handlePrint}
          className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md shadow-lg hover:bg-cyan-700 transition flex items-center gap-2 justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          {props.language === 'en' ? 'Print / Save as PDF' : 'Tisk / Uložit jako PDF'}
        </button>
      </div>
    </div>
  );
};