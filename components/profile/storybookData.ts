import type { CVData, Language } from '../../types';
import {
  buildTechnologyInsights,
  flattenSkills,
  formatDuration,
  getCareerSpanMonths,
  getFeaturedProjects,
  getHeroPills,
  getProfileHighlights,
  getVisibleCompanies,
  profileCopy,
} from './profileContent';

export const storyData: CVData = {
  personalInfo: {
    name: 'Lukáš Kroček',
    title: 'Senior Frontend / React Developer',
    phone: ['+420', ' ', '737', ' ', '576', ' ', '072'],
    email: ['lkrocek', '@', 'gmail', '.', 'com'],
    linkedin: ['linkedin.com', '/', 'in', '/', 'lukaskrocek'],
    address: 'Prague, Czech Republic',
    profilePhoto: '',
  },
  summary:
    '15+ years building complex web applications. React architecture for large-scale apps. Performance optimization and maintainable UI systems.',
  companies: [
    {
      name: 'Inphinity',
      roles: [
        {
          title: 'Senior Frontend Developer',
          description: 'Developed complex dynamic form systems and worked on maintainable enterprise interfaces with a strong focus on frontend architecture.',
          projects: [
            {
              name: 'Dynamic Forms',
              from: '2022',
              to: null,
              description: 'Integrated complex APIs and stabilized large UI flows used by multiple teams.',
              technologies: ['React', 'TypeScript', 'REST API'],
            },
            {
              name: 'Design System',
              from: '2023',
              to: null,
              description: 'Turned ad hoc UI patterns into reusable React components and scalable layout primitives.',
              technologies: ['React', 'Storybook', 'TypeScript'],
            },
          ],
        },
      ],
    },
    {
      name: 'Multiverse',
      roles: [
        {
          title: 'Frontend Engineer',
          description: 'Led React UI development for real-time products and scaled interaction-heavy interfaces under growing load.',
          projects: [
            {
              name: 'Realtime UI',
              from: '2016',
              to: '2019',
              description: 'Scaled WebRTC-heavy user flows from tens of users to larger collaborative sessions.',
              technologies: ['React', 'WebRTC', 'TypeScript'],
            },
            {
              name: 'Architecture',
              from: '2019',
              to: '2021',
              description: 'Architected complex React component trees with clear ownership and better performance.',
              technologies: ['React', 'Performance', 'Architecture'],
            },
          ],
        },
      ],
    },
    {
      name: 'Independent',
      roles: [
        {
          title: 'Web Developer',
          description: 'Worked across product, implementation and refactoring, from HbbTV applications to modern responsive web interfaces.',
          projects: [
            {
              name: 'Cross-platform apps',
              from: '2011',
              to: '2016',
              description: 'Built interfaces for constrained devices while keeping the codebase maintainable.',
              technologies: ['JavaScript', 'CSS3', 'xHTML'],
            },
          ],
        },
      ],
    },
  ],
  educations: [],
  skills: [
    {
      name: 'Languages',
      children: [{ name: 'JavaScript' }, { name: 'TypeScript' }, { name: 'PHP' }],
    },
    {
      name: 'EcmaScript',
      children: [{ name: 'React' }, { name: 'Redux' }, { name: 'Storybook' }, { name: 'Node.js' }],
    },
    {
      name: 'SPA&PWA',
      children: [{ name: 'WebRTC' }, { name: 'LocalStorage' }, { name: 'REST API' }],
    },
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

export const storyInsights = buildTechnologyInsights(storyData);

export const getStoryLayoutProps = (language: Language = 'en') => {
  const copy = profileCopy[language];
  const heroPills = getHeroPills(storyData, language);
  const expertise = flattenSkills(storyData.skills).slice(0, 4);
  const insights = buildTechnologyInsights(storyData);
  const companies = getVisibleCompanies(storyData);

  return {
    copy,
    expertise,
    companies,
    featuredProjects: getFeaturedProjects(storyData),
    heroPills,
    highlights: getProfileHighlights(storyData),
    insights,
    overviewItems: [
      { label: copy.totalCareerSpan, value: formatDuration(getCareerSpanMonths(storyData)) },
      { label: copy.companies, value: String(storyData.companies.length) },
      { label: copy.technologiesTracked, value: String(insights.length) },
    ],
  };
};
