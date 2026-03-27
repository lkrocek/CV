import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechnologyExplorerHeader } from './TechnologyExplorerHeader';

const meta = {
  title: 'CV/Profile/TechnologyExplorerHeader',
  component: TechnologyExplorerHeader,
  args: {
    isDarkMode: true,
    language: 'en',
    sortDirection: 'desc',
    viewMode: 'duration',
    onSortToggle: () => {},
    onViewModeChange: () => {},
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
