import type { Meta, StoryObj } from '@storybook/react-vite';
import { QuickOverview } from './QuickOverview';
import { getStoryLayoutProps } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/Profile/QuickOverview',
  component: QuickOverview,
  args: {
    isDarkMode: true,
    items: props.overviewItems,
  },
  render: (args, context) => (
    <QuickOverview
      {...args}
      isDarkMode={context.globals.theme !== 'light'}
    />
  ),
} satisfies Meta<typeof QuickOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ShortMetrics: Story = {
  args: {
    items: [
      { label: 'Career span', value: '15y' },
      { label: 'Companies', value: '6' },
      { label: 'Projects', value: '18' },
    ],
  },
};
