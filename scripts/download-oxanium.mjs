import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const cssUrl = 'https://fonts.googleapis.com/css2?family=Oxanium:wght@700&display=swap&subset=latin-ext';
const outDir = path.resolve('public/fonts');
const outFile = path.join(outDir, 'oxanium-latin-ext-700.ttf');

const cssResponse = await fetch(cssUrl, {
  headers: {
    'user-agent': 'Mozilla/5.0',
  },
});

if (!cssResponse.ok) {
  throw new Error(`Failed to fetch Google Fonts CSS: ${cssResponse.status} ${cssResponse.statusText}`);
}

const cssText = await cssResponse.text();
const match = cssText.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.(?:woff2?|ttf))\)/);

if (!match) {
  throw new Error('Could not find Oxanium woff2 URL in Google Fonts CSS.');
}

const fontUrl = match[1];
const fontResponse = await fetch(fontUrl, {
  headers: {
    'user-agent': 'Mozilla/5.0',
  },
});

if (!fontResponse.ok) {
  throw new Error(`Failed to fetch Oxanium font: ${fontResponse.status} ${fontResponse.statusText}`);
}

const fontBuffer = Buffer.from(await fontResponse.arrayBuffer());
await mkdir(outDir, { recursive: true });
await writeFile(outFile, fontBuffer);

console.log(`Downloaded Oxanium latin-ext 700 to ${outFile}`);
