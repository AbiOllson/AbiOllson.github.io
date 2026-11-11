# Notes for Claude: Abigail Ollson's academic website

Jekyll 4.4 + minima 2.5 site for https://abiollson.github.io (repository
`AbiOllson/AbiOllson.github.io`), deployed by GitHub's starter Jekyll workflow
(`.github/workflows/jekyll.yml`, Pages source "GitHub Actions", no secrets).
Structure modelled on https://ulfarsson.github.io and the PermutaTriangle site;
slim top bar (name left, tabs right); colours taken from Abigail's photo (snow white, jacket teal,
copper hair, magenta cuff), see the palette comment in `assets/main.scss`.
The site should not look like a copy of anyone else's.
README.md explains routine updates for Abigail.

## Rules

1. **Facts come only from Abigail or authoritative sources** (her CV, arXiv,
   the publisher, Crossref, the person's own homepage), and she confirms them.
   Never invent or guess a title, author, date, venue, DOI, position or URL.
   If something is missing, leave it out and tell her; no placeholders on the site.
2. **Titles in sentence case** everywhere.
3. **Status lines**: published/accepted → the citation with year; under review →
   "Submitted" (never name the journal); not yet submitted → "In preparation".
4. **The repository is public, history included.** Nothing private in any file
   or commit message: no passwords/tokens/keys, no referee reports, rejections,
   submission IDs or where a paper is under review, no co-author's plans or
   unpublished email, nothing about Abigail she hasn't chosen to share (home
   address, phone, date of birth). Commit messages describe only the visible change.
5. **No secrets in chat.** Never ask for a password or token; she signs in to
   GitHub herself.
6. **Ask before anything goes online** (repo creation, every push, any settings
   change), and show what will change. Never force-push.
7. **Ask before installing** anything outside the project.
8. **Check your work**: `bundle exec jekyll serve`, look at every changed page at
   desktop and phone (375px) widths, check links, run the Cayley tests if
   `assets/js/cayley.js` changed.

## Layout

- `_config.yml`: site settings, `header_pages` (tab order: CV, Research, Papers,
  Talks; Research is `projects.html` at /projects/, which also holds the
  Cayley permutations section; its avoidance table is commented out for now), profile `links`, MathJax version. The Programs tab and
  the Co-authors tab are hidden (`published: false` in `programs.html` and `coauthors.html`, not in
  `header_pages`, programs collection `output: false`); author pages still exist.
- Collections (one Markdown file per item):
  - `_papers/`: title, authors (keys into `_authors/`), status, citation, year,
    doi, arxiv (quoted string!), code, projects, `order` (higher = newer); body = abstract.
  - `_authors/`: short, title, name, position, homepage, scholar; body = one sentence.
    `ollson.md` has `is_me: true` and is excluded from Co-authors.
  - `_projects/`: title, short, authors, order, code list, `figures` (list of
    {src, alt, caption} or {caption, grid: [...]}); body = paragraphs. The Research
    tab shows the first figure small (`_includes/project-figure.html small=true`),
    beside the text when that figure has `position: right` (proof tree, generating
    tree; the wide insertion-encoding strip stays below); the project page shows all large. Figures are SVG compiled from Abigail's TikZ
    (sources in `figures/`, excluded from the build; see README) or PNGs from her thesis.
  - `_programs/`: title, authors, repo, order; body = description.
- `_data/`: `talks.yml` (newest first), `education.yml`, `teaching.yml`,
  `service.yml`, `awards.yml` for the CV.
- `_layouts/` paper, author, project, program; `_includes/` header (masthead +
  nav), footer, head (MathJax, fonts), icon, author-names, paper-item,
  paper-status, paper-links, talk-item.
- Pages: `index.md` (intro, photo, three cards),
  `cv.html`, `papers.html`, `talks.html`, `projects.html`, `programs.html`,
  `coauthors.html`, `404.html`.
- `assets/main.scss`: palette and all custom styles. Fonts (Roboto, Roboto Slab)
  are self-hosted in `assets/fonts/`; no Google Fonts requests.
- `assets/js/cayley.js`: the "Avoiding a pattern, length by length" table.
  Not on any page at the moment (Abigail asked to remove it for now; the
  markup and script tag are in Liquid comments in `projects.html`). An earlier
  step-by-step pattern search was removed at her request. Plain JS, nothing
  external, keyboard accessible. Its `Av` is a port of `Av` from
  https://github.com/AbiOllson/CayleyPerms; `tests/` checks it against brute
  force and against the Python class (see README).

## Maths

MathJax pinned (`mathjax_version`), `\(…\)` inline, `\[…\]` display. In Markdown
files write `\\(`, `\\)`, `\\{`, `\\}` (kramdown eats one backslash). Where MathJax
can't run (titles, alt text, meta descriptions) use Unicode, e.g. ℕ.

## Ideas for later (Abigail's wishes)

- Animation of the insertion encoding (vertical/horizontal) on the Insertion
  encoding project page ("The insertion encoding", short name insertion-encodings).
- A growing generating tree for inversion sequences on the Generating trees page.
- Figures for the WQO and Patterns in words projects (none yet).
