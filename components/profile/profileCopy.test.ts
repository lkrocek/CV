import { describe, it, expect } from 'vitest';
import { profileCopy } from './profileContent';

const en = profileCopy.en;
const cs = profileCopy.cs;
const keys = Object.keys(en) as (keyof typeof en)[];

describe('profileCopy completeness', () => {
  it('cs has the same keys as en', () => {
    expect(Object.keys(cs).sort()).toEqual(Object.keys(en).sort());
  });

  it('every cs string is non-empty', () => {
    const empty = keys.filter((k) => !cs[k] || cs[k].trim() === '');
    expect(empty).toEqual([]);
  });

  it('every cs string differs from its en counterpart', () => {
    const identical = keys.filter((k) => cs[k] === en[k]);
    expect(identical).toEqual([]);
  });
});
