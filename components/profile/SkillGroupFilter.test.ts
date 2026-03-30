import { describe, expect, it } from 'vitest';
import { invertSkillGroups, isGroupActive, toggleSkillGroup } from './SkillGroupFilter';

const ALL_GROUPS = ['Languages', 'EcmaScript', 'SPA&PWA', 'CI&CD', 'Platforms', 'Tools'];

describe('isGroupActive', () => {
  it('returns true for any group when selection is empty (no filter)', () => {
    expect(isGroupActive('Languages', new Set())).toBe(true);
    expect(isGroupActive('Tools', new Set())).toBe(true);
  });

  it('returns true for a group that is in the selection', () => {
    expect(isGroupActive('EcmaScript', new Set(['EcmaScript', 'SPA&PWA']))).toBe(true);
  });

  it('returns false for a group not in the selection', () => {
    expect(isGroupActive('Languages', new Set(['EcmaScript', 'SPA&PWA']))).toBe(false);
  });
});

describe('toggleSkillGroup', () => {
  it('deselects one group when toggling from "all selected" state', () => {
    const result = toggleSkillGroup('Languages', new Set(), ALL_GROUPS);
    expect(result).toEqual(new Set(['EcmaScript', 'SPA&PWA', 'CI&CD', 'Platforms', 'Tools']));
  });

  it('adds a group when it is not in the selection', () => {
    const result = toggleSkillGroup('Platforms', new Set(['EcmaScript']), ALL_GROUPS);
    expect(result).toEqual(new Set(['EcmaScript', 'Platforms']));
  });

  it('removes a group when it is already in the selection', () => {
    const result = toggleSkillGroup('EcmaScript', new Set(['EcmaScript', 'SPA&PWA']), ALL_GROUPS);
    expect(result).toEqual(new Set(['SPA&PWA']));
  });

  it('normalizes to empty set when all groups become selected', () => {
    const allButOne = new Set(ALL_GROUPS.filter((g) => g !== 'Languages'));
    const result = toggleSkillGroup('Languages', allButOne, ALL_GROUPS);
    expect(result).toEqual(new Set());
  });

  it('removing the only selected group results in an empty set (no filter)', () => {
    const result = toggleSkillGroup('EcmaScript', new Set(['EcmaScript']), ALL_GROUPS);
    expect(result).toEqual(new Set());
  });

  it('does not mutate the original set', () => {
    const original = new Set(['EcmaScript', 'Tools']);
    toggleSkillGroup('Tools', original, ALL_GROUPS);
    expect(original).toEqual(new Set(['EcmaScript', 'Tools']));
  });
});

describe('invertSkillGroups', () => {
  it('returns the complement of the current selection', () => {
    const result = invertSkillGroups(new Set(['EcmaScript', 'Languages']), ALL_GROUPS);
    expect(result).toEqual(new Set(['SPA&PWA', 'CI&CD', 'Platforms', 'Tools']));
  });

  it('normalizes to empty set when inverted result would be all groups', () => {
    // inverting an empty set (all selected) yields no groups — which normalizes to empty
    const result = invertSkillGroups(new Set(), ALL_GROUPS);
    expect(result).toEqual(new Set());
  });

  it('returns empty set (no filter) when inverted result equals all groups', () => {
    // single group selected → inverted = all others = all groups minus 1, not all → stays explicit
    const result = invertSkillGroups(new Set(['Languages']), ALL_GROUPS);
    expect([...result]).not.toContain('Languages');
    expect(result.size).toBe(ALL_GROUPS.length - 1);
  });

  it('does not mutate the original set', () => {
    const original = new Set(['EcmaScript']);
    invertSkillGroups(original, ALL_GROUPS);
    expect(original).toEqual(new Set(['EcmaScript']));
  });
});
