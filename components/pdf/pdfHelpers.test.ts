import { describe, expect, it } from 'vitest';
import { buildPdfFileName } from './pdfHelpers';
import { getProjectNamesForPdf, joinField, resolvePhotoSource, splitSummary } from './pdfRenderHelpers';
import { storyData } from '../profile/storybookData';

describe('pdfHelpers', () => {
  it('builds stable filenames for English and Czech exports', () => {
    expect(buildPdfFileName(storyData, 'en')).toBe('lukas-krocek-en.pdf');
    expect(buildPdfFileName(storyData, 'cs')).toBe('lukas-krocek-cs.pdf');
  });

  it('sanitizes names with accents and punctuation', () => {
    expect(
      buildPdfFileName(
        {
          ...storyData,
          personalInfo: {
            ...storyData.personalInfo,
            name: 'Lukáš  Kroček / CV',
          },
        },
        'en'
      )
    ).toBe('lukas-krocek-cv-en.pdf');
  });
});

describe('pdfRenderHelpers', () => {
  it('joins split fields without separators', () => {
    expect(joinField(['lkrocek', '@', 'gmail', '.', 'com'])).toBe('lkrocek@gmail.com');
  });

  it('splits summary into lead and rest', () => {
    expect(splitSummary('One sentence. Second sentence. Third sentence.')).toEqual({
      lead: 'One sentence.',
      rest: 'Second sentence. Third sentence.',
    });
  });

  it('keeps single-sentence summaries intact', () => {
    expect(splitSummary('Short summary only.')).toEqual({
      lead: 'Short summary only.',
      rest: '',
    });
  });

  it('returns data and http urls unchanged', () => {
    expect(resolvePhotoSource('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    expect(resolvePhotoSource('https://example.com/photo.png')).toBe('https://example.com/photo.png');
  });

  it('resolves relative photo paths against the current origin', () => {
    const previousLocation = globalThis.location;
    Object.defineProperty(globalThis, 'location', {
      configurable: true,
      value: { origin: 'https://cv.example' },
    });

    try {
      expect(resolvePhotoSource('/photo.png')).toBe('https://cv.example/photo.png');
    } finally {
      Object.defineProperty(globalThis, 'location', {
        configurable: true,
        value: previousLocation,
      });
    }
  });

  it('limits project names to the first three entries', () => {
    expect(
      getProjectNamesForPdf([
        { name: 'One', from: '2020', to: null, description: '', technologies: [] },
        { name: 'Two', from: '2021', to: null, description: '', technologies: [] },
        { name: 'Three', from: '2022', to: null, description: '', technologies: [] },
        { name: 'Four', from: '2023', to: null, description: '', technologies: [] },
      ])
    ).toEqual(['One', 'Two', 'Three']);
  });
});
