import { describe, expect, it } from 'vitest';
import { buildExplorerHash, parseExplorerHash } from './technologyExplorerState';

describe('technologyExplorerState', () => {
  it('parses explorer hash state', () => {
    expect(parseExplorerHash('#skills?view=timeline&sort=asc&tech=React&entry=a&company=b')).toEqual({
      viewMode: 'timeline',
      sortDirection: 'asc',
      technology: 'React',
      entryKey: 'a',
      company: 'b',
    });
  });

  it('falls back for invalid params', () => {
    expect(parseExplorerHash('#skills?view=unknown&sort=oops')).toEqual({
      viewMode: 'duration',
      sortDirection: 'desc',
      technology: null,
      entryKey: null,
      company: null,
    });
  });

  it('builds explorer hash state', () => {
    expect(buildExplorerHash({
      viewMode: 'companies',
      sortDirection: 'desc',
      technology: null,
      entryKey: null,
      company: 'Inphinity',
    })).toBe('#skills?view=companies&sort=desc&company=Inphinity');
  });
});
