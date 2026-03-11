import { useCallback, useEffect, useState } from 'react';
import { sampleData, sampleDataCs } from '../constants';
import type { CVData, CvDataByLanguage, Education, Experience, Language, Skill } from '../types';

type HistoryResponse = {
  experiences?: Experience[];
  educations?: Education[];
};

const initialCvData: CvDataByLanguage = {
  en: sampleData,
  cs: sampleDataCs,
};

export const useCvData = (language: Language) => {
  const [allCvData, setAllCvData] = useState<CvDataByLanguage>(initialCvData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [skillsResponse, historyResponse, photoResponse] = await Promise.all([
          fetch('/skills.json'),
          fetch('/history.json'),
          fetch('/photo.json'),
        ]);

        const skillsData: Skill[] = skillsResponse.ok ? await skillsResponse.json() : [];
        const historyData: HistoryResponse = historyResponse.ok ? await historyResponse.json() : {};
        const photoData: { photo?: string } = photoResponse.ok ? await photoResponse.json() : {};

        setAllCvData((prevData) => ({
          en: {
            ...prevData.en,
            skills: skillsData,
            experiences: historyData.experiences ?? [],
            educations: historyData.educations ?? [],
            personalInfo: {
              ...prevData.en.personalInfo,
              profilePhoto: photoData.photo || prevData.en.personalInfo.profilePhoto,
            },
          },
          cs: {
            ...prevData.cs,
            personalInfo: {
              ...prevData.cs.personalInfo,
              profilePhoto: photoData.photo || prevData.cs.personalInfo.profilePhoto,
            },
          },
        }));
      } catch (error) {
        console.error('Error loading CV data:', error);
      }
    };

    void loadData();
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

        return {
          ...prevData,
          [language]: { ...langData, [section]: sectionArray },
        };
      }

      if (typeof langData[section] === 'object' && langData[section] !== null) {
        return {
          ...prevData,
          [language]: {
            ...langData,
            [section]: { ...(langData[section] as object), [field]: value },
          },
        };
      }

      return {
        ...prevData,
        [language]: { ...langData, [section]: value },
      };
    });
  }, [language]);

  const updateProjectField = useCallback((
    itemType: 'experiences' | 'educations',
    itemIndex: number,
    projectIndex: number,
    field: string,
    value: string
  ) => {
    setAllCvData((prevData) => {
      const langData = prevData[language];
      const items = [...langData[itemType]];
      const item = { ...items[itemIndex] };
      const projects = [...(item.projects || [])];

      projects[projectIndex] = { ...projects[projectIndex], [field]: value };
      item.projects = projects;
      items[itemIndex] = item;

      return {
        ...prevData,
        [language]: { ...langData, [itemType]: items },
      };
    });
  }, [language]);

  return {
    currentCvData: allCvData[language],
    updateProjectField,
    updateSectionField,
  };
};
