const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const rendered = path.join(root, '.next/server/app');
const pages = new Map();
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, e.name);
    if (e.isDirectory()) walk(file);
    else if (e.name.endsWith('.html')) {
      let route = '/' + path.relative(rendered, file).replaceAll('\\', '/').replace(/\.html$/, '');
      if (route === '/index') route = '/';
      pages.set(route, fs.readFileSync(file, 'utf8'));
    }
  }
}
walk(rendered);
const failures = new Set(); let checked = 0;
for (const [route, html] of pages) {
  for (const tag of html.match(/<a\b[^>]*>/gi) || []) {
    const value = tag.match(/\shref="([^"]+)"/i)?.[1]?.replaceAll('&amp;', '&');
    if (!value || /^(mailto|tel|javascript):/.test(value)) continue;
    const url = new URL(value, 'https://cadlab3d.com' + route);
    if (url.origin !== 'https://cadlab3d.com') continue;
    const pathname = decodeURIComponent(url.pathname).replace(/\/$/, '') || '/';
    const file = path.resolve(root, 'public', '.' + pathname);
    if (!file.startsWith(path.join(root, 'public') + path.sep) && pathname !== '/') throw new Error('Invalid public path');
    const target = pages.get(pathname);
    if (!target && !fs.existsSync(file)) failures.add(`${route} -> ${url.pathname}`);
    else if (target && url.hash && !target.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`) && !target.includes('NEXT_REDIRECT')) failures.add(`${route} -> ${url.pathname}${url.hash}`);
    checked++;
  }
}
if (failures.size) { console.error([...failures].join('\n')); process.exitCode = 1; }
else console.log(`Internal link audit passed: ${checked} links across ${pages.size} rendered routes.`);
