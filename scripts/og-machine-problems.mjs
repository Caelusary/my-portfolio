// Builds images/og-machine-problems.png (1200x630): screenshots the three
// simulators on machine-problems.html, then lays them out beside the title.
// Needs the site served on :5500 (`python -m http.server 5500`) and a Chromium
// binary: set CHROME, or it uses Playwright's cached chromium-headless-shell.
// Run with `npm run og:mp`.
import { spawn } from 'node:child_process';
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SITE = 'http://localhost:5500';
const OUT = 'images/og-machine-problems.png';
const PORT = 9333;

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const roots = [join(homedir(), 'AppData/Local/ms-playwright'), join(homedir(), '.cache/ms-playwright'), join(homedir(), 'Library/Caches/ms-playwright')];
  for (const root of roots) {
    if (!existsSync(root)) continue;
    for (const dir of readdirSync(root).filter((d) => d.startsWith('chromium_headless_shell')).sort().reverse()) {
      for (const sub of ['chrome-win64/chrome-headless-shell.exe', 'chrome-headless-shell-win64/chrome-headless-shell.exe', 'chrome-linux/headless_shell', 'chrome-headless-shell-linux64/chrome-headless-shell', 'chrome-mac/headless_shell']) {
        const p = join(root, dir, sub);
        if (existsSync(p)) return p;
      }
    }
  }
  throw new Error('No Chromium found; set CHROME to a Chrome or Chromium binary.');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function connect() {
  for (let i = 0; i < 50; i++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chromium did not open a debugging port.');
}

function client(url) {
  const ws = new WebSocket(url);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    }
  };
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, { resolve, reject: (e) => reject(new Error(`${method}: ${e.message}`)) });
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  return new Promise((r) => { ws.onopen = () => r({ send, close: () => ws.close() }); });
}

async function load(cdp, url, width, height) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: false });
  await cdp.send('Page.navigate', { url });
  for (let i = 0; i < 100; i++) {
    const { result } = await cdp.send('Runtime.evaluate', { expression: 'document.readyState === "complete" && document.fonts.status === "loaded"', returnByValue: true });
    if (result.value) break;
    await sleep(100);
  }
  await sleep(800);
}

const evaluate = async (cdp, expression) => (await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;

const chrome = spawn(findChrome(), [`--remote-debugging-port=${PORT}`, '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' });

try {
  const cdp = await client(await connect());
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  // Reduced motion skips the scroll-reveal fade, so every row renders in place.
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'dark' }] });

  await load(cdp, `${SITE}/machine-problems.html`, 1280, 900);
  // Hide fixed chrome (nav, feedback button) so it can't land inside a clip.
  await evaluate(cdp, `document.querySelectorAll('body *').forEach((el) => { if (['fixed', 'sticky'].includes(getComputedStyle(el).position)) el.style.visibility = 'hidden'; })`);
  const shots = {};
  for (const mp of ['fcfs', 'sched', 'bankers']) {
    const box = await evaluate(cdp, `(() => {
      const el = document.querySelector('[data-mp="${mp}"]');
      el.scrollIntoView({ block: 'start' });
      const r = el.getBoundingClientRect();
      return { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: Math.min(r.height, 460) };
    })()`);
    await sleep(300);
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...box, scale: 1 } });
    shots[mp] = `data:image/png;base64,${data}`;
  }

  const card = (src, style) => `<div class="card" style="${style}"><img src="${src}"></div>`;
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body { background: radial-gradient(circle at 18% 8%, #2a2560 0%, #0f0e24 38%, #0a0a1a 70%); font-family: 'Space Grotesk', sans-serif; color: #EDEDF7; position: relative; }
  .logo { position: absolute; left: 80px; top: 187px; width: 72px; height: 72px; border-radius: 16px; background: linear-gradient(135deg, #6C63FF, #00D2FF); display: grid; place-items: center; font: 700 30px 'Space Grotesk'; color: #fff; }
  h1 { position: absolute; left: 76px; top: 300px; margin: 0; font-size: 64px; line-height: 1; font-weight: 700; letter-spacing: -1.5px; white-space: nowrap; }
  .sub { position: absolute; left: 80px; top: 400px; font: 500 30px 'Space Grotesk'; color: #A79DFF; white-space: nowrap; }
  .url { position: absolute; left: 80px; top: 553px; font: 400 25px 'Inter'; color: #A79DFF; opacity: .85; }
  .card { position: absolute; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,.12); box-shadow: 0 24px 60px rgba(0,0,0,.55); background: #12121F; }
  .card img { display: block; width: 100%; }
</style></head><body>
  ${card(shots.fcfs, 'left: 700px; top: 40px; width: 560px; height: 270px;')}
  ${card(shots.sched, 'left: 760px; top: 200px; width: 520px; height: 260px;')}
  ${card(shots.bankers, 'left: 820px; top: 360px; width: 480px; height: 300px;')}
  <div class="logo">ZS</div>
  <h1>Machine Problems</h1>
  <div class="sub">OS coursework as live simulators</div>
  <div class="url">zacharyscott.vercel.app/machine-problems</div>
</body></html>`;

  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
  const layout = join(tmpdir(), 'og-machine-problems.html');
  writeFileSync(layout, html);
  await cdp.send('Page.navigate', { url: pathToFileURL(layout).href });
  await sleep(500);
  await evaluate(cdp, 'Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode())])');
  await sleep(500);
  const { data } = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  writeFileSync(OUT, Buffer.from(data, 'base64'));
  console.log(`Wrote ${OUT}`);
  cdp.close();
} finally {
  chrome.kill();
}
