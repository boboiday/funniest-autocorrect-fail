import { mkdirSync, writeFileSync } from "node:fs";

// One funny autocorrect fail, readable as a single message: the intended
// word and the wrong word sit side by side, so the slip lands on first
// read. Scene: me, my boss, the office calendar. Mechanism: one typo —
// "meeting" became "mating" — escalated three times: the text went out,
// HR was notified, and the calendar invite itself was renamed.
const LINE =
  "I texted my boss 'see you at the mating' instead of 'meeting' — he replied 'HR has been notified' and my calendar invite now says 'Do Not Mate With The Manager.'";

// Guard: the bounty gate is one line, 1–199 UTF-8 characters, nothing else.
// Refuse to write an entry that would fail it instead of failing silently.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if ([...LINE].length > 199 || [...LINE].length < 1) {
  throw new Error("entry must be 1–199 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
