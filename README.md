# abiollson.github.io

Abigail Ollson's academic website, built with Jekyll 4 and the minima theme and
published on GitHub Pages by the workflow in `.github/workflows/jekyll.yml`.
Every push to `main` rebuilds the site; it is live a minute or two later.

## Add a paper

Create a file in `_papers/`, for example `_papers/my-new-paper.md`:

```yaml
---
title: Sentence case title of the paper
authors: [bean, ollson]          # short names: files in _authors/
status: in preparation           # in preparation | submitted | accepted | published
projects: [insertion-encodings]  # short names: files in _projects/
order: 7                         # higher = newer; lists show newest first
# once accepted or published:
# citation: "<em>Journal name</em> 34(1) (2027), #P1.1"
# year: 2027
# doi: 10.xxxx/xxxxx
# arxiv: "2601.01234"            # keep the quotes, or YAML drops trailing zeros
# code: https://github.com/AbiOllson/...
---
The abstract goes here. Inline maths is written \\(x^2\\) (two backslashes in
these Markdown files), displayed maths \\[ \sum_n a_n \\].
```

"Submitted" never names the journal. The Papers, CV, author and project pages
update themselves.

## Add a talk

Add an entry at the top of `_data/talks.yml`, which is kept newest first, the
order the Talks tab, the CV and the front page show them in:

```yaml
- title: Title of the talk
  event: Name of the conference or seminar
  venue: Host institution, City, Country
  year: 2027
  month: 3
  type: talk          # talk | seminar | poster
  url: https://event-page
  slides: /assets/slides/my-talk.pdf   # optional: put the file in assets/slides/
```

## Add a co-author

Create `_authors/surname.md`:

```yaml
---
short: surname
title: Full Name
name: Full Name
position: Position, Institution
homepage: https://...
scholar: https://scholar.google.com/citations?user=...
---
One neutral sentence about their research, from their own page.
```

Then use `surname` in a paper's `authors` list; their name on the paper links to
their page, which lists your joint papers and projects.

The Co-authors tab (everyone named on a paper, alphabetically) is hidden for
now. To bring it back, set `published: true` in `coauthors.html` and add
`- coauthors.html` under `header_pages` in `_config.yml`.

The Programs tab (`_programs/`) is hidden too. To bring it back, set
`published: true` in `programs.html`, add `- programs.html` under
`header_pages`, and set `output: true` for `programs` in `_config.yml`.

## Add a figure to a research project

Figures go in the project's front matter (`_projects/*.md`). The Research tab
shows the first figure small; the project's own page shows all of them large.

```yaml
figures:
  - src: /assets/img/projects/my-figure.svg
    position: right   # optional: on the Research tab, sit beside the text, not below it
    alt: "Plain-text description for screen readers (Unicode, no LaTeX)"
    caption: 'Caption, maths allowed: \(\operatorname{Av}(132)\).'
  - caption: 'A grid of small images.'
    grid:
      - { src: /assets/img/projects/a.png, alt: "…", caption: '\(\operatorname{Av}(132)\)' }
```

To turn TikZ into an SVG, put it in a `standalone` document in `figures/`
(see the existing `.tex` files there; proof trees also need `tilings.sty` next
to them) and, with MiKTeX:

```bash
latex figure.tex
dvisvgm --no-fonts --exact-bbox --optimize -o figure.svg figure.dvi
```

## Other things to update

- CV PDF: replace `assets/Abigail_Ollson_CV.pdf` (keep the name).
- CV sections: `_data/education.yml`, `teaching.yml`, `service.yml`, `awards.yml`.
- Front-page text: `index.md`. Footer and links: `_config.yml` and `_includes/footer.html`.
- Colours and fonts: `assets/main.scss`.

## Preview on your computer

Ruby 3.3 is installed at `C:\Ruby33-x64`. In a terminal in this folder:

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000. Changes appear when you reload
(changes to `_config.yml` need a restart).

## Publish your changes

When the preview looks right, in a terminal in this folder:

```bash
git add -A
git commit -m "Add a talk"
git push
```

The repository and its history are public, so a commit message describes only
the visible change. The site is live a minute or two after the push; the
build's progress is under the repository's
[Actions](https://github.com/AbiOllson/AbiOllson.github.io/actions) tab, and if
a build fails the site keeps its previous version.

Small edits can also be made on github.com (open the file, click the pencil
icon, then "Commit changes"), which rebuilds the site too. Afterwards run
`git pull` here before changing anything on this computer.

## The Cayley permutation table (switched off for now)

`assets/js/cayley.js` draws an interactive "Avoiding a pattern, length by
length" table using a JavaScript port of the `Av` class from
[CayleyPerms](https://github.com/AbiOllson/CayleyPerms). It is not on the site
at the moment: to bring it back, take the `cp-widget` block and the script tag
in `projects.html` out of their `{% comment %}` tags. To check it against the
real Python `Av` class after changing it:

```bash
python tests/av_reference.py PATH/TO/CayleyPerms
python -m http.server 8765
```

and open http://127.0.0.1:8765/tests/cayley.test.html, which should say
"All … checks passed". (With Node installed, `node tests/cayley.test.js` also works.)
