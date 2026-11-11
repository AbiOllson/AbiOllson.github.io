/*
 * Cayley permutations avoiding a pattern, length by length (front page).
 * Self-contained: plain JavaScript, nothing loaded from elsewhere.
 *
 * A Cayley permutation is a word of positive integers in which every value
 * from 1 up to the largest appears. A word contains a pattern p when some
 * subsequence standardises to p (equal letters match equal letters).
 *
 * The pure functions at the top are exported for tests/cayley.test.js;
 * occurrences() is not used on the page, but the tests use it to check
 * contains() against the Python occurrences_in.
 */
(function (root) {
  "use strict";

  // ---------- Pure combinatorics ----------

  // Parse "1213214" (one digit per letter) or "1, 12, 3" (separated numbers).
  function parseWord(text) {
    var s = String(text).trim();
    if (s === "") return { error: "Type at least one letter." };
    var parts;
    if (/^[0-9]+$/.test(s)) parts = s.split("");
    else if (/^[0-9]+([\s,;]+[0-9]+)*$/.test(s)) parts = s.split(/[\s,;]+/);
    else return { error: "Use digits only, or numbers separated by commas or spaces." };
    return { word: parts.map(Number) };
  }

  function isCayley(w) {
    if (w.length === 0) return true;
    var max = Math.max.apply(null, w), seen = {};
    for (var i = 0; i < w.length; i++) {
      if (w[i] < 1) return false;
      seen[w[i]] = true;
    }
    for (var v = 1; v <= max; v++) if (!seen[v]) return false;
    return true;
  }

  // Replace the smallest value by 1, the next smallest by 2, and so on.
  function standardise(w) {
    var vals = w.slice().sort(function (a, b) { return a - b; });
    var rank = {}, r = 0;
    for (var i = 0; i < vals.length; i++) {
      if (i === 0 || vals[i] !== vals[i - 1]) rank[vals[i]] = ++r;
    }
    return w.map(function (x) { return rank[x]; });
  }

  function sameWord(a, b) {
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }

  // All k-subsets of {0,...,n-1} as increasing index lists, in lexicographic order.
  function combinations(n, k) {
    var out = [], idx = [];
    for (var i = 0; i < k; i++) idx.push(i);
    if (k > n) return out;
    while (true) {
      out.push(idx.slice());
      var j = k - 1;
      while (j >= 0 && idx[j] === n - k + j) j--;
      if (j < 0) return out;
      idx[j]++;
      for (var t = j + 1; t < k; t++) idx[t] = idx[t - 1] + 1;
    }
  }

  function pick(w, idx) { return idx.map(function (i) { return w[i]; }); }

  // Every occurrence of pattern p in word w, as lists of 0-based positions.
  function occurrences(w, p) {
    return combinations(w.length, p.length).filter(function (idx) {
      return sameWord(standardise(pick(w, idx)), p);
    });
  }

  // Does w contain p? Backtracking with early exit, used for counting avoiders.
  function contains(w, p) {
    var k = p.length, n = w.length, chosen = [];
    // value of w assigned to each pattern value 1..max(p)
    function rec(pos, start) {
      if (pos === k) return true;
      for (var i = start; i <= n - (k - pos); i++) {
        chosen[pos] = w[i];
        if (consistent(pos) && rec(pos + 1, i + 1)) return true;
      }
      return false;
    }
    // the chosen letters so far must compare exactly as the pattern's letters do
    function consistent(pos) {
      for (var q = 0; q < pos; q++) {
        var a = p[q] - p[pos], b = chosen[q] - chosen[pos];
        if ((a < 0) !== (b < 0) || (a === 0) !== (b === 0)) return false;
      }
      return true;
    }
    return rec(0, 0);
  }

  // ---------- Av: a JavaScript port of the Av class in CayleyPerms ----------
  // https://github.com/AbiOllson/CayleyPerms (cayley_permutations/av.py).
  // A class is built length by length: every Cayley permutation of length n+1
  // arises from one of length n by adding a maximum, and a class is closed
  // under taking patterns, so only extensions of avoiders need checking.
  // Words here are one-based, so 1 is the smallest value.

  // CayleyPermutation.add_maximum: insert a new maximum anywhere, or a copy of
  // the current maximum at or before the position of its first occurrence.
  function addMaximum(w) {
    var val = Math.max.apply(null, w), index = w.indexOf(val), out = [], i;
    for (i = 0; i <= w.length; i++) out.push(w.slice(0, i).concat([val + 1], w.slice(i)));
    for (i = 0; i <= index; i++) out.push(w.slice(0, i).concat([val], w.slice(i)));
    return out;
  }

  function Av(basis) { this.basis = basis.slice(); }
  Av.prototype.inClass = function (w) {
    return !this.basis.some(function (p) { return contains(w, p); });
  };
  Av.prototype.nextSizedCpermsInClass = function (last) {
    var next = [], self = this;
    last.forEach(function (w) {
      addMaximum(w).forEach(function (v) { if (self.inClass(v)) next.push(v); });
    });
    return next;
  };
  Av.prototype.generateCperms = function (size) {
    if (size === 0) return [[]];
    var current = this.inClass([1]) ? [[1]] : [];
    for (var count = 1; count < size; count++) current = this.nextSizedCpermsInClass(current);
    return current;
  };
  // counter(ran): the number in the class of each length 0, 1, ..., ran.
  Av.prototype.counter = function (ran) {
    if (ran === 0) return [1];
    var current = this.inClass([1]) ? [[1]] : [], counts = [1, current.length];
    for (var size = 1; size < ran; size++) {
      current = this.nextSizedCpermsInClass(current);
      counts.push(current.length);
    }
    return counts;
  };
  // All lengths 1..ran at once, sharing the work: lists[n] is the class at length n.
  Av.prototype.generateCpermsDict = function (ran) {
    var lists = { 0: [[]] }, current = this.inClass([1]) ? [[1]] : [];
    if (ran >= 1) lists[1] = current;
    for (var n = 2; n <= ran; n++) lists[n] = current = this.nextSizedCpermsInClass(current);
    return lists;
  };

  var api = {
    parseWord: parseWord, isCayley: isCayley, standardise: standardise,
    combinations: combinations, occurrences: occurrences, contains: contains,
    addMaximum: addMaximum, Av: Av
  };
  if (typeof module === "object" && module.exports) module.exports = api;
  if (typeof document === "undefined") return;

  // ---------- Interface ----------

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function show(w) { return w.some(function (x) { return x > 9; }) ? w.join(",") : w.join(""); }
  // ---- Widget 2: Cayley permutations avoiding a pattern, length by length ----
  function avoidanceWidget(host) {
    host.innerHTML = "";
    var MAXN = 6, LISTN = 5;
    var form = el("form", { "class": "cp-form" });
    var f1 = el("label", {}, "Patterns to avoid "); var inB = el("input", { type: "text", value: "11", autocomplete: "off", spellcheck: "false", size: "12" }); f1.appendChild(inB);
    var go = el("button", { type: "submit" }, "Count");
    form.appendChild(f1); form.appendChild(go);
    var hint = el("p", { "class": "cp-hint" }, "Separate several patterns with commas, for example 123, 231.");
    var err = el("p", { "class": "cp-error", role: "alert" });
    var table = el("table", { "class": "cp-table" });
    var listHead = el("div", { "class": "cp-form" });
    var lab = el("label", {}, "List the avoiders of length ");
    var selN = el("select", {});
    for (var n = 1; n <= LISTN; n++) { var o = el("option", { value: n }, n); if (n === 3) o.selected = true; selN.appendChild(o); }
    lab.appendChild(selN); listHead.appendChild(lab);
    var listNote = el("p", { "class": "cp-hint" });
    var list = el("ul", { "class": "cp-chips" });
    [form, hint, err, table, listHead, listNote, list].forEach(function (e) { host.appendChild(e); });

    var basis = null, lists = null;
    var all = new Av([]).generateCpermsDict(MAXN); // every Cayley permutation: Av of the empty basis
    function allOf(n) { return all[n]; }
    function avoidersOf(n) { return lists[n]; }

    function run() {
      err.textContent = "";
      var parts = inB.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      if (!parts.length) { err.textContent = "Type at least one pattern."; return; }
      var b = [];
      for (var i = 0; i < parts.length; i++) {
        var r = parseWord(parts[i].replace(/\s+/g, ""));
        if (r.error) { err.textContent = "“" + parts[i] + "”: " + r.error; return; }
        if (!isCayley(r.word)) { err.textContent = "“" + parts[i] + "” is not a Cayley permutation: every value from 1 up to its largest must appear."; return; }
        if (r.word.length > MAXN) { err.textContent = "Please keep patterns to at most " + MAXN + " letters."; return; }
        b.push(r.word);
      }
      basis = b;
      lists = new Av(basis).generateCpermsDict(MAXN);
      var label = basis.map(show).join(", ");
      table.innerHTML = "";
      var cap = el("caption", {}, "Number of Cayley permutations of each length, and how many avoid " + label);
      table.appendChild(cap);
      var thead = el("thead"), tr = el("tr");
      ["Length", "All Cayley permutations", "Avoiding " + label].forEach(function (h) { tr.appendChild(el("th", { scope: "col" }, h)); });
      thead.appendChild(tr); table.appendChild(thead);
      var tb = el("tbody");
      for (var n = 1; n <= MAXN; n++) {
        var av = avoidersOf(n);
        var row = el("tr");
        row.appendChild(el("th", { scope: "row" }, n));
        row.appendChild(el("td", {}, allOf(n).length));
        row.appendChild(el("td", {}, av.length));
        tb.appendChild(row);
      }
      table.appendChild(tb);
      renderList();
    }
    function renderList() {
      if (!basis) return;
      var n = Number(selN.value), av = avoidersOf(n);
      list.innerHTML = "";
      listNote.textContent = av.length + " of the " + allOf(n).length + " Cayley permutations of length " + n +
        " avoid " + basis.map(show).join(", ") + ".";
      av.forEach(function (w) { list.appendChild(el("li", {}, show(w))); });
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    selN.addEventListener("change", renderList);
    run();
  }

  function init() {
    var b = document.getElementById("cp-avoidance");
    if (b) avoidanceWidget(b);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})(typeof window !== "undefined" ? window : this);
