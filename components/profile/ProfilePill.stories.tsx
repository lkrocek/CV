import type { Meta, StoryObj } from '@storybook/react-vite';
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

export const Default: Story = {};

export const Accent: Story = {
  args: {
    tone: 'accent',
  },
};

export const LongLabel: Story = {
  args: {
    children: 'Performance optimization',
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
};
