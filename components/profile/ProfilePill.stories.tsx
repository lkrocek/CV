import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ProfilePill } from './ProfilePill';

const meta = {
  title: 'CV/ProfilePill',
  component: ProfilePill,
  args: {
    children: 'React',
    tone: 'default',
  },
  render: (args, context) => (
    <ProfilePill
      {...args}
      isDarkMode={context.globals.theme !== 'light'}
    />
  ),
} satisfies Meta<typeof ProfilePill>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('React')).toBeInTheDocument();
  },
};

export const Accent: Story = {
  args: {
    tone: 'accent',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('React')).toBeInTheDocument();
  },
};

export const LongLabel: Story = {
  args: {
    children: 'Performance optimization',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/performance optimization/i)).toBeInTheDocument();
  },
};

export const TechnologyWithDuration: Story = {
  args: {
    children: (
      <span className="flex items-center gap-3">
        <span>TypeScript</span>
        <span className="text-xs uppercase tracking-[0.22em] opacity-70">10y 9m</span>
      </span>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/typescript/i)).toBeInTheDocument();
  },
};





