
export interface Project {
  name: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  address: string;
  profilePhoto: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  projects?: Project[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  projects?: Project[];
}

export interface Skill {
  name: string;
  children?: Skill[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
}