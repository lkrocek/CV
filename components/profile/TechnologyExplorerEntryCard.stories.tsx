import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechnologyExplorerEntryCard } from './TechnologyExplorerEntryCard';

const meta = {
  title: 'CV/Profile/TechnologyExplorerEntryCard',
  component: TechnologyExplorerEntryCard,
  args: {
    company: 'Inphinity',
    role: 'Senior Frontend Developer',
    period: '12/2025 - NOW',
    months: 4,
    summary: 'Worked on BI extensions, performance improvements, and maintainable UI flows for the Qlik platform.',
    projects: ['Qlik Extension Platform', 'Design System'],
    isDarkMode: true,
    language: 'en',
  },
} satisfies Meta<typeof TechnologyExplorerEntryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selected: Story = {
  args: {
    selected: true,
    projects: [],
  },
};
