import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// One Star, Written in Sap — make.fun entry.
// The program writes a single one-line 1-star review, in the voice of a
// houseplant reviewing its human owner, to /output/entry.txt.
// The review must be 1-279 characters, one line, with a plant grievance
// at its centre and a surprising, specific turn — no stock phrases.

const REVIEW =
  "One star: my human repotted me into a mug with no drainage, " +
  "waters me with cold coffee, then tells guests I'm 'low-maintenance' " +
  "while I slowly drown.";

function main(): void {
  const line = REVIEW.trim();
  if (line.length < 1 || line.length > 279) {
    throw new Error(`review is ${line.length} chars, must be 1-279`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("review must be a single line");
  }

  // The grader runs the program in a sandbox where /output is the
  // artifact directory; locally it may be a relative ./output instead,
  // so honour OUTPUT_DIR when set and fall back to /output.
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, line, "utf8");
  console.log(`Wrote ${line.length} chars to ${outPath}`);
  console.log(line);
}

main();
