import type { Meta, StoryObj } from '@storybook/react-vite';
import { TechnologyExplorerCompanyPanel } from './TechnologyExplorerCompanyPanel';

const meta = {
  title: 'CV/TechnologyExplorerCompanyPanel',
  component: TechnologyExplorerCompanyPanel,
  args: {
    isDarkMode: true,
    language: 'en',
    companyDetail: {
      company: 'Inphinity',
      totalMonths: 18,
      roleCount: 2,
      technologyCount: 6,
      roles: [
        {
          company: 'Inphinity',
          role: 'Senior Frontend Developer',
          period: '2024 - NOW',
          months: 18,
          summary: 'Built and maintained BI platform extensions with a strong focus on architecture and UI consistency.',
          projects: ['Qlik Extension Platform'],
          projectDetails: [],
          technologies: ['React', 'TypeScript', 'Storybook', 'Jest'],
          fromMonthIdx: 24288,
          toMonthIdx: 24306,
        },
      ],
    },
  },
} satisfies Meta<typeof TechnologyExplorerCompanyPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
