import React, { useRef, useEffect } from 'react';
import { PersonalInfo } from '../types';
import { Editable } from './common';

const ProfilePlaceholder: React.FC = () => (
    <div className="w-32 h-32 rounded-full bg-cyan-500 flex items-center justify-center border-4 border-white shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </div>
);

const ContactIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-5 h-5 flex items-center justify-center text-white">{children}</div>
);

const ContactInfoLine: React.FC<{ icon: React.ReactNode; children: string; onUpdate: (value: string) => void; className?: string; }> = ({ icon, children, onUpdate, className }) => (
    <li className={`flex items-start gap-3 ${className}`}>
        <ContactIcon>{icon}</ContactIcon>
        <span className="flex-1">
          <Editable onUpdate={onUpdate} as="span" variant="dark">{children}</Editable>
        </span>
    </li>
);


type CVHeaderProps = {
    personalInfo: PersonalInfo;
    onChange: (section: 'personalInfo', index: null, field: string, value: string) => void;
    onPhotoClick?: () => void;
}

export const CVHeader: React.FC<CVHeaderProps> = ({ personalInfo, onChange, onPhotoClick }) => {
    const photoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const photoEl = photoRef.current;
        if (!photoEl) return; // Effect should work regardless of onPhotoClick

        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            const centerX = innerWidth / 2;
            const centerY = innerHeight / 2;
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const offsetX = mouseX - centerX;
            const offsetY = mouseY - centerY;

            const maxRotation = 30;
            const rotateY = (offsetX / centerX) * maxRotation;
            const rotateX = (offsetY / centerY) * -maxRotation;

            photoEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
        };

        const handleMouseLeave = () => {
            photoEl.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [onPhotoClick]);


    return (
        <header className="bg-cyan-800 text-white p-10 shrink-0 flex justify-between items-center gap-8">
            <div>
                <Editable as="h1" className="text-4xl font-bold text-white" onUpdate={v => onChange('personalInfo', null, 'name', v)} variant="dark">{personalInfo.name}</Editable>
                <Editable as="p" className="text-[0.95rem] text-cyan-200 mt-1 whitespace-nowrap" onUpdate={v => onChange('personalInfo', null, 'title', v)} variant="dark">{personalInfo.title}</Editable>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-cyan-50 mt-6 text-xs">
                    <ContactInfoLine icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>} onUpdate={v => onChange('personalInfo', null, 'phone', v)}>
                        {personalInfo.phone.join('')}
                    </ContactInfoLine>
                     <ContactInfoLine icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>} onUpdate={v => onChange('personalInfo', null, 'linkedin', v)}>
                        {personalInfo.linkedin.join('')}
                    </ContactInfoLine>
                    <ContactInfoLine icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>} onUpdate={v => onChange('personalInfo', null, 'email', v)}>
                        {personalInfo.email.join('')}
                    </ContactInfoLine>
                    <ContactInfoLine icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>} onUpdate={v => onChange('personalInfo', null, 'address', v)}>
                        {personalInfo.address}
                    </ContactInfoLine>
                </ul>
            </div>
            <div 
                className="shrink-0 [perspective:1000px] group/photo"
                onClick={onPhotoClick}
            >
                {personalInfo.profilePhoto ? (
                    <div 
                        ref={photoRef}
                        className={`relative rounded-full w-32 h-32 overflow-hidden border-4 border-white shadow-md bg-[#CACACB] bg-cover bg-no-repeat bg-center print-keep-overflow transition-transform duration-300 ease-out ${onPhotoClick ? 'cursor-pointer group-hover/photo:scale-105 group-hover/photo:shadow-xl' : ''}`}
                        style={{ backgroundImage: `url(${personalInfo.profilePhoto})` }}
                        role="img"
                        aria-label="Profile"
                    >
                    </div>
                ) : (
                    <div ref={photoRef} className={`transition-transform duration-300 ease-out ${onPhotoClick ? 'cursor-pointer group-hover/photo:scale-105 group-hover/photo:shadow-xl' : ''}`}>
                       <ProfilePlaceholder />
                    </div>
                )}
            </div>
        </header>
    );
}