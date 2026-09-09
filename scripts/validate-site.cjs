const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const rendered = path.join(root, '.next/server/app');
const sitemap = fs.readFileSync(path.join(rendered, 'sitemap.xml.body'), 'utf8');
const robots = fs.readFileSync(path.join(rendered, 'robots.txt.body'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]));
assert.ok(urls.length > 0, 'Sitemap must not be empty');
assert.equal(new Set(urls.map(u=>u.href)).size, urls.length, 'Duplicate sitemap URLs');
const preview = (process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV) === 'preview';
const origin = new URL(preview && (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL)
  ? 'https://' + (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL)
  : process.env.NEXT_PUBLIC_SITE_URL || 'https://cadlab3d.com').origin;
const titles = new Set(), descriptions = new Set();
let structured = 0, references = 0;
function attr(tag,name) { return tag.match(new RegExp('\\s'+name+'="([^"]*)"','i'))?.[1]; }
function decode(text) { return text.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"'); }
function localImage(value) {
  if (!value) return;
  const url = new URL(value, origin);
  if (url.origin !== origin) return;
  const file = path.resolve(root, 'public', '.' + decodeURIComponent(url.pathname));
  assert.ok(file.startsWith(path.join(root,'public') + path.sep), 'Invalid image path');
  assert.ok(fs.existsSync(file), 'Missing social/schema image: '+url.pathname);
}
for (const url of urls) {
  assert.equal(url.origin,origin,'Wrong sitemap domain');
  const route = url.pathname.replace(/\/$/,'') || '/';
  const html = fs.readFileSync(path.join(rendered,(route === '/' ? '/index' : route)+'.html'),'utf8');
  assert.ok(!html.includes('NEXT_REDIRECT'),route+' is a redirect in the sitemap');
  assert.match(html,/<html[^>]*\slang="es"/,route+' missing Spanish language');
  assert.equal((html.match(/<h1\b/g)||[]).length,1,route+' must have one h1');
  const title=decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || '');
  const metas=html.match(/<meta\b[^>]*>/gi)||[];
  const meta=(name)=>metas.filter(t=>attr(t,'name')===name||attr(t,'property')===name).map(t=>decode(attr(t,'content')||''));
  const description=meta('description');
  assert.ok(title.trim(),route+' missing title');
  assert.equal(description.length,1,route+' must have one description');
  assert.ok(description[0].trim(),route+' missing description');
  assert.ok(!titles.has(title),'Duplicate title: '+title); titles.add(title);
  assert.ok(!descriptions.has(description[0]),'Duplicate description: '+route); descriptions.add(description[0]);
  const canonicals=(html.match(/<link\b[^>]*>/gi)||[]).filter(t=>attr(t,'rel')==='canonical');
  assert.equal(canonicals.length,1,route+' must have one canonical');
  assert.equal(new URL(decode(attr(canonicals[0],'href'))).href.replace(/\/$/,''),url.href.replace(/\/$/,''),route+' canonical mismatch');
  const directives=[...meta('robots'),...meta('googlebot')].join(',');
  assert.equal(/\bnoindex\b/.test(directives),preview,route+' wrong indexability');
  for (const name of ['og:title','og:description','og:url','og:image','og:image:alt','twitter:card','twitter:image']) assert.ok(meta(name)[0],route+' missing '+name);
  for (const src of meta('og:image')) localImage(src);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>decode(m[1]));
  assert.equal(new Set(ids).size,ids.length,route+' duplicate element id');
  for (const m of html.matchAll(/\saria-(?:labelledby|describedby)="([^"]+)"/g)) {
    for (const id of decode(m[1]).split(/\s+/)) { assert.ok(ids.includes(id),route+' missing accessible reference '+id); references++; }
  }
  for (const script of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    const data=JSON.parse(script[1]); structured++;
    const objects=Array.isArray(data)?data:[data];
    for (const item of objects) {
      assert.ok(item['@context'],route+' missing JSON-LD context');
      if (item['@type']==='BlogPosting') {
        assert.ok(item.image?.length,route+' missing article image');
        for (const image of item.image) localImage(typeof image==='string'?image:image.contentUrl||image.url);
        assert.ok(Date.parse(item.dateModified)>=Date.parse(item.datePublished),route+' invalid article dates');
      }
    }
  }
  for (const form of html.match(/<form\b[^>]*>/gi)||[]) {
    if (html.includes('name="email"')) {
      assert.equal(attr(form,'method')?.toLowerCase(),'post',route+' could submit contact data in a GET URL');
      assert.match(attr(form,'action')||'',/^mailto:/,route+' unexpected contact submission');
    }
  }
}
assert.match(robots,/Allow: \/(?:\r?\n|$)/);
assert.equal(/Sitemap:/i.test(robots),!preview,'Preview must not advertise a sitemap');
const notFound=fs.readFileSync(path.join(rendered,'_not-found.html'),'utf8');
assert.match(notFound,/<meta[^>]*name="robots"[^>]*content="noindex"/,'404 must be noindex');
console.log(`Site checks passed: ${urls.length} sitemap URLs, unique metadata/canonicals, ${structured} JSON-LD blocks, ${references} accessible references, social images and contact fallback (${preview?'preview':'public'}).`);
