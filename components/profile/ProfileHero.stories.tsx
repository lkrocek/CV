import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileHero } from './ProfileHero';
import { getStoryLayoutProps, storyData } from './storybookData';

const props = getStoryLayoutProps('en');

const meta = {
  title: 'CV/ProfileHero',
  component: ProfileHero,
  args: {
    data: storyData,
    highlights: props.highlights,
    isDarkMode: true,
    pills: props.heroPills,
  },
  render: (args, context) => (
    <ProfileHero
      {...args}
      isDarkMode={context.globals.theme !== 'light'}
    />
  ),
} satisfies Meta<typeof ProfileHero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
};

export const DenseHighlights: Story = {
  args: {
    highlights: [
      '15+ years across frontend systems',
      'React architecture for large products',
      'Performance optimization and UI platforms',
      'Able to turn experimental code into maintainable delivery',
    ],
    pills: ['React', 'TypeScript', 'Storybook', 'WebRTC', 'Performance'],
  },
};
