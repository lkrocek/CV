import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechnologyExplorer } from './TechnologyExplorer';
import { getStoryLayoutProps } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/Profile/TechnologyExplorer',
  component: TechnologyExplorer,
  args: {
    activeTechnology: props.insights[0]?.name ?? null,
    insights: props.insights,
    isDarkMode: true,
    language: 'en',
    onSelectTechnology: () => {},
  },
  render: (args, context) => {
    const [activeTechnology, setActiveTechnology] = useState(args.activeTechnology);
    return (
      <TechnologyExplorer
        {...args}
        activeTechnology={activeTechnology}
        isDarkMode={context.globals.theme !== 'light'}
        language={context.globals.language}
        onSelectTechnology={setActiveTechnology}
      />
    );
  },
} satisfies Meta<typeof TechnologyExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const Czech: Story = {
  args: {
    language: 'cs',
  },
};
