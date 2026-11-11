---
title: Generating trees for inversion sequences
short: generating-trees
authors: [bean, ollson, pantone]
order: 3
figures:
  - src: /assets/img/projects/generating-tree.svg
    position: right
    alt: "The first three levels of a generating tree. The root ε has children (0, ∅) and (0, {0}); each node is a pair of an inversion sequence and a set of values, such as (01, {0,1}), and branches to between two and eight children."
    caption: 'The first three levels of the combinatorial generating tree for configurations growing on the right.'
---
An inversion sequence of length \\(n\\) is a word \\(e_1 e_2 \cdots e_n\\) with \\(0 \le e_i < i\\) for all \\(i\\). A generating tree is a rooted, labelled tree in which the label of each node determines the labels of its children. Generating trees were introduced for pattern-avoiding permutations and have also been used for classes of inversion sequences. Given the set of Cayley permutations a class avoids, our algorithm finds a generating tree for the class automatically by inserting new rightmost values and committing to which values already seen will appear again. We give a Python implementation of the algorithm and prove the conditions under which the algorithm finishes.
