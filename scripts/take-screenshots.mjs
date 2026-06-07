#!/usr/bin/env node
/**
 * Batch-screenshot all case study sites for the MWS portfolio.
 * Takes homepage + one scroll-down view per site.
 * Usage: npx playwright test --config=... OR just: node scripts/take-screenshots.mjs
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
import { mkdirSync } from 'fs';
import { join } from 'path';

const OUT_DIR = join(import.meta.dirname, '..', 'public', 'work', 'screenshots');

const SITES = [
  { slug: 'alpha-gentlemen-suits', url: 'https://ags-website-sams-projects-4db6d193.vercel.app' },
  { slug: 'exotics-by-the-bay', url: 'https://exoticsbythebay.co' },
  { slug: 'purity-science', url: 'https://purityscience.com' },
  { slug: 'adare-wellness', url: 'https://adaresite-sams-projects-4db6d193.vercel.app' },
  { slug: 'jmi-capital', url: 'https://jmicapital.com' },
  { slug: 'luxury-boutique', url: 'https://luxuryboutique-sams-projects-4db6d193.vercel.app' },
  { slug: 'osint4all', url: 'https://osint4all-sams-projects-4db6d193.vercel.app' },
  { slug: 'lubecision', url: 'https://lubecision.com' },
  { slug: 'clariven-labs', url: 'https://clarivenlabs.com' },
  { slug: 'queen-creek-offering', url: 'https://queencreek-offering-sams-projects-4db6d193.vercel.app' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });

  for (const site of SITES) {
    const dir = join(OUT_DIR, site.slug);
    mkdirSync(dir, { recursive: true });

    console.log(`📸 ${site.slug} → ${site.url}`);
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    try {
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 30000 });
      // Wait a beat for animations
      await page.waitForTimeout(2000);

      // Screenshot 1: Hero / above the fold
      await page.screenshot({
        path: join(dir, 'hero.jpg'),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`  ✓ hero.jpg`);

      // Screenshot 2: Scroll down to see more content
      await page.evaluate(() => window.scrollTo(0, 900));
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: join(dir, 'content.jpg'),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`  ✓ content.jpg`);

      // Screenshot 3: Further down
      await page.evaluate(() => window.scrollTo(0, 1800));
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: join(dir, 'features.jpg'),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`  ✓ features.jpg`);

      // Screenshot 4: Full page thumbnail (smaller for card previews)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(500);
      await page.screenshot({
        path: join(dir, 'thumb.jpg'),
        type: 'jpeg',
        quality: 80,
        fullPage: false,
      });
      console.log(`  ✓ thumb.jpg`);

    } catch (err) {
      console.log(`  ⚠ ${site.slug}: ${err.message}`);
      // Take whatever we can
      try {
        await page.screenshot({
          path: join(dir, 'hero.jpg'),
          type: 'jpeg',
          quality: 85,
        });
        console.log(`  ✓ hero.jpg (fallback)`);
      } catch {}
    }

    await context.close();
  }

  await browser.close();
  console.log('\n✅ Done. Screenshots in public/work/screenshots/');
}

main().catch(console.error);
