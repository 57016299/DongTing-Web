const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(rootDir, "styles.css"), "utf8");
const script = fs.readFileSync(path.join(rootDir, "script.js"), "utf8");

const assertIncludes = (source, expected, message) => {
  assert.ok(source.includes(expected), message || `Expected to find: ${expected}`);
};

const platformHeadings = Array.from(html.matchAll(/<h3>(.*?)<\/h3>/g), match => match[1]);
const mobileGallery = html.match(/<div class="phone-gallery">([\s\S]*?)<\/div>/);

assertIncludes(html, "TV 端", "TV platform copy should be present.");
assertIncludes(html, "鸿蒙端（开发中）", "HarmonyOS development status should be present.");
assertIncludes(html, "8 类终端", "Platform count should reflect the added TV and HarmonyOS endpoints.");
assertIncludes(html, "TV 端介绍", "Downloads should expose a TV endpoint entry.");
assertIncludes(html, "鸿蒙端开发中", "Downloads should expose a HarmonyOS in-development entry.");
assert.ok(platformHeadings.includes("TV 端"), "Platform grid should include a TV card.");
assert.ok(platformHeadings.includes("鸿蒙端（开发中）"), "Platform grid should include a HarmonyOS card.");
assert.ok(mobileGallery, "Mobile screenshot gallery should exist.");
assertIncludes(
  mobileGallery[0],
  "mobile-player-catchcatch.jpg",
  "Mobile gallery should include the new CatchCatch player screenshot."
);
assert.ok(
  !mobileGallery[0].includes("desktop-"),
  "Mobile gallery should not include desktop/PC screenshots."
);
assertIncludes(
  script,
  "threshold: 0.04",
  "Reveal observer threshold should work for tall mobile screenshot sections."
);

const shotRule = css.match(/\.phone-shot,\s*\.desktop-shot\s*\{[\s\S]*?\}/);
assert.ok(shotRule, "Screenshot figure rule should exist.");
assertIncludes(shotRule[0], "margin: 0;", "Screenshot figures should reset default margins.");

const desktopBlockRule = css.match(/\.desktop-block\s*\{[\s\S]*?\}/);
assert.ok(desktopBlockRule, "Desktop showcase rule should exist.");
assertIncludes(
  desktopBlockRule[0],
  "grid-template-columns: 1fr;",
  "Desktop screenshots should get full-width showcase space."
);
