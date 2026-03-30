import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { TechnologyExplorerEntryCard } from './TechnologyExplorerEntryCard';

const meta = {
  title: 'CV/TechnologyExplorerEntryCard',
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
    onClick: fn(),
  },
} satisfies Meta<typeof TechnologyExplorerEntryCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    projects: [],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button');
    card.focus();
    await userEvent.keyboard('{Enter}');
    expect(args.onClick).toHaveBeenCalledOnce();
  },
};





