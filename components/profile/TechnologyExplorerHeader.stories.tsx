import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechnologyExplorerHeader } from './TechnologyExplorerHeader';

const STORY_GROUPS = ['Languages', 'EcmaScript', 'SPA&PWA', 'CI&CD', 'Platforms', 'Tools'];

const meta = {
  title: 'CV/TechnologyExplorerHeader',
  component: TechnologyExplorerHeader,
  args: {
    isDarkMode: true,
    language: 'en',
    sortDirection: 'desc',
    viewMode: 'duration',
    skillGroups: STORY_GROUPS,
    selectedGroups: new Set<string>(),
    onSortToggle: () => {},
    onViewModeChange: () => {},
    onGroupsChange: () => {},
  },
  render: (args, context) => {
    const [selectedGroups, setSelectedGroups] = useState(args.selectedGroups);
    return (
      <TechnologyExplorerHeader
        {...args}
        isDarkMode={context.globals.theme !== 'light'}
        language={context.globals.language}
        selectedGroups={selectedGroups}
        onGroupsChange={setSelectedGroups}
      />
    );
  },
} satisfies Meta<typeof TechnologyExplorerHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TimelineView: Story = {
  args: {
    viewMode: 'timeline',
    sortDirection: 'asc',
  },
};

export const FilterActive: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript', 'SPA&PWA']),
  },
};

export const LightMode: Story = {
  args: {
    isDarkMode: false,
  },
};
