import { strict as assert } from "node:assert";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const keyData = require(join(__dirname, "hp48Keys.json"));

const CALC_NS = "calc-hp48gx";

function makeTestId(sectionId, rowId, keyId) {
  return `${CALC_NS}__sec-${sectionId}__row-${rowId}__key-${keyId}`;
}

const seen = new Set();
const duplicates = [];

for (const section of keyData.sections) {
  for (const row of section.rows) {
    for (const key of row.keys) {
      const testId = makeTestId(section.id, row.id, key.id);
      if (seen.has(testId)) {
        duplicates.push(testId);
      }
      seen.add(testId);
    }
  }
}

assert.strictEqual(
  duplicates.length,
  0,
  `Found duplicate data-testid values:\n${duplicates.join("\n")}`,
);

console.log(`PASS: All ${seen.size} data-testid values are unique.`);
