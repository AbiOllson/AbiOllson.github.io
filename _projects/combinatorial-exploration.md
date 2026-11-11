---
title: Combinatorial exploration of Cayley permutations
short: combinatorial-exploration
authors: [bean, ollson]
order: 2
figures:
  - src: /assets/img/projects/combinatorial-exploration-proof-tree.svg
    position: right
    alt: "A proof tree for the class Av(122, 132): a tree of tilings, each a grid of cells with obstructions drawn in red, connected by curved edges, with chains of equivalent tilings marked ≅."
    caption: 'A proof tree for the class \(\operatorname{Av}(122, 132)\).'
  - caption: 'Random sampling of Cayley permutation classes.'
    grid:
      - { src: /assets/img/projects/heatmaps/av-132.png, alt: "Heatmap from random sampling of Av(132)", caption: '\(\operatorname{Av}(132)\)' }
      - { src: /assets/img/projects/heatmaps/av-112-121-231.png, alt: "Heatmap from random sampling of Av(112, 121, 231)", caption: '\(\operatorname{Av}(112, 121, 231)\)' }
      - { src: /assets/img/projects/heatmaps/av-112-132-312.png, alt: "Heatmap from random sampling of Av(112, 132, 312)", caption: '\(\operatorname{Av}(112, 132, 312)\)' }
      - { src: /assets/img/projects/heatmaps/av-122-231-312.png, alt: "Heatmap from random sampling of Av(122, 231, 312)", caption: '\(\operatorname{Av}(122, 231, 312)\)' }
      - { src: /assets/img/projects/heatmaps/av-123-211-312.png, alt: "Heatmap from random sampling of Av(123, 211, 312)", caption: '\(\operatorname{Av}(123, 211, 312)\)' }
      - { src: /assets/img/projects/heatmaps/av-132-213-231.png, alt: "Heatmap from random sampling of Av(132, 213, 231)", caption: '\(\operatorname{Av}(132, 213, 231)\)' }
      - { src: /assets/img/projects/heatmaps/av-111-132-221-312.png, alt: "Heatmap from random sampling of Av(111, 132, 221, 312)", caption: '\(\operatorname{Av}(111, 132, 221, 312)\)' }
      - { src: /assets/img/projects/heatmaps/av-112-132-312-321.png, alt: "Heatmap from random sampling of Av(112, 132, 312, 321)", caption: '\(\operatorname{Av}(112, 132, 312, 321)\)' }
      - { src: /assets/img/projects/heatmaps/av-123-211-221-231.png, alt: "Heatmap from random sampling of Av(123, 211, 221, 231)", caption: '\(\operatorname{Av}(123, 211, 221, 231)\)' }
code:
  - name: CayleyPerms
    url: https://github.com/AbiOllson/CayleyPerms
---
Combinatorial Exploration, introduced by Albert, Bean, Claesson, Nadeau, Pantone and Úlfarsson, has been very successful at enumerating permutation classes. We have adapted it to Cayley permutations and introduced new strategies not used for permutations. The algorithm succeeds for classes that do not have a regular insertion encoding. Of the 248 symmetry classes of Cayley permutations avoiding patterns of size 3 that have no regular insertion encoding of either type, we have found an algebraic generating function for 129 and a combinatorial specification with one catalytic variable for the remaining 119.
