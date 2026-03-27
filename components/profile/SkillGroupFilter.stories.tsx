import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillGroupFilter } from './SkillGroupFilter';

const GROUPS = ['Languages', 'EcmaScript', 'SPA&PWA', 'Databases', 'CI&CD', 'Platforms', 'Tools'];

const meta = {
  title: 'CV/Profile/SkillGroupFilter',
  component: SkillGroupFilter,
  args: {
    groups: GROUPS,
    selectedGroups: new Set<string>(),
    isDarkMode: true,
    language: 'en',
    onGroupsChange: () => {},
  },
  render: (args, context) => {
    const [selectedGroups, setSelectedGroups] = useState(args.selectedGroups);
    return (
      <div className="flex items-start justify-end p-8">
        <SkillGroupFilter
          {...args}
          selectedGroups={selectedGroups}
          isDarkMode={context.globals.theme !== 'light'}
          language={context.globals.language}
          onGroupsChange={setSelectedGroups}
        />
      </div>
    );
  },
} satisfies Meta<typeof SkillGroupFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllSelected: Story = {
  args: {
    selectedGroups: new Set(),
  },
};

export const SingleGroupSelected: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript']),
  },
};

export const MultipleGroupsSelected: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript', 'SPA&PWA', 'CI&CD']),
  },
};

export const LightMode: Story = {
  args: {
    isDarkMode: false,
    selectedGroups: new Set(['Platforms']),
  },
};

export const Czech: Story = {
  args: {
    language: 'cs',
    selectedGroups: new Set(['EcmaScript', 'Languages']),
  },
};
