import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileSidebar } from './ProfileSidebar';
import { getStoryLayoutProps, storyData } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/ProfileSidebar',
  component: ProfileSidebar,
  args: {
    data: storyData,
    expertise: props.expertise,
    isDarkMode: true,
    language: 'en',
  },
  render: (args, context) => (
    <ProfileSidebar
      {...args}
      isDarkMode={context.globals.theme !== 'light'}
      language={context.globals.language}
    />
  ),
} satisfies Meta<typeof ProfileSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CompactContent: Story = {
  args: {
    expertise: props.expertise.slice(0, 2),
  },
};
