import type { Project } from '../../types';

export const joinField = (value: string[]) => value.join('');

export const resolvePhotoSource = (photo: string) => {
  if (!photo) return null;
  if (photo.startsWith('data:') || photo.startsWith('http://') || photo.startsWith('https://')) return photo;
  if (typeof globalThis === 'undefined') return photo;
  return new URL(photo, globalThis.location.origin).toString();
};

export const splitSummary = (summary: string) => {
  const firstSentenceEnd = summary.indexOf('. ');
  if (firstSentenceEnd === -1) {
    return { lead: summary, rest: '' };
  }

  return {
    lead: `${summary.slice(0, firstSentenceEnd)}.`,
    rest: summary.slice(firstSentenceEnd + 2),
  };
};

export const getProjectNamesForPdf = (projects?: Project[]) => {
  if (!projects?.length) return [];
  return projects.slice(0, 3).map((project) => project.name);
};
