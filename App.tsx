
import React, { useState } from 'react';
import { CVPreview } from './components/CVPreview';
import { useCvData } from './hooks/useCvData';
import type { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const { currentCvData, updateProjectField, updateSectionField } = useCvData(language);

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
          onChange={updateSectionField}
          onProjectChange={updateProjectField}
        />
      </main>
    </div>
  );
};

export default App;
