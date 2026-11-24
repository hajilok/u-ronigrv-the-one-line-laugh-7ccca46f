import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Round 2 tournament champion one-liner (88 UTF-8 bytes, single sentence, no trailing newline).
const ONE_LINER: string =
  'I take every secret to the grave, and somehow my wife hates six strangers by first name.';

function validateLine(line: string): string {
  const trimmed = line.trim();
  const charCount = [...trimmed].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`Entry length ${charCount} outside [1, 200]`);
  }
  if (/[\r\n]/.test(trimmed)) {
    throw new Error('Entry must be a single line with no line breaks');
  }
  return trimmed;
}

function main(): void {
  const outputDir = process.argv[2] ?? '/output';
  const entry = validateLine(ONE_LINER);
  mkdirSync(outputDir, { recursive: true, mode: 0o755 });
  writeFileSync(join(outputDir, 'entry.txt'), entry, { encoding: 'utf8', mode: 0o644 });
}

main();
