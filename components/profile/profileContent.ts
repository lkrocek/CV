import type { CVData, Company, Language, Project, Role, Skill } from '../../types';

type Copy = {
  about: string;
  experience: string;
  experienceSection: string;
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
  showMore: string;
  technologyExposure: string;
  matchingExperienceBlocks: string;
  companyContexts: string;
  viewByDuration: string;
  viewByGroup: string;
  viewByTimeline: string;
  viewByCompanies: string;
  sortDescending: string;
  sortAscending: string;
  sortNewestFirst: string;
  sortOldestFirst: string;
  filterAllGroups: string;
  filterGroupsCount: string;
  filterClearSelection: string;
  filterInvertSelection: string;
  filterSelectOnly: string;
};

export const profileCopy: Record<Language, Copy> = {
  en: {
    about: 'About',
    experience: 'Print version',
    experienceSection: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    download: 'Download CV (PDF)',
    basedIn: 'Based in:',
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
    showMore: 'Show more',
    technologyExposure: 'total hands-on experience',
    matchingExperienceBlocks: 'matching experience blocks',
    companyContexts: 'companies or client contexts',
    viewByDuration: 'Most used',
    viewByGroup: 'By group',
    viewByTimeline: 'Timeline',
    viewByCompanies: 'Collaborations',
    sortDescending: 'Descending',
    sortAscending: 'Ascending',
    sortNewestFirst: 'Newest first',
    sortOldestFirst: 'Oldest first',
    filterAllGroups: 'All groups',
    filterGroupsCount: 'groups',
    filterClearSelection: 'Clear selection',
    filterInvertSelection: 'Invert selection',
    filterSelectOnly: 'Select only this group',
  },
  cs: {
    about: 'O mně',
    experience: 'Tisková verze',
    experienceSection: 'Zkušenosti',
    skills: 'Dovednosti',
    projects: 'Projekty',
    download: 'Stáhnout CV (PDF)',
    basedIn: 'Základna:',
    openTo: 'Otevřen zajímavým projektům',
    coreExpertise: 'Klíčové zkušenosti',
    selectedWork: 'Vybraná práce',
    selectedHighlights: 'Vybrané highlighty',
    technologyLens: 'Technologický přehled',
    technologyLensLead: 'Filtruj podle technologie a podívej se, kde byla použita, jak dlouho a na jakých projektech.',
    quickOverview: 'Rychlý přehled',
    companies: 'Firmy',
    technologiesTracked: 'Sledované technologie',
    totalCareerSpan: 'Délka praxe',
    present: 'Nyní',
    tech: 'Technologie',
    work: 'Práce',
    impact: 'Dopad',
    showMore: 'Zobrazit více',
    technologyExposure: 'celková praxe s technologií',
    matchingExperienceBlocks: 'odpovídajících zkušeností',
    companyContexts: 'firem nebo klientských kontextů',
    viewByDuration: 'Nejpoužívanější',
    viewByGroup: 'Podle skupin',
    viewByTimeline: 'Časová osa',
    viewByCompanies: 'Spolupráce',
    sortDescending: 'Sestupně',
    sortAscending: 'Vzestupně',
    sortNewestFirst: 'Od nejnovějších',
    sortOldestFirst: 'Od nejstarších',
    filterAllGroups: 'Všechny skupiny',
    filterGroupsCount: 'skupin',
    filterClearSelection: 'Zrušit výběr',
    filterInvertSelection: 'Obrátit výběr',
    filterSelectOnly: 'Vybrat pouze tuto skupinu',
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

export const getHeroPills = (data: CVData, language: Language): string[] => {
  const years = Math.round(getCareerSpanMonths(data) / 12);
  const yearsLabel = language === 'cs' ? `~${years} let` : `~${years} years`;
  return [yearsLabel, 'Entertainment UI', 'Enterprise UI', 'Performance', 'TypeScript'];
};

export const getFeaturedProjects = (data: CVData): string[] => {
  const projects = data.companies.flatMap((company) =>
    company.roles.flatMap((role) => role.projects?.map((project) => project.name) ?? [])
  );
  const online = data.onlinePresence.map((link) => link.label);
  return [...new Set([...projects, ...online])].slice(0, 5);
};

export const getVisibleCompanies = (data: CVData): Company[] => data.companies.slice(0, 3);

const parseDateField = (value: string): { year: number; month: number } => {
  if (value.includes('-')) {
    const [year, month] = value.split('-');
    return { year: Number(year), month: Number(month) };
  }
  return { year: Number(value), month: 1 };
};

const monthsBetween = (start: { year: number; month: number }, end: { year: number; month: number }): number =>
  Math.max(1, (end.year * 12 + end.month) - (start.year * 12 + start.month) + 1);

export const getRoleDateRange = (projects: Project[]): { from: string; to: string | null } => {
  if (projects.length === 0) return { from: '?', to: null };

  let minIdx = Infinity;
  let minFrom = projects[0].from;
  let maxIdx = -Infinity;
  let maxTo: string | null = null;

  for (const p of projects) {
    const [start, end] = toMonthIndex(p.from, p.to);
    if (start < minIdx) {
      minIdx = start;
      minFrom = p.from;
    }
    if (p.to === null) {
      maxTo = null;
      maxIdx = Infinity;
    } else if (maxIdx !== Infinity && end > maxIdx) {
      maxIdx = end;
      maxTo = p.to;
    }
  }

  return { from: minFrom, to: maxTo };
};

export const getRoleMonths = (projects: Project[]): number =>
  mergeIntervals(projects.map((p) => toMonthIndex(p.from, p.to)));

export const formatPeriod = (projects: Project[], language: Language): string => {
  const { from, to } = getRoleDateRange(projects);
  const formatDate = (value: string): string => {
    if (value.includes('-')) {
      const [year, month] = value.split('-');
      return `${month}/${year}`;
    }
    return value;
  };
  const present = language === 'cs' ? 'Nyní' : 'Now';
  const end = to ? formatDate(to) : present;
  return `${formatDate(from)} – ${end}`;
};

export const formatDuration = (months: number, language: Language = 'en'): string => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const yearSuffix = language === 'cs' ? 'r' : 'y';

  if (years === 0) {
    return `${remainingMonths}m`;
  }

  if (remainingMonths === 0) {
    return `${years}${yearSuffix}`;
  }

  return `${years}${yearSuffix} ${remainingMonths}m`;
};

export type TechnologyEntry = {
  company: string;
  period: string;
  projects: string[];
  projectDetails: Project[];
  role: string;
  summary: string;
  months: number;
  fromMonthIdx: number;
  toMonthIdx: number;
};

export type TechnologyInsight = {
  name: string;
  totalMonths: number;
  category: string;
  lastUsedMonthIdx: number; // higher = more recent; current month = "present"
  entries: TechnologyEntry[];
};

const escapeRegExp = (value: string): string => value.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);

const toMonthIndex = (from: string, to: string | null): [number, number] => {
  const now = new Date();
  const start = parseDateField(from);
  const end = to !== null && to !== undefined ? parseDateField(to) : { year: now.getFullYear(), month: now.getMonth() + 1 };
  return [start.year * 12 + start.month, end.year * 12 + end.month];
};

const mergeIntervals = (intervals: [number, number][]): number => {
  if (intervals.length === 0) return 0;
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  let merged = sorted[0][1];
  let current = sorted[0][0];
  let total = 0;
  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i];
    if (start <= merged + 1) {
      merged = Math.max(merged, end);
    } else {
      total += merged - current + 1;
      current = start;
      merged = end;
    }
  }
  return total + merged - current + 1;
};

const buildRoleSearchText = (companyName: string, role: Role): string =>
  [
    role.title,
    companyName,
    role.description,
    ...(role.projects?.flatMap((project) => [project.name, project.description]) ?? []),
  ]
    .join(' ')
    .toLowerCase();

const projectUsesTechnology = (project: Project, technology: string, matcher: RegExp): boolean => {
  const explicitTechnologies = project.technologies?.map((item) => item.toLowerCase()) ?? [];
  if (explicitTechnologies.includes(technology.toLowerCase())) {
    return true;
  }

  return matcher.test(`${project.name} ${project.description}`.toLowerCase());
};

const CATEGORY_NAMES = new Set(['Languages', 'Agile', 'EcmaScript', 'SPA&PWA', 'Databases', 'CI&CD', 'Platforms', 'Tools']);

const buildCategoryMap = (skills: Skill[]): Map<string, string> => {
  const map = new Map<string, string>();
  const visit = (items: Skill[], category: string) => {
    for (const item of items) {
      const cat = CATEGORY_NAMES.has(item.name) ? item.name : category;
      if (!CATEGORY_NAMES.has(item.name)) map.set(item.name, cat);
      if (item.children) visit(item.children, cat);
    }
  };
  visit(skills, 'Other');
  return map;
};

export const buildTechnologyInsights = (data: CVData): TechnologyInsight[] => {
  const technologies = flattenSkills(data.skills).filter((skill) => skill.length > 2);
  const categoryMap = buildCategoryMap(data.skills);

  const roleEntries = data.companies.flatMap((company) =>
    company.roles.map((role) => ({
      companyName: company.name,
      role,
      text: buildRoleSearchText(company.name, role),
    }))
  );

  return technologies
    .map((technology) => {
      const matcher = new RegExp(`(^|[^a-z0-9])${escapeRegExp(technology.toLowerCase())}([^a-z0-9]|$)`, 'i');
      const entries = roleEntries
        .filter(({ role, text }) => {
          const projectMatch = role.projects?.some((project) => projectUsesTechnology(project, technology, matcher)) ?? false;
          return projectMatch || matcher.test(text);
        })
        .map(({ companyName, role }) => {
          const matchingProjects = role.projects?.filter((project) =>
            projectUsesTechnology(project, technology, matcher)
          ) ?? [];
          const roleProjects = role.projects ?? [];

          const projectIntervals = matchingProjects.map((p) => toMonthIndex(p.from, p.to));

          // Fall back to all role project intervals when no specific project matched by name
          const effectiveIntervals: [number, number][] =
            projectIntervals.length > 0 ? projectIntervals : roleProjects.map((p) => toMonthIndex(p.from, p.to));
          const projectNames = matchingProjects.length > 0
            ? matchingProjects.map((project) => project.name)
            : roleProjects.map((project) => project.name);

          const fromMonthIdx = effectiveIntervals.length > 0 ? Math.min(...effectiveIntervals.map(([s]) => s)) : 0;
          const toMonthIdx   = effectiveIntervals.length > 0 ? Math.max(...effectiveIntervals.map(([, e]) => e)) : 0;

          return {
            company: companyName,
            period: formatPeriod(roleProjects, 'en'),
            projects: projectNames,
            projectDetails: matchingProjects.length > 0 ? matchingProjects : roleProjects,
            role: role.title,
            summary: role.description,
            months: mergeIntervals(effectiveIntervals),
            fromMonthIdx,
            toMonthIdx,
            intervals: effectiveIntervals,
          };
        });

      // merge all intervals across all entries — always works because every entry has intervals
      const allIntervals = entries.flatMap((e) => e.intervals);
      const totalMonths = mergeIntervals(allIntervals);
      const lastUsedMonthIdx = allIntervals.length > 0 ? Math.max(...allIntervals.map(([, end]) => end)) : 0;

      return {
        name: technology,
        totalMonths,
        category: categoryMap.get(technology) ?? 'Other',
        lastUsedMonthIdx,
        entries: entries.map(({ intervals: _intervals, ...rest }) => rest),
      };
    })
    .filter((insight) => insight.entries.length > 0)
    .sort((left, right) => right.totalMonths - left.totalMonths);
};

export const getCareerSpanMonths = (data: CVData): number => {
  const allIntervals = data.companies
    .flatMap((company) => company.roles)
    .flatMap((role) => role.projects ?? [])
    .map((project) => toMonthIndex(project.from, project.to));
  return mergeIntervals(allIntervals);
};
