// Checks every count the front page's Cayley permutation section can show:
//  - against independent brute-force counts, and
//  - against the real Python Av class (tests/av_expected.json, written by
//    tests/av_reference.py from the CayleyPerms repository).
// Runs in a browser via tests/cayley.test.html, or with Node:
//   node tests/cayley.test.js
"use strict";
function runCayleyTests(cp, expected, log) {
  let failures = 0, passes = 0;
  function check(name, got, want) {
    const ok = JSON.stringify(got) === JSON.stringify(want);
    if (ok) passes++; else failures++;
    log((ok ? "ok   " : "FAIL ") + name + (ok ? "" : `: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`));
  }

  // --- Independent brute force: every word over 1..k, every subset by bitmask ---
  function allWords(n, k) {
    if (n === 0) return [[]];
    const out = [], w = new Array(n).fill(1);
    while (true) {
      out.push(w.slice());
      let i = n - 1;
      while (i >= 0 && w[i] === k) { w[i] = 1; i--; }
      if (i < 0) return out;
      w[i]++;
    }
  }
  const bruteIsCayley = w => { const s = new Set(w), m = Math.max(0, ...w); for (let v = 1; v <= m; v++) if (!s.has(v)) return false; return w.every(v => v >= 1); };
  const bruteStd = w => { const vals = [...new Set(w)].sort((a, b) => a - b); return w.map(x => vals.indexOf(x) + 1); };
  function bruteOccurrences(w, p) {
    let count = 0;
    for (let mask = 0; mask < (1 << w.length); mask++) {
      const sub = w.filter((_, i) => mask & (1 << i));
      if (sub.length === p.length && bruteStd(sub).join() === p.join()) count++;
    }
    return count;
  }
  const bruteCayley = n => allWords(n, n).filter(bruteIsCayley);
  const bruteAv = (n, basis) => bruteCayley(n).filter(w => basis.every(p => bruteOccurrences(w, p) === 0)).length;
  const fact = n => (n <= 1 ? 1 : n * fact(n - 1));
  const parseBasis = s => s.split(",").map(x => x.trim()).filter(Boolean).map(x => x.split("").map(Number));
  const str = w => w.join("");

  // 1. Fubini numbers from the Av port and from brute force.
  const fubini = [1, 1, 3, 13, 75, 541, 4683];
  check("Fubini numbers: Av([]).counter(6)", new cp.Av([]).counter(6), fubini);
  check("Fubini numbers: brute force", [0, 1, 2, 3, 4, 5, 6].map(n => bruteCayley(n).length), fubini);
  check("Av([]) at length 5 is every Cayley permutation", new cp.Av([]).generateCperms(5).map(str).sort(), bruteCayley(5).map(str).sort());

  // 2. Worked examples.
  check("31421 contains 211 once, at positions 1, 2, 5", cp.occurrences([3, 1, 4, 2, 1], [2, 1, 1]).map(i => i.map(x => x + 1)), [[1, 2, 5]]);
  check("standardise 4674 = 1231", cp.standardise([4, 6, 7, 4]), [1, 2, 3, 1]);
  check("isCayley 21321 yes, 1331 no", [cp.isCayley([2, 1, 3, 2, 1]), cp.isCayley([1, 3, 3, 1])], [true, false]);

  // 3. The step-by-step search and contains() against bitmask brute force,
  //    on every word of length <= 6 over 1..4 and every pattern of length <= 3.
  let mismatches = 0, cases = 0;
  const patterns = [1, 2, 3].flatMap(k => bruteCayley(k));
  for (let n = 1; n <= 6; n++) for (const w of allWords(n, 4)) for (const p of patterns) {
    cases++;
    const a = cp.occurrences(w, p).length, b = bruteOccurrences(w, p);
    if (a !== b || cp.contains(w, p) !== (b > 0)) mismatches++;
  }
  check(`search and contains agree with brute force (${cases} cases)`, mismatches, 0);

  // 4. Avoider counts from the Av port against brute force and known formulas.
  const ns = [1, 2, 3, 4, 5, 6];
  check("Av(11) gives the permutations, n!", new cp.Av([[1, 1]]).counter(6).slice(1), ns.map(fact));
  check("Av(12) gives 2^(n-1)", new cp.Av([[1, 2]]).counter(6).slice(1), ns.map(n => 2 ** (n - 1)));
  check("Av(123, 231) matches the CayleyPerms README", new cp.Av(parseBasis("123, 231")).counter(6).slice(1), [1, 3, 11, 41, 145, 483]);
  for (const b of ["121", "211", "111", "123", "2213", "12, 21"]) {
    const basis = parseBasis(b);
    check(`Av(${b}) = brute force, lengths 1 to 5`, new cp.Av(basis).counter(5).slice(1), [1, 2, 3, 4, 5].map(n => bruteAv(n, basis)));
  }

  // 5. The port against the real Python Av class and occurrences_in.
  if (expected) {
    for (const e of expected.av) {
      const av = new cp.Av(parseBasis(e.basis));
      check(`Av(${e.basis || "∅"}).counter(6) = Python Av`, av.counter(6), e.counter);
      for (const n of Object.keys(e.lists)) {
        check(`Av(${e.basis || "∅"}).generate_cperms(${n}) = Python Av, same order`, av.generateCperms(Number(n)).map(str), e.lists[n]);
      }
    }
    let occBad = 0;
    for (const o of expected.occurrences) {
      const got = cp.occurrences(o.word.split("").map(Number), o.pattern.split("").map(Number)).map(i => i.map(x => x + 1));
      const key = a => a.map(x => x.join(",")).sort().join(" ");
      if (key(got) !== key(o.occurrences)) { occBad++; log(`  mismatch: ${o.pattern} in ${o.word}`); }
    }
    check(`occurrences = Python occurrences_in (${expected.occurrences.length} pairs)`, occBad, 0);
  } else {
    log("skip  Python Av comparison (tests/av_expected.json not loaded)");
  }

  log(failures ? `\n${failures} check(s) failed, ${passes} passed` : `\nAll ${passes} checks passed`);
  return failures;
}

if (typeof require === "function" && typeof module === "object" && require.main === module) {
  const cp = require("../assets/js/cayley.js");
  let expected = null;
  try { expected = require("./av_expected.json"); } catch (e) { /* optional */ }
  process.exit(runCayleyTests(cp, expected, console.log) ? 1 : 0);
}
