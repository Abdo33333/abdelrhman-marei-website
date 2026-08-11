#!/usr/bin/env node
/**
 * Performance budget gate. Fails if the client payload grows past budget.
 * Run after `bun run build`:  bun run perf:budget
 */
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const ASSET_DIR = "dist/client/assets";
const BUDGETS = {
  totalJsGzipKb: 260,
  largestChunkGzipKb: 140,
  totalCssGzipKb: 40,
};

const kb = (n) => Math.round((n / 1024) * 10) / 10;
let files;
try {
  files = readdirSync(ASSET_DIR);
} catch {
  console.error(`perf-budget: ${ASSET_DIR} not found — run \`bun run build\` first.`);
  process.exit(1);
}

let totalJs = 0;
let totalCss = 0;
let largest = { name: "", size: 0 };
for (const f of files) {
  const p = join(ASSET_DIR, f);
  if (!statSync(p).isFile()) continue;
  const gz = gzipSync(readFileSync(p)).length;
  if (f.endsWith(".js")) {
    totalJs += gz;
    if (gz > largest.size) largest = { name: f, size: gz };
  } else if (f.endsWith(".css")) {
    totalCss += gz;
  }
}

const results = [
  ["total client JS (gzip)", kb(totalJs), BUDGETS.totalJsGzipKb],
  ["largest JS chunk (gzip)", kb(largest.size), BUDGETS.largestChunkGzipKb],
  ["total CSS (gzip)", kb(totalCss), BUDGETS.totalCssGzipKb],
];

let failed = false;
for (const [label, actual, budget] of results) {
  const ok = actual <= budget;
  if (!ok) failed = true;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}: ${actual} kB / ${budget} kB budget`);
}
console.log(`      largest chunk: ${largest.name}`);
process.exit(failed ? 1 : 0);
