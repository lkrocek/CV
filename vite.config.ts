import path from 'node:path';
import fs from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const englishValue = (value: unknown): string => typeof value === 'string'
  ? value
  : (value as { en?: string } | null)?.en ?? '';

const escapeHtml = (value: unknown): string => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const buildSeoContent = (): string => {
  const history = JSON.parse(fs.readFileSync(path.resolve('public/history.json'), 'utf8'));
  const skills = JSON.parse(fs.readFileSync(path.resolve('public/skills.json'), 'utf8'));
  const projects = history.companies.flatMap((company: { name: string; roles: Array<{ title: unknown; projects?: Array<{ name: unknown; from: string; to: string | null; description: { en: string }; technologies?: string[] }> }> }) =>
    company.roles.flatMap((role) => (role.projects ?? []).map((project) => ({ ...project, company: company.name, role: englishValue(role.title) }))));
  const skillNames = skills.flatMap((group: { children?: Array<{ name: string }> }) => group.children?.map((skill) => skill.name) ?? []);

  return `<section id="seo-content" class="seo-content" aria-label="CV content">
    <h1>Lukáš Kroček</h1>
    <p>Frontend Developer specializing in React, JavaScript, TypeScript, BrightScript and AI-assisted development.</p>
    <h2>Professional experience</h2>
    <ul>${projects.map((project: { company: string; role: string; name: unknown; from: string; to: string | null; description: { en: string }; technologies?: string[] }) =>
      `<li><strong>${escapeHtml(project.role)} at ${escapeHtml(project.company)}</strong> (${escapeHtml(project.from)}–${escapeHtml(project.to ?? 'present')}) - ${escapeHtml(englishValue(project.description))} Technologies: ${escapeHtml((project.technologies ?? []).join(', '))}.</li>`).join('')}</ul>
    <h2>Skills</h2>
    <p>${escapeHtml(skillNames.join(', '))}</p>
  </section>`;
};

const crawlableCvContent = () => ({
  name: 'crawlable-cv-content',
  transformIndexHtml: (html: string) => html.replace(
    '<section id="seo-content" class="seo-content" aria-label="CV content"></section>',
    buildSeoContent()
  ),
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [tailwindcss(), react(), crawlableCvContent()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
                return 'vendor';
              }
            },
          },
        },
      },
    };
});
