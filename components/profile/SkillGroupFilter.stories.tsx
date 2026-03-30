import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SkillGroupFilter } from './SkillGroupFilter';

const GROUPS = ['Languages', 'EcmaScript', 'SPA&PWA', 'Databases', 'CI&CD', 'Platforms', 'Tools'];

const meta = {
  title: 'CV/SkillGroupFilter',
  component: SkillGroupFilter,
  args: {
    groups: GROUPS,
    selectedGroups: new Set<string>(),
    isDarkMode: true,
    language: 'en',
    onGroupsChange: () => {},
  },
  render: (args, context) => {
    const [selectedGroups, setSelectedGroups] = useState(args.selectedGroups);
    return (
      <div className="flex items-start justify-end p-8">
        <SkillGroupFilter
          {...args}
          selectedGroups={selectedGroups}
          isDarkMode={context.globals.theme !== 'light'}
          language={context.globals.language}
          onGroupsChange={setSelectedGroups}
        />
      </div>
    );
  },
} satisfies Meta<typeof SkillGroupFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllSelected: Story = {
  args: {
    selectedGroups: new Set(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: /all groups/i })).toBeInTheDocument();
  },
};

export const SingleGroupSelected: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button'));
    expect(within(document.body).getByRole('listbox')).toBeInTheDocument();
  },
};

export const OpenDropdown: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /ecmascript/i }));
    expect(within(document.body).getByRole('listbox')).toBeInTheDocument();
    expect(within(document.body).getByRole('button', { name: /clear selection/i })).toBeInTheDocument();
  },
};

export const ClearSelection: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript', 'SPA&PWA']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /2 groups/i }));
    const portal = within(document.body);
    await userEvent.click(portal.getByRole('button', { name: /clear selection/i }));
    expect(canvas.getByRole('button', { name: /all groups/i })).toBeInTheDocument();
  },
};

export const InvertSelection: Story = {
  args: {
    selectedGroups: new Set(['Languages']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /languages/i }));
    const portal = within(document.body);
    await userEvent.click(portal.getByRole('button', { name: /invert selection/i }));
    expect(canvas.getByRole('button', { name: /6 groups/i })).toBeInTheDocument();
  },
};

export const SoloSelectGroup: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript', 'SPA&PWA']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /2 groups/i }));
    const portal = within(document.body);
    await userEvent.click(portal.getAllByRole('button', { name: /select only this group/i })[0]);
    expect(canvas.getByRole('button', { name: /languages/i })).toBeInTheDocument();
  },
};

export const MultipleGroupsSelected: Story = {
  args: {
    selectedGroups: new Set(['EcmaScript', 'SPA&PWA', 'CI&CD']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: /3 groups/i })).toBeInTheDocument();
  },
};

export const LightMode: Story = {
  args: {
    isDarkMode: false,
    selectedGroups: new Set(['Platforms']),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: /platforms/i })).toBeInTheDocument();
  },
};





