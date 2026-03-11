import type { Meta, StoryObj } from '@storybook/react-vite';
import { AboutMeSection, OnlinePresenceSection, SectionHeader, ShieldsLabel } from './common';

const meta = {
  title: 'CV/Common',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeaderLabel: Story = {
  render: () => <SectionHeader className="text-cyan-800">Experiences & Knowledge</SectionHeader>,
};

export const Shield: Story = {
  render: () => <ShieldsLabel label="English" value="Fluent" valueColor="bg-blue-500" />,
};

export const AboutMe: Story = {
  render: () => (
    <div className="max-w-2xl bg-white p-8">
      <AboutMeSection
        language="en"
        content={[
          'Builds frontend systems pragmatically.',
          'Enjoys refactoring experimental code into maintainable structure.',
        ]}
      />
    </div>
  ),
};

export const OnlinePresence: Story = {
  render: () => (
    <div className="max-w-2xl bg-white p-8">
      <OnlinePresenceSection
        language="en"
        links={[
          {
            url: 'https://www.krocek.cz/',
            label: 'Online CV',
            description: 'Interactive CV application.',
          },
          {
            url: 'https://agecraft.netlify.app/',
            label: 'Project: AgeCraft',
            description: 'Experimental side project.',
          },
        ]}
      />
    </div>
  ),
};
