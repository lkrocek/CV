import { useCallback, useEffect, useState } from 'react';
import { sampleData, sampleDataCs } from '../constants';
import type {
  CVData, CvDataByLanguage, Education, Company, Language, Skill,
  HistoryData, I18nField, SourceCompany, SourceEducation,
} from '../types';
import historyData from '../public/history.json';
import photoData from '../public/photo.json';
import skillsData from '../public/skills.json';

const resolve = (field: I18nField, language: Language): string =>
  typeof field === 'string' ? field : field[language];

const extractCompanies = (companies: SourceCompany[], language: Language): Company[] =>
  companies.map((company) => ({
    name: company.name,
    hideOnPageOne: company.hideOnPageOne,
    roles: company.roles.map((role) => ({
      title: resolve(role.title, language),
      description: role.description[language],
      projects: role.projects?.map((project) => ({
        name: resolve(project.name, language),
        description: project.description[language],
        technologies: project.technologies,
        from: project.from,
        to: project.to,
      })),
    })),
  }));

const extractEducations = (educations: SourceEducation[], language: Language): Education[] =>
  educations.map((edu) => ({
    degree: resolve(edu.degree, language),
    institution: resolve(edu.institution, language),
    from: edu.from,
    to: edu.to,
    description: edu.description[language],
    hideOnPageOne: edu.hideOnPageOne,
    projects: edu.projects?.map((project) => ({
      name: resolve(project.name, language),
      description: project.description[language],
      technologies: project.technologies,
      from: project.from,
      to: project.to,
    })),
  }));

const initialCvData: CvDataByLanguage = {
  en: sampleData,
  cs: sampleDataCs,
};

export const useCvData = (language: Language) => {
  const [allCvData, setAllCvData] = useState<CvDataByLanguage>(initialCvData);

  useEffect(() => {
    const source = historyData as unknown as HistoryData;
    setAllCvData((prevData) => ({
      en: {
        ...prevData.en,
        skills: skillsData as Skill[],
        companies: extractCompanies(source.companies, 'en'),
        educations: extractEducations(source.educations, 'en'),
        personalInfo: {
          ...prevData.en.personalInfo,
          profilePhoto: photoData.photo || prevData.en.personalInfo.profilePhoto,
        },
      },
      cs: {
        ...prevData.cs,
        skills: skillsData as Skill[],
        companies: extractCompanies(source.companies, 'cs'),
        educations: extractEducations(source.educations, 'cs'),
        personalInfo: {
          ...prevData.cs.personalInfo,
          profilePhoto: photoData.photo || prevData.cs.personalInfo.profilePhoto,
        },
      },
    }));
  }, []);

  const updateSectionField = useCallback(<K extends keyof CVData>(
    section: K,
    index: number | null,
    field: string,
    value: string
  ) => {
    setAllCvData((prevData) => {
      const langData = prevData[language];

      if (index !== null && Array.isArray(langData[section])) {
        const sectionArray = [...langData[section]] as Array<Record<string, unknown>>;
        sectionArray[index] = { ...sectionArray[index], [field]: value };
        return { ...prevData, [language]: { ...langData, [section]: sectionArray } };
      }

      if (typeof langData[section] === 'object' && langData[section] !== null) {
        return {
          ...prevData,
          [language]: { ...langData, [section]: { ...(langData[section] as object), [field]: value } },
        };
      }

      return { ...prevData, [language]: { ...langData, [section]: value } };
    });
  }, [language]);

  const updateProjectField = useCallback((
    companyIndex: number,
    roleIndex: number,
    projectIndex: number,
    field: string,
    value: string
  ) => {
    setAllCvData((prevData) => {
      const langData = prevData[language];
      const companies = [...langData.companies];
      const company = { ...companies[companyIndex] };
      const roles = [...company.roles];
      const role = { ...roles[roleIndex] };
      const projects = [...(role.projects || [])];

      projects[projectIndex] = { ...projects[projectIndex], [field]: value };
      role.projects = projects;
      roles[roleIndex] = role;
      company.roles = roles;
      companies[companyIndex] = company;

      return { ...prevData, [language]: { ...langData, companies } };
    });
  }, [language]);

  return { currentCvData: allCvData[language], updateProjectField, updateSectionField };
};
