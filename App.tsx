import React, { useState, useCallback, useEffect } from 'react';
import { CVPreview } from './components/CVPreview';
import type { CVData } from './types';
import { sampleData, sampleDataCs } from './constants';

type Language = 'en' | 'cs';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [allCvData, setAllCvData] = useState({
    en: sampleData,
    cs: sampleDataCs,
  });

  useEffect(() => {
    // Fetch English data
    fetch('/skills.json')
      .then(response => response.ok ? response.json() : [])
      .then(skillsData => {
        setAllCvData(prevData => ({
          ...prevData,
          en: { ...prevData.en, skills: skillsData },
        }));
      })
      .catch(error => console.error('Error fetching English skills:', error));

    fetch('/history.json')
      .then(response => response.ok ? response.json() : [])
      .then(historyData => {
        setAllCvData(prevData => ({
          ...prevData,
          en: { 
            ...prevData.en, 
            experiences: historyData.experiences || [],
            educations: historyData.educations || [],
          },
        }));
      })
      .catch(error => console.error('Error fetching English history:', error));
    
    // Fetch language-independent assets like the profile photo from a JSON file
    fetch('/photo.json')
      .then(response => response.ok ? response.json() : { photo: '' })
      .then(data => {
        const photo = data.photo;
        if (photo) {
          setAllCvData(prevData => ({
            en: { ...prevData.en, personalInfo: { ...prevData.en.personalInfo, profilePhoto: photo } },
            cs: { ...prevData.cs, personalInfo: { ...prevData.cs.personalInfo, profilePhoto: photo } },
          }));
        }
      })
      .catch(error => console.error('Error fetching profile photo JSON:', error));
  }, []);

  const handleCvDataChange = useCallback(<K extends keyof CVData>(
    section: K,
    index: number | null,
    field: string,
    value: string
  ) => {
    setAllCvData(prevData => {
      const langData = prevData[language];
      const newLangData = { ...langData };
      if (index !== null && Array.isArray(newLangData[section])) {
        const sectionArray = [...(newLangData[section] as any[])];
        sectionArray[index] = { ...sectionArray[index], [field]: value };
        return { ...prevData, [language]: { ...newLangData, [section]: sectionArray } };
      } else if (typeof newLangData[section] === 'object' && newLangData[section] !== null) {
         return {
          ...prevData,
          [language]: {
            ...newLangData,
            [section]: { ...(newLangData[section] as object), [field]: value }
          }
        };
      }
       else {
        return { ...prevData, [language]: { ...newLangData, [field]: value } };
      }
    });
  }, [language]);

  const handleSimpleChange = useCallback((field: keyof CVData, value: string) => {
    setAllCvData(prev => ({
        ...prev,
        [language]: {...prev[language], [field]: value}
    }));
  }, [language]);

  const handleProjectChange = useCallback((itemType: 'experiences' | 'educations', itemIndex: number, projIndex: number, field: string, value: string) => {
      setAllCvData(prev => {
          const langData = prev[language];
          const newItems = [...langData[itemType]];
          const item = { ...newItems[itemIndex] };
          const newProjects = [...(item.projects || [])];
          newProjects[projIndex] = { ...newProjects[projIndex], [field]: value };
          item.projects = newProjects;
          newItems[itemIndex] = item;
          return { ...prev, [language]: { ...langData, [itemType]: newItems }};
      });
  }, [language]);
  
  const currentCvData = allCvData[language];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md no-print w-full z-10 hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-2xl font-bold text-gray-800">WYSIWYG CV Builder</h1>
            </div>
        </div>
      </header>
      <main className="flex-grow w-full bg-gray-100 overflow-y-auto print-container">
        <CVPreview 
          data={currentCvData}
          language={language}
          onLanguageChange={setLanguage}
          onChange={handleCvDataChange}
          onSimpleChange={handleSimpleChange}
          onProjectChange={handleProjectChange}
        />
      </main>
    </div>
  );
};

export default App;