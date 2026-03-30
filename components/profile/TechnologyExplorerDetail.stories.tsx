import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { TechnologyExplorerDetail } from './TechnologyExplorerDetail';
import { storyInsights } from './storybookData';

const selectedInsight = storyInsights.find((item) => item.name === 'JavaScript') ?? storyInsights[0];
const selectedEntry = selectedInsight.entries[0] ?? null;

const meta = {
  title: 'CV/TechnologyExplorerDetail',
  component: TechnologyExplorerDetail,
  args: {
    selectedInsight,
    selectedEntry: null,
    isDarkMode: true,
    language: 'en',
    selectedEntryKey: null,
    onSelectEntry: fn(),
    onClearSelection: fn(),
  },
  render: (args) => <TechnologyExplorerDetail {...args} />,
} satisfies Meta<typeof TechnologyExplorerDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const entries = canvas.getAllByRole('button');
    expect(entries.length).toBeGreaterThan(1);
    await userEvent.click(entries[1]);
    expect(args.onSelectEntry).toHaveBeenCalledOnce();
  },
};

export const Selected: Story = {
  args: {
    selectedEntry: selectedEntry ? { ...selectedEntry, projectDetails: selectedEntry.projectDetails } : null,
    selectedEntryKey: selectedEntry?.company ?? null,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');
    await userEvent.click(buttons[0]);
    expect(args.onClearSelection).toHaveBeenCalledOnce();
  },
};





