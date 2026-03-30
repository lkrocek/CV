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
    await userEvent.click(canvas.getByRole('button', { name: /timeline/i }));
    expect(args.onViewModeChange).toHaveBeenCalled();
  },
};

export const TimelineView: Story = {
  args: {
    viewMode: 'timeline',
    sortDirection: 'asc',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: /ascending|descending|newest first|oldest first/i })).toBeInTheDocument();
  },
};

export const SortToggle: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /ascending|descending|newest first|oldest first/i }));
    expect(args.onSortToggle).toHaveBeenCalledOnce();
  },
};

export const FilterActive: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript', 'SPA&PWA']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: /2 groups/i })).toBeInTheDocument();
  },
};

export const LightMode: Story = {
  args: {
    isDarkMode: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: /most used/i })).toBeInTheDocument();
  },
};





