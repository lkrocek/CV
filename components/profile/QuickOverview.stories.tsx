import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { QuickOverview } from './QuickOverview';
import { getStoryLayoutProps } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/QuickOverview',
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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Career span/i)).toBeInTheDocument();
  },
};

export const ShortMetrics: Story = {
  args: {
    items: [
      { label: 'Career span', value: '15y' },
      { label: 'Companies', value: '6' },
      { label: 'Projects', value: '18' },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('15y')).toBeInTheDocument();
  },
};





