import type { CVData, Experience, Language, Skill } from '../../types';

type Copy = {
  about: string;
  experience: string;
  skills: string;
  projects: string;
  download: string;
  basedIn: string;
  openTo: string;
  coreExpertise: string;
  selectedWork: string;
  selectedHighlights: string;
  technologyLens: string;
  technologyLensLead: string;
  quickOverview: string;
  companies: string;
  technologiesTracked: string;
  totalCareerSpan: string;
  present: string;
  tech: string;
  work: string;
  impact: string;
};

export const profileCopy: Record<Language, Copy> = {
  en: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    download: 'Download CV (PDF)',
    basedIn: 'Based in',
    openTo: 'Open to interesting projects',
    coreExpertise: 'Core Expertise',
    selectedWork: 'Selected Work',
    selectedHighlights: 'Selected Highlights',
    technologyLens: 'Technology Lens',
    technologyLensLead: 'Filter by technology and inspect where it was used, for how long, and in which projects.',
    quickOverview: 'Quick Overview',
    companies: 'Companies',
    technologiesTracked: 'Technologies tracked',
    totalCareerSpan: 'Career span',
    present: 'Present',
    tech: 'Tech',
    work: 'Work',
    impact: 'Impact',
  },
  cs: {
    about: 'O mne',
    experience: 'Zkusenosti',
    skills: 'Dovednosti',
    projects: 'Projekty',
    download: 'Stahnout CV (PDF)',
    basedIn: 'Zakladna',
    openTo: 'Otevren zajimavym projektum',
    coreExpertise: 'Klicove zkusenosti',
    selectedWork: 'Vybrana prace',
    selectedHighlights: 'Vybrane highlights',
    technologyLens: 'Technologicky prehled',
    technologyLensLead: 'Filtruj podle technologie a podivej se, kde byla pouzita, jak dlouho a na jakych projektech.',
    quickOverview: 'Rychly prehled',
    companies: 'Firmy',
    technologiesTracked: 'Sledovane technologie',
    totalCareerSpan: 'Delka praxe',
    present: 'Nyni',
    tech: 'Tech',
    work: 'Prace',
    impact: 'Dopad',
  },
};

export const flattenSkills = (skills: Skill[]): string[] => {
  const result: string[] = [];

  const visit = (items: Skill[]) => {
    items.forEach((item) => {
      result.push(item.name);
      if (item.children?.length) {
        visit(item.children);
      }
    });
  };

  visit(skills);
  return [...new Set(result)].filter((name) => !['Tools', 'Languages', 'Agile', 'EcmaScript', 'SPA&PWA', 'Databases', 'CI&CD'].includes(name));
};

export const getProfileHighlights = (data: CVData): string[] => {
  const summarySentences = data.summary
    .split('. ')
    .map((sentence) => sentence.replace(/\.$/, '').trim())
    .filter(Boolean)
    .slice(0, 2);

  const aboutLines = data.aboutMe.slice(0, 2).map((line) => line.replace(/\.$/, ''));
  return [...summarySentences, ...aboutLines].slice(0, 3);
};

export const getHeroPills = (data: CVData): string[] => flattenSkills(data.skills).slice(0, 5);

export const getFeaturedProjects = (data: CVData): string[] => {
  const projects = data.experiences.flatMap((experience) => experience.projects?.map((project) => project.name) ?? []);
  const online = data.onlinePresence.map((link) => link.label);
  return [...new Set([...projects, ...online])].slice(0, 5);
};

export const getVisibleExperiences = (data: CVData): Experience[] => data.experiences.slice(0, 3);

export const formatPeriod = (period: string, language: Language): string =>
  language === 'cs' ? period.replace('Now', 'Nyni').replace('Present', 'Nyni') : period;

const parseDateToken = (token: string): { month: number; year: number } | null => {
  const trimmed = token.trim();
  const monthYearMatch = trimmed.match(/^(\d{1,2})\/(\d{4})$/);
  if (monthYearMatch) {
    return { month: Number(monthYearMatch[1]), year: Number(monthYearMatch[2]) };
  }

  const yearMatch = trimmed.match(/^(\d{4})$/);
  if (yearMatch) {
    return { month: 1, year: Number(yearMatch[1]) };
  }

  if (/now|present|nyni/i.test(trimmed)) {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  }

  return null;
};

const monthsBetween = (start: { month: number; year: number }, end: { month: number; year: number }): number => {
  const startIndex = start.year * 12 + (start.month - 1);
  const endIndex = end.year * 12 + (end.month - 1);
  return Math.max(1, endIndex - startIndex + 1);
};

export const getExperienceMonths = (period: string): number => {
  const [startToken, endToken] = period.split('-').map((part) => part.trim());
  const start = parseDateToken(startToken);
  const end = parseDateToken(endToken || startToken);

  if (!start || !end) {
    return 12;
  }

  return monthsBetween(start, end);
};

export const formatDuration = (months: number): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths}m`;
  }

  if (remainingMonths === 0) {
    return `${years}y`;
  }

  return `${years}y ${remainingMonths}m`;
};

export type TechnologyEntry = {
  company: string;
  period: string;
  projects: string[];
  role: string;
  summary: string;
  months: number;
};

export type TechnologyInsight = {
  name: string;
  totalMonths: number;
  entries: TechnologyEntry[];
};

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildExperienceSearchText = (experience: Experience): string =>
  [
    experience.role,
    experience.company,
    experience.description,
    ...(experience.projects?.flatMap((project) => [project.name, project.description]) ?? []),
  ]
    .join(' ')
    .toLowerCase();

export const buildTechnologyInsights = (data: CVData): TechnologyInsight[] => {
  const technologies = flattenSkills(data.skills).filter((skill) => skill.length > 2);
  const experienceTexts = data.experiences.map((experience) => ({
    experience,
    text: buildExperienceSearchText(experience),
    months: getExperienceMonths(experience.period),
  }));

  return technologies
    .map((technology) => {
      const matcher = new RegExp(`(^|[^a-z0-9])${escapeRegExp(technology.toLowerCase())}([^a-z0-9]|$)`, 'i');
      const entries = experienceTexts
        .filter(({ text }) => matcher.test(text))
        .map(({ experience, months }) => ({
          company: experience.company,
          period: experience.period,
          projects: experience.projects?.filter((project) => matcher.test(`${project.name} ${project.description}`)).map((project) => project.name) ?? [],
          role: experience.role,
          summary: experience.description,
          months,
        }));

      return {
        name: technology,
        totalMonths: entries.reduce((total, entry) => total + entry.months, 0),
        entries,
      };
    })
    .filter((insight) => insight.entries.length > 0)
    .sort((left, right) => right.totalMonths - left.totalMonths);
};

export const getCareerSpanMonths = (data: CVData): number =>
  data.experiences.reduce((total, experience) => total + getExperienceMonths(experience.period), 0);
