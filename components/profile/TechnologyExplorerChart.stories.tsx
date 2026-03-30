import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { TechnologyExplorerChart } from './TechnologyExplorerChart';
import { getStoryLayoutProps, storyData } from './storybookData';

const props = getStoryLayoutProps('en');
const selectedTechnology = props.insights[0]?.name ?? null;
const selectedInsight = props.insights.find((item) => item.name === selectedTechnology) ?? props.insights[0];

const careerStart = Math.min(
  ...props.insights.flatMap((insight) => insight.entries.map((entry) => entry.fromMonthIdx)),
);
const careerEnd = Math.max(
  ...props.insights.flatMap((insight) => insight.entries.map((entry) => entry.toMonthIdx)),
);
const careerTotal = careerEnd - careerStart;

const companyColors = new Map(
  [...new Set(props.insights.flatMap((insight) => insight.entries.map((entry) => entry.company)))]
    .map((company, index) => [company, ['#818cf8', '#34d399', '#f472b6', '#fb923c'][index % 4]]),
);

const yearTicks = (() => {
  const startYear = Math.ceil(careerStart / 12);
  const endYear = Math.floor(careerEnd / 12);
  const ticks: { year: number; pct: number }[] = [];
  for (let year = startYear; year <= endYear; year += 1) {
    const pct = ((year * 12 - careerStart) / careerTotal) * 100;
    if (pct >= 0 && pct <= 100) ticks.push({ year, pct });
  }
  return ticks;
})();

const timelineData = {
  timelineSorted: [...props.insights].sort((left, right) => right.totalMonths - left.totalMonths),
  careerStart,
  careerTotal,
  companyColors,
  companiesByFirst: [...new Set(
    [...props.insights]
      .flatMap((insight) => insight.entries)
      .sort((left, right) => left.fromMonthIdx - right.fromMonthIdx)
      .map((entry) => entry.company),
  )],
  yearTicks,
};

const companiesData = {
  rows: [...new Map(
    props.insights.flatMap((insight) => insight.entries).map((entry) => [entry.company, entry]),
  ).values()].map((entry) => ({
    company: entry.company,
    fromMonthIdx: entry.fromMonthIdx,
    toMonthIdx: entry.toMonthIdx,
  })),
  careerStart,
  careerTotal,
  companyColors,
  yearTicks,
};

const meta = {
  title: 'CV/TechnologyExplorerChart',
  component: TechnologyExplorerChart,
  args: {
    companiesData,
    isDarkMode: true,
    language: 'en',
    maxMonths: props.insights[0]?.totalMonths ?? 1,
    onSelectCompany: fn(),
    onSelectTechnology: fn(),
    selectedCompany: null,
    selectedTechnology,
    sortedInsights: [...props.insights].sort((left, right) => right.totalMonths - left.totalMonths),
    timelineData,
    viewMode: 'duration',
  },
  render: (args, context) => {
    const [selectedCompany, setSelectedCompany] = useState(args.selectedCompany);
    const [selectedTechnologyState, setSelectedTechnologyState] = useState(args.selectedTechnology);

    return (
      <TechnologyExplorerChart
        {...args}
        isDarkMode={context.globals.theme !== 'light'}
        language={context.globals.language}
        selectedCompany={selectedCompany}
        selectedTechnology={selectedTechnologyState}
        onSelectCompany={(company) => {
          setSelectedCompany(company);
          args.onSelectCompany(company);
        }}
        onSelectTechnology={(technology) => {
          setSelectedTechnologyState(technology);
          args.onSelectTechnology(technology);
        }}
      />
    );
  },
} satisfies Meta<typeof TechnologyExplorerChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DurationView: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole('button');
    expect(rows.length).toBeGreaterThan(0);
    await userEvent.click(rows[0]);
    expect(args.onSelectTechnology).toHaveBeenCalled();
  },
};

export const TimelineView: Story = {
  args: {
    viewMode: 'timeline',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole('button');
    expect(rows.length).toBeGreaterThan(0);
    await userEvent.click(rows[0]);
    expect(args.onSelectTechnology).toHaveBeenCalled();
  },
};

export const CompaniesView: Story = {
  args: {
    viewMode: 'companies',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const rows = canvas.getAllByRole('button');
    expect(rows.length).toBeGreaterThan(0);
    await userEvent.click(rows[0]);
    expect(args.onSelectCompany).toHaveBeenCalled();
  },
};
