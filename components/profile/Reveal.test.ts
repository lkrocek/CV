import { describe, expect, it } from 'vitest';
import { getRevealState } from './Reveal';

describe('getRevealState', () => {
  it('reveals content when ten percent of the viewport is visible', () => {
    expect(getRevealState(0.1)).toEqual({ isVisible: true, showScrollHint: false });
  });

  it('shows a scroll hint below ten percent visibility', () => {
    expect(getRevealState(0.05)).toEqual({ isVisible: false, showScrollHint: true });
  });

  it('shows a hint when the element is not visible yet', () => {
    expect(getRevealState(0)).toEqual({ isVisible: false, showScrollHint: true });
  });
});
