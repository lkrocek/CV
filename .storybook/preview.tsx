import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../index.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for CV components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
      },
    },
    language: {
      name: 'Language',
      description: 'Global language for CV components',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'cs', title: 'Czech' },
        ],
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story, context) => {
      const isDarkMode = context.globals.theme !== 'light';

      return (
        <div
          className={`min-h-screen w-full p-6 ${
            isDarkMode
              ? 'bg-[radial-gradient(circle_at_top_left,rgba(79,91,198,0.32),transparent_26%),linear-gradient(180deg,#050816_0%,#070c1b_36%,#050713_100%)] text-slate-100'
              : 'bg-[radial-gradient(circle_at_top_left,rgba(199,210,254,0.7),transparent_24%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_34%,#e2e8f0_100%)] text-slate-900'
          }`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
