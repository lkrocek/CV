import type { CVData, Language } from '../../types';

const sanitizeFilePart = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const buildPdfFileName = (data: CVData, language: Language) => {
  const base = sanitizeFilePart(data.personalInfo.name || 'cv');
  return `${base || 'cv'}-${language}.pdf`;
};
