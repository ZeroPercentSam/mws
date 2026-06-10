import { chromium } from "playwright";

const BASE = process.env.SHOT_BASE || "http://localhost:3000";
const URL = `${BASE}/invoices/victor-ian`;
const OUT = "/tmp/victor-ian-shots";
import { mkdirSync } from "fs";
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shoot(name, viewport, scrollTo, fullPage = false) {
  const page = await browser.newPage({ viewport });
  await page.goto(URL, { waitUntil: "networkidle" });
  if (scrollTo) {
    await page.evaluate((sel) => {
      document.querySelector(sel)?.scrollIntoView({ block: "start" });
    }, scrollTo);
  }
  // let whileInView animations finish
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, quality: 85, type: "jpeg", fullPage });
  await page.close();
  console.log(`✓ ${name}`);
}

await shoot("01-hero-desktop", { width: 1440, height: 900 });
await shoot("02-letter", { width: 1440, height: 900 }, "h2");
await shoot("03-platform-flow", { width: 1440, height: 900 }, "#platform");
await shoot("04-investment", { width: 1440, height: 900 }, "#investment");
await shoot("05-mobile-hero", { width: 390, height: 844 });
await shoot("06-mobile-invest", { width: 390, height: 844 }, "#investment");

await browser.close();
