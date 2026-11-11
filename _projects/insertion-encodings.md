---
title: The insertion encoding
short: insertion-encodings
authors: [bean, bell, ollson]
order: 1
figures:
  - src: /assets/img/projects/insertion-encoding-horizontal-evolution.svg
    alt: "The horizontal evolution of the Cayley permutation 243441: starting from a single slot ◇, values are inserted one step at a time, with slots ◇ and barred slots marking where later values go, ending at 243441."
    caption: 'The horizontal evolution of the Cayley permutation 243441.'
code:
  - name: cperms_ins_enc
    url: https://github.com/AbiOllson/cperms_ins_enc
---
The insertion encoding, introduced by Albert, Linton and Ruškuc, is a language that records how to build a permutation by inserting new maxima. We adapted it to Cayley permutations in two ways: the *vertical* insertion encoding inserts new maxima and the *horizontal* insertion encoding inserts new rightmost values. For permutations these are equivalent, by the inverse symmetry, but for Cayley permutations they are not, giving two different algorithms. We fully classify the Cayley permutation classes with a regular insertion encoding of either type, by showing which types of pattern must occur in classes without one, and we give Python code that computes the rational generating function of any class that has one. Of the 2207 symmetry classes of Cayley permutations avoiding patterns of size 3, 1959 have a regular insertion encoding of at least one type.

In a follow-up paper we adapted both encodings to restricted growth functions (RGFs), which are a subset of Cayley permutations such that \\(r_1 = 1\\) and \\(r_i \le 1 + \max\\{r_1, \ldots, r_{i-1}\\}\\) for all \\(i > 1\\). They are in bijection with unordered set partitions. We proved when a class of RGFs has a regular insertion encoding of either type.
