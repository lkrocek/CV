import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { ProfileExperienceSection } from './ProfileExperienceSection';
import { getStoryLayoutProps } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/ProfileExperienceSection',
  component: ProfileExperienceSection,
  args: {
    companies: props.companies,
    isDarkMode: true,
    language: 'en',
    skillPills: props.insights.map((insight) => insight.name),
  },
  render: (args, context) => (
    <ProfileExperienceSection
      {...args}
      isDarkMode={context.globals.theme !== 'light'}
      language={context.globals.language}
    />
  ),
} satisfies Meta<typeof ProfileExperienceSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Inphinity/i)).toBeInTheDocument();
  },
};

export const TwoItemsOnly: Story = {
  args: {
    companies: props.companies.slice(0, 2),
    skillPills: ['React', 'TypeScript', 'Storybook', 'WebRTC'],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Inphinity/i)).toBeInTheDocument();
  },
};





