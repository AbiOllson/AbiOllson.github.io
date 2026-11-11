"""Write tests/av_expected.json from Abigail Ollson's CayleyPerms library.

The front page's Cayley permutation section uses a JavaScript port of the
Av class from https://github.com/AbiOllson/CayleyPerms. This script records
what the real Python Av class and CayleyPermutation.occurrences_in give, so
tests/cayley.test.html can check the port against them.

Usage: python tests/av_reference.py PATH/TO/CayleyPerms
"""
import json
import pathlib
import sys

sys.path.insert(0, sys.argv[1])
from cayley_permutations import Av, CayleyPermutation, string_to_basis  # noqa: E402

BASES = ["", "11", "12", "121", "211", "111", "123", "2213", "123, 231", "12, 21", "1221", "312, 2121"]
WORDS = ["1213214", "31421", "2341", "12121", "3112233", "121", "1"]
PATTERNS = ["1", "11", "12", "21", "211", "2213", "121", "1212", "123"]

out = {"av": [], "occurrences": []}
for b in BASES:
    av = Av(string_to_basis(b)) if b else Av([])
    out["av"].append({
        "basis": b,
        "counter": av.counter(6),
        "lists": {n: [c.as_one_based() for c in av.generate_cperms(n)] for n in range(1, 5)},
    })
for w in WORDS:
    word = CayleyPermutation.from_one_based(int(x) for x in w)
    for p in PATTERNS:
        patt = CayleyPermutation.from_one_based(int(x) for x in p)
        occ = [[i + 1 for i in o] for o in patt.occurrences_in(word)]
        out["occurrences"].append({"word": w, "pattern": p, "occurrences": occ})

path = pathlib.Path(__file__).with_name("av_expected.json")
path.write_text(json.dumps(out, indent=1), encoding="utf-8")
print(f"wrote {path}: {len(out['av'])} bases, {len(out['occurrences'])} word/pattern pairs")
