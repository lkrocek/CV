
import React, { useState } from 'react';
import { CVPreview } from './components/CVPreview';
import { useCvData } from './hooks/useCvData';
import type { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const { currentCvData, updateProjectField, updateSectionField } = useCvData(language);

  return (
    <div className="min-h-screen">
      <main className="min-h-screen w-full">
        <CVPreview 
          data={currentCvData}
          language={language}
          onLanguageChange={setLanguage}
          onChange={updateSectionField}
          onProjectChange={updateProjectField}
        />
      </main>
    </div>
  );
};

export default App;
