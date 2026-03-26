import { describe, it, expect } from 'vitest';
import { buildTechnologyInsights, formatDuration } from './profileContent';
import type { CVData } from '../../types';

// ─── helpers ────────────────────────────────────────────────────────────────

const baseData = (): CVData => ({
  personalInfo: { name: 'Test User', title: 'Developer', phone: [], email: [], linkedin: [], address: '', profilePhoto: '' },
  summary: '',
  aboutMe: [],
  skills: [{ name: 'JavaScript' }],
  companies: [],
  educations: [],
  onlinePresence: [],
});

const company = (
  name: string,
  roles: CVData['companies'][number]['roles']
): CVData['companies'][number] => ({ name, roles });

const role = (
  from: string,
  to: string | null,
  technologies: string[],
  projects?: CVData['companies'][number]['roles'][number]['projects']
): CVData['companies'][number]['roles'][number] => ({
  title: 'Developer',
  description: '',
  projects: projects ?? [{ name: 'App', description: '', technologies, from, to }],
});

const project = (
  from: string,
  to: string | null,
  technologies: string[]
): NonNullable<CVData['companies'][number]['roles'][number]['projects']>[number] => ({
  name: 'Project',
  description: '',
  technologies,
  from,
  to,
});

// ─── mergeIntervals via buildTechnologyInsights ─────────────────────────────

describe('buildTechnologyInsights — interval merging', () => {
  it('sums non-overlapping intervals from two separate roles', () => {
    // JS: 2018-01 → 2019-12 (24m) + 2021-01 → 2021-12 (12m) = 36m
    const data: CVData = {
      ...baseData(),
      companies: [
        company('A', [role('2018-01', '2019-12', ['JavaScript'])]),
        company('B', [role('2021-01', '2021-12', ['JavaScript'])]),
      ],
    };
    const [js] = buildTechnologyInsights(data);
    expect(js.name).toBe('JavaScript');
    expect(js.totalMonths).toBe(36);
  });

  it('deduplicates fully overlapping intervals', () => {
    // same period at two companies → only counted once
    const data: CVData = {
      ...baseData(),
      companies: [
        company('A', [role('2020-01', '2020-12', ['JavaScript'])]),
        company('B', [role('2020-01', '2020-12', ['JavaScript'])]),
      ],
    };
    const [js] = buildTechnologyInsights(data);
    expect(js.totalMonths).toBe(12);
  });

  it('counts only unique months when intervals partially overlap', () => {
    // A: 2020-01 → 2022-12 (36m)  B: 2022-01 → 2023-12 (24m)
    // overlap: 2022-01 → 2022-12 (12m)  → unique = 36 + 12 = 48m
    const data: CVData = {
      ...baseData(),
      companies: [
        company('A', [role('2020-01', '2022-12', ['JavaScript'])]),
        company('B', [role('2022-01', '2023-12', ['JavaScript'])]),
      ],
    };
    const [js] = buildTechnologyInsights(data);
    expect(js.totalMonths).toBe(48);
  });

  it('uses only matching project intervals, not the whole role span', () => {
    // role has two JS projects totalling 18m, but role spans 72m overall
    const data: CVData = {
      ...baseData(),
      companies: [
        company('A', [
          {
            title: 'Dev',
            description: '',
            projects: [
              project('2021-01', '2021-12', ['JavaScript']),  // 12m
              project('2023-01', '2023-06', ['JavaScript']),  // 6m
            ],
          },
        ]),
      ],
    };
    const [js] = buildTechnologyInsights(data);
    expect(js.totalMonths).toBe(18);
  });

  it('combines matched project intervals across companies without double-counting', () => {
    // Company A: JS project 2021-01 → 2021-12  (12m)
    // Company B: JS project 2023-01 → 2023-06  (6m)
    // They do not overlap → total = 18m
    const data: CVData = {
      ...baseData(),
      companies: [
        company('A', [
          {
            title: 'Dev',
            description: '',
            projects: [project('2021-01', '2021-12', ['JavaScript'])],
          },
        ]),
        company('B', [role('2023-01', '2023-06', ['JavaScript'])]),
      ],
    };
    const [js] = buildTechnologyInsights(data);
    expect(js.totalMonths).toBe(18);
  });

  it('deduplicates overlapping project intervals across companies', () => {
    // Company A project: 2020-01 → 2022-12 (36m)
    // Company B project: 2021-01 → 2021-12 (12m) — fully inside A
    // Unique: 36m
    const data: CVData = {
      ...baseData(),
      companies: [
        company('A', [
          {
            title: 'Dev',
            description: '',
            projects: [project('2020-01', '2022-12', ['JavaScript'])],
          },
        ]),
        company('B', [role('2021-01', '2021-12', ['JavaScript'])]),
      ],
    };
    const [js] = buildTechnologyInsights(data);
    expect(js.totalMonths).toBe(36);
  });
});

// ─── formatDuration ──────────────────────────────────────────────────────────

describe('formatDuration', () => {
  it('shows only years when no remaining months', () => {
    expect(formatDuration(24)).toBe('2y');
  });

  it('shows only months when less than a year', () => {
    expect(formatDuration(6)).toBe('6m');
  });

  it('shows years and months', () => {
    expect(formatDuration(14)).toBe('1y 2m');
  });
});
