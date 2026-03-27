export interface Project {
  name: string;
  description: string;
  technologies?: string[];
  from: string;
  to: string | null;
}

export interface Role {
  title: string;
  description: string;
  projects?: Project[];
}

export interface Company {
  name: string;
  roles: Role[];
  hideOnPageOne?: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string[];
  email: string[];
  linkedin: string[];
  address: string;
  profilePhoto: string;
}

export interface Education {
  degree: string;
  institution: string;
  from: string;
  to: string | null;
  description: string;
  projects?: Project[];
  hideOnPageOne?: boolean;
}

export interface Skill {
  name: string;
  children?: Skill[];
}

export interface OnlineLink {
  url: string;
  label: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  companies: Company[];
  educations: Education[];
  skills: Skill[];
  aboutMe: string[];
  onlinePresence: OnlineLink[];
}

export type Language = 'en' | 'cs';

export type CvDataByLanguage = Record<Language, CVData>;

// ─── Source format (history.json) ───────────────────────────────────────────
// Structural fields (dates, technologies) are shared; text fields are i18n.

export type I18nField = string | { en: string; cs: string };

export interface SourceProject {
  name: I18nField;
  description: { en: string; cs: string };
  technologies?: string[];
  from: string;
  to: string | null;
}

export interface SourceRole {
  title: I18nField;
  description: { en: string; cs: string };
  projects?: SourceProject[];
}

export interface SourceCompany {
  name: string;
  roles: SourceRole[];
  hideOnPageOne?: boolean;
}

export interface SourceEducation {
  degree: I18nField;
  institution: I18nField;
  from: string;
  to: string | null;
  description: { en: string; cs: string };
  projects?: SourceProject[];
  hideOnPageOne?: boolean;
}

export interface HistoryData {
  companies: SourceCompany[];
  educations: SourceEducation[];
}
