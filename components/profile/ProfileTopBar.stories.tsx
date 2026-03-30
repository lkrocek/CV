import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const downloadBtn = canvas.getByRole('button', { name: /download/i });
    await userEvent.click(downloadBtn);
    expect(args.onDownload).toHaveBeenCalledOnce();
  },
};

export const ExperienceView: Story = {
  args: {
    activeView: 'experience',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const langBtn = canvas.getByRole('button', { name: /toggle language/i });
    await userEvent.click(langBtn);
    expect(args.onLanguageToggle).toHaveBeenCalledOnce();
  },
};

export const Downloading: Story = {
  args: {
    isDownloading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const downloadBtn = canvas.getByRole('button', { name: /download/i });
    expect(downloadBtn).toBeDisabled();
  },
};





