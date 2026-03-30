import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'CV/PDF/CvPdfDocument',
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="min-h-screen bg-[#07111f] px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-white/4 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <div className="border-b border-white/10 px-8 py-6">
          <div className="text-[11px] uppercase tracking-[0.36em] text-slate-400">PDF Export</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white">PDF generator</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            This part of the CV is covered by regression tests instead of a visual canvas preview.
          </p>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <section className="border-r border-white/10 px-8 py-7">
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-slate-400">Why no preview</div>
            <div className="space-y-3 text-sm leading-6 text-slate-300">
              <p>
                `@react-pdf/renderer` is validated through unit tests because a fake Storybook layout
                would not match the real output.
              </p>
              <p>
                The regression suite covers filename generation, summary splitting, contact
                formatting, photo resolution, and PDF project truncation.
              </p>
            </div>
          </section>

          <section className="px-8 py-7">
            <div className="mb-4 text-[11px] uppercase tracking-[0.28em] text-slate-400">Test files</div>
            <ul className="space-y-3 text-sm leading-6 text-slate-200">
              <li>
                <span className="block font-medium text-white">components/pdf/pdfHelpers.test.ts</span>
                <span className="text-slate-400">Filename regression coverage.</span>
              </li>
              <li>
                <span className="block font-medium text-white">components/pdf/pdfRenderHelpers.ts</span>
                <span className="text-slate-400">Pure helpers shared by the PDF renderer.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  ),
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const RegressionNotes: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/covered by regression tests/i)).toBeInTheDocument();
    expect(canvas.getByText(/pdfHelpers\.test\.ts/i)).toBeInTheDocument();
  },
};
