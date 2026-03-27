import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Language } from '../types';
import { CVPreview } from './CVPreview';
import { getStoryLayoutProps, storyData } from './profile/storybookData';

const meta = {
  title: 'CV/CVPreview',
  component: CVPreview,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data: storyData,
    insights: getStoryLayoutProps('en').insights,
    isDarkMode: true,
    language: 'en',
    onDownloadPdf: () => {},
    onLanguageChange: () => {},
    onThemeToggle: () => {},
    onChange: () => {},
    onProjectChange: () => {},
  },
} satisfies Meta<typeof CVPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

const PreviewStory = ({ initialLanguage }: { initialLanguage: Language }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { insights } = getStoryLayoutProps(language);

  return (
    <CVPreview
      data={storyData}
      insights={insights}
      isDarkMode={isDarkMode}
      language={language}
      onDownloadPdf={() => {}}
      onLanguageChange={setLanguage}
      onThemeToggle={() => setIsDarkMode((prev) => !prev)}
      onChange={() => {}}
      onProjectChange={() => {}}
    />
  );
};

export const Playground: Story = {
  render: (_args, context) => <PreviewStory initialLanguage={context.globals.language} />,
};

export const CzechPlayground: Story = {
  render: () => <PreviewStory initialLanguage="cs" />,
};
