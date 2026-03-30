import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
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
    onSortToggle: fn(),
    onViewModeChange: fn(),
    onGroupsChange: fn(),
  },
  render: (args, context) => {
    const [selectedGroups, setSelectedGroups] = useState(args.selectedGroups);
    return (
      <TechnologyExplorerHeader
        {...args}
        isDarkMode={context.globals.theme !== 'light'}
        language={context.globals.language}
        selectedGroups={selectedGroups}
        onGroupsChange={(g) => { setSelectedGroups(g); args.onGroupsChange(g); }}
      />
    );
  },
} satisfies Meta<typeof TechnologyExplorerHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    // Click first view mode tab
    await userEvent.click(buttons[0]);
    expect(args.onViewModeChange).toHaveBeenCalled();
  },
};

export const TimelineView: Story = {
  args: {
    viewMode: 'timeline',
    sortDirection: 'asc',
  },
};

export const SortToggle: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    // Sort button is the last button (after view mode tabs)
    const sortBtn = buttons[buttons.length - 1];
    await userEvent.click(sortBtn);
    expect(args.onSortToggle).toHaveBeenCalledOnce();
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
