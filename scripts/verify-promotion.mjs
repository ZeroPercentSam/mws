// One-shot post-promotion smoke test against a local `next start`.
import { chromium } from "playwright";

const BASE = "http://localhost:3100";
const routes = [
  "/",
  "/services",
  "/work",
  "/work/osint4all",
  "/about",
  "/terms",
  "/contact",
  "/blog",
  "/blog/website-speed-costing-you-revenue",
];
const errors = [];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`${page.url()} :: ${m.text()}`);
});
page.on("pageerror", (e) => errors.push(`${page.url()} :: PAGEERROR ${e.message}`));

const failures = [];

const resp = await page.goto(BASE + "/v2", { waitUntil: "domcontentloaded" });
console.log("/v2 lands on:", page.url(), "status:", resp.status());
if (new URL(page.url()).pathname !== "/") failures.push("/v2 did not redirect to /");

for (const r of routes) {
  await page.goto(BASE + r, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((res) => setTimeout(res, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  if (r === "/") await page.screenshot({ path: "/tmp/mws-home.png" });
  if (r === "/services") await page.screenshot({ path: "/tmp/mws-services.png" });
  console.log("OK", r, "::", await page.title());
}

await page.goto(BASE + "/terms", { waitUntil: "domcontentloaded" });
const gov = await page.locator("#governing-law").textContent();
console.log("Florida in §12:", gov.includes("Florida"));
if (!gov.includes("Florida")) failures.push("/terms §12 missing Florida");

await page.goto(BASE + "/work", { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(2200);
const ribbon = await page
  .locator("section", { hasText: "Projects Shipped" })
  .first()
  .textContent();
console.log("work ribbon sample:", ribbon.slice(0, 120));
console.log("comma in counters:", /\d,\d{3}/.test(ribbon));

// reduced-motion pass — guards the AnimatedCounter hydration-mismatch class
const rmContext = await browser.newContext({ reducedMotion: "reduce" });
const rmPage = await rmContext.newPage();
const rmErrors = [];
rmPage.on("console", (m) => {
  if (m.type() === "error") rmErrors.push(`${rmPage.url()} :: ${m.text()}`);
});
rmPage.on("pageerror", (e) => rmErrors.push(`${rmPage.url()} :: PAGEERROR ${e.message}`));
for (const r of ["/", "/work"]) {
  await rmPage.goto(BASE + r, { waitUntil: "networkidle" });
  await rmPage.waitForTimeout(800);
}
console.log(
  rmErrors.length
    ? `REDUCED-MOTION ERRORS (${rmErrors.length}):\n` + rmErrors.join("\n")
    : "reduced-motion console: clean",
);
if (rmErrors.length) failures.push("console errors under prefers-reduced-motion");

console.log(errors.length ? `CONSOLE ERRORS (${errors.length}):\n` + errors.join("\n") : "console errors: none");
if (failures.length) console.log("FAILED ASSERTIONS:\n" + failures.join("\n"));
await browser.close();
process.exit(errors.length || failures.length ? 1 : 0);
