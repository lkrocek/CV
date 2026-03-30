import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { TechnologyExplorer } from './TechnologyExplorer';
import { getStoryLayoutProps, storyData } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/TechnologyExplorer',
  component: TechnologyExplorer,
  args: {
    activeTechnology: props.insights[0]?.name ?? null,
    insights: props.insights,
    isDarkMode: true,
    isActive: true,
    language: 'en',
    skills: storyData.skills,
    onSelectTechnology: fn(),
  },
  render: (args, context) => {
    const [activeTechnology, setActiveTechnology] = useState(args.activeTechnology);
    return (
      <TechnologyExplorer
        {...args}
        activeTechnology={activeTechnology}
        isDarkMode={context.globals.theme !== 'light'}
        language={context.globals.language}
        onSelectTechnology={(tech) => { setActiveTechnology(tech); args.onSelectTechnology(tech); }}
      />
    );
  },
} satisfies Meta<typeof TechnologyExplorer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole('button');
    expect(rows.length).toBeGreaterThan(0);
    await userEvent.click(rows[0]);
    expect(args.onSelectTechnology).toHaveBeenCalled();
  },
};
