import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ProfileTopBar } from './ProfileTopBar';

const meta = {
  title: 'CV/ProfileTopBar',
  component: ProfileTopBar,
  args: {
    activeView: 'about',
    isDarkMode: true,
    language: 'en',
    onDownload: fn(),
    onLanguageToggle: fn(),
    onThemeToggle: fn(),
    onViewChange: fn(),
  },
  render: (args, context) => (
    <ProfileTopBar
      {...args}
      isDarkMode={context.globals.theme !== 'light'}
      language={context.globals.language}
    />
  ),
} satisfies Meta<typeof ProfileTopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const CzechNavigation: Story = {
  args: {
    language: 'cs',
  },
};
