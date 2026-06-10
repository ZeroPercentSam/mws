// Compositing audit at iPhone viewport: what still holds layer-promoting
// styles after entrance animations settle? (iOS flicker = too many/huge layers)
import { chromium, webkit, devices } from "playwright";

const BASE = "http://localhost:3100";
const engine = process.env.ENGINE === "webkit" ? webkit : chromium;
const browser = await engine.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();

for (const route of ["/", "/work", "/work/osint4all", "/services", "/about", "/contact", "/blog"]) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });
  // scroll through the whole page to fire every whileInView, then settle
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
  });
  await page.waitForTimeout(2500); // let entrances finish
  const report = await page.evaluate(() => {
    const out = {
      transforms: [],
      willChange: [],
      backface: [],
      filters: [],
      blend: [],
      clipText: [],
      fixedSticky: [],
    };
    const tag = (el) =>
      `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}.${[...el.classList].slice(0, 3).join(".")}`;
    for (const el of document.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      if (cs.transform !== "none")
        out.transforms.push(`${tag(el)} -> ${cs.transform.slice(0, 60)}`);
      if (cs.willChange !== "auto") out.willChange.push(`${tag(el)} -> ${cs.willChange}`);
      if (cs.backfaceVisibility === "hidden") out.backface.push(tag(el));
      if (cs.filter !== "none" || cs.backdropFilter !== "none")
        out.filters.push(`${tag(el)} -> f:${cs.filter.slice(0, 40)} bf:${cs.backdropFilter}`);
      if (cs.mixBlendMode !== "normal") out.blend.push(`${tag(el)} -> ${cs.mixBlendMode}`);
      if (cs.webkitBackgroundClip === "text" || cs.backgroundClip === "text")
        out.clipText.push(tag(el));
      if (cs.position === "fixed" || cs.position === "sticky")
        out.fixedSticky.push(`${tag(el)} -> ${cs.position}`);
    }
    return out;
  });
  console.log(`\n===== ${route} =====`);
  for (const [k, v] of Object.entries(report)) {
    console.log(`${k}: ${v.length}`);
    v.slice(0, 12).forEach((x) => console.log("   ", x));
    if (v.length > 12) console.log(`    ... +${v.length - 12} more`);
  }
}
await browser.close();
