import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CVPreview } from './CVPreview';
import type { CVData, Language } from '../types';

const storyData: CVData = {
  personalInfo: {
    name: 'Lukas Krocek',
    title: 'Senior Frontend / React Developer',
    phone: ['+420', ' ', '737', ' ', '576', ' ', '072'],
    email: ['lkrocek', '@', 'gmail', '.', 'com'],
    linkedin: ['linkedin.com', '/', 'in', '/', 'lukaskrocek'],
    address: 'Prague, Czech Republic',
    profilePhoto: '',
  },
  summary:
    '15+ years building complex web applications. React architecture for large-scale apps. Performance optimization and maintainable UI systems.',
  experiences: [
    {
      role: 'Senior Frontend Developer',
      company: 'Inphinity',
      period: '2022 - Present',
      description: 'Developed complex dynamic form systems and worked on maintainable enterprise interfaces with a strong focus on frontend architecture.',
      projects: [
        { name: 'Dynamic Forms', description: 'Integrated complex APIs and stabilized large UI flows used by multiple teams.' },
        { name: 'Design System', description: 'Turned ad hoc UI patterns into reusable React components and scalable layout primitives.' },
      ],
    },
    {
      role: 'Frontend Engineer',
      company: 'Multiverse',
      period: '2016 - 2021',
      description: 'Led React UI development for real-time products and scaled interaction-heavy interfaces under growing load.',
      projects: [
        { name: 'Realtime UI', description: 'Scaled WebRTC-heavy user flows from tens of users to larger collaborative sessions.' },
        { name: 'Architecture', description: 'Architected complex React component trees with clear ownership and better performance.' },
      ],
    },
    {
      role: 'Web Developer',
      company: 'Independent',
      period: '2011 - 2016',
      description: 'Worked across product, implementation and refactoring, from HbbTV applications to modern responsive web interfaces.',
      projects: [
        { name: 'Cross-platform apps', description: 'Built interfaces for constrained devices while keeping the codebase maintainable.' },
      ],
    },
  ],
  educations: [],
  skills: [
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'Architecture' },
    { name: 'Performance' },
    { name: 'Next.js' },
    { name: 'WebRTC' },
  ],
  aboutMe: [
    'Frontend architecture for large-scale apps.',
    'Performance optimization and maintainable UI systems.',
    'Comfortable turning rough prototypes into coherent products.',
  ],
  onlinePresence: [
    { url: 'https://www.krocek.cz/', label: 'Online CV', description: 'Main personal presentation.' },
    { url: 'https://agecraft.netlify.app/', label: 'AgeCraft', description: 'Experimental side project.' },
  ],
};

const meta = {
  title: 'CV/Layout',
  parameters: {
    docs: {
      description: {
        component:
          'Redesign aligned to the new dark landing-page layout. Images are intentionally represented by gradients/placeholders for now. Printing is intentionally out of scope in this iteration. The layout now includes a technology explorer that groups inferred experience by stack and reveals matching companies and projects on click.',
      },
    },
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const PreviewStory = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <CVPreview
      data={storyData}
      language={language}
      onLanguageChange={setLanguage}
      onChange={() => {}}
      onProjectChange={() => {}}
    />
  );
};

export const LandingLayout: Story = {
  render: () => <PreviewStory />,
};
