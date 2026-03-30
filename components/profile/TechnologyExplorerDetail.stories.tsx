import type { Meta, StoryObj } from '@storybook/react-vite';
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
    onSelectEntry: () => undefined,
    onClearSelection: () => undefined,
  },
  render: (args) => <TechnologyExplorerDetail {...args} />,
} satisfies Meta<typeof TechnologyExplorerDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Overview: Story = {};

export const Selected: Story = {
  args: {
    selectedEntry: selectedEntry ? { ...selectedEntry, projectDetails: selectedEntry.projectDetails } : null,
    onSelectEntry: () => undefined,
    onClearSelection: () => undefined,
  },
};
