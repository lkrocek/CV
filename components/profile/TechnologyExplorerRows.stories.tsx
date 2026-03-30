import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, expect, userEvent, within } from 'storybook/test';
import { BarRow, CompanyRow, TimelineRow } from './TechnologyExplorerRows';
import { storyInsights } from './storybookData';

const insight = storyInsights.find((item) => item.name === 'JavaScript') ?? storyInsights[0];
const timelineInsight = storyInsights.find((item) => item.name === 'React') ?? storyInsights[0];
const companyEntry = timelineInsight.entries[0];

const meta = {
  title: 'CV/TechnologyExplorerRows',
  component: BarRow,
  args: {
    insight,
    maxMonths: storyInsights[0]?.totalMonths ?? 1,
    isSelected: true,
    isDarkMode: true,
    language: 'en',
    onSelect: fn(),
  },
  render: (args) => <BarRow {...args} />,
} satisfies Meta<typeof BarRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DurationBar: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByRole('button');
    await userEvent.click(row);
    expect(args.onSelect).toHaveBeenCalledOnce();
  },
};

const timelineOnSelect = fn();

export const TimelineBar: Story = {
  render: () => (
    <TimelineRow
      insight={timelineInsight}
      careerStart={2011 * 12}
      careerTotal={180}
      companyColors={new Map([['Inphinity', '#818cf8'], ['Independent', '#34d399']])}
      yearPcts={[0, 25, 50, 75, 100]}
      isSelected={false}
      isDarkMode={true}
      language="en"
      onSelect={timelineOnSelect}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByRole('button');
    await userEvent.click(row);
    expect(timelineOnSelect).toHaveBeenCalledOnce();
  },
};

const companyOnSelect = fn();

export const CompanyBar: Story = {
  render: () => (
    <CompanyRow
      company={companyEntry?.company ?? 'Inphinity'}
      fromMonthIdx={companyEntry?.fromMonthIdx ?? 0}
      toMonthIdx={companyEntry?.toMonthIdx ?? 12}
      careerStart={2011 * 12}
      careerTotal={180}
      color="#818cf8"
      yearPcts={[0, 25, 50, 75, 100]}
      isDarkMode={true}
      onSelect={companyOnSelect}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByRole('button');
    await userEvent.click(row);
    expect(companyOnSelect).toHaveBeenCalledOnce();
  },
};
