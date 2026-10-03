// Copies the shared nav and footer from index.html into projects.html.
// index.html is the source of truth; run `npm run sync` after editing either block.
import { readFileSync, writeFileSync } from 'node:fs';

const SOURCE = 'index.html';
const TARGETS = ['projects.html'];
const BLOCKS = ['nav', 'footer'];

const blockPattern = (name) =>
  new RegExp(`( *<!-- shared:${name}:start[^>]*-->\\r?\\n)[\\s\\S]*?( *<!-- shared:${name}:end -->)`);

// Other pages have no home-page sections, so same-page anchors point back to
// index.html. The skip link targets #main-content, which every page has.
const toSubpage = (html) =>
  html
    .replace(/href="#(?!main-content")([\w-]+)"/g, 'href="index.html#$1"')
    // No dark hero behind the nav on subpages, so it starts solid.
    .replace('<nav id="mainNav" class="', '<nav id="mainNav" class="nav-solid ')
    .replace(
      '<a href="index.html#portfolio" class="nav-link"',
      '<a href="index.html#portfolio" class="nav-link active" aria-current="page"'
    );

const source = readFileSync(SOURCE, 'utf8');

for (const target of TARGETS) {
  let html = readFileSync(target, 'utf8');
  for (const name of BLOCKS) {
    const match = source.match(blockPattern(name));
    if (!match) throw new Error(`${SOURCE}: missing shared:${name} markers`);
    if (!blockPattern(name).test(html)) throw new Error(`${target}: missing shared:${name} markers`);
    html = html.replace(blockPattern(name), () => toSubpage(match[0]));
  }
  writeFileSync(target, html);
  console.log(`synced ${BLOCKS.join(' + ')} into ${target}`);
}
