---
layout: default
title: Home
---
<header class="hero">
  <h1 class="hero-name">{{ site.author.name }}</h1>
  <p class="hero-role">PhD student in mathematics<span class="sep" aria-hidden="true"> · </span><br class="br-phone">School of Computer Science and Mathematics<span class="sep" aria-hidden="true"> · </span><br class="br-phone">Keele University</p>
  <ul class="hero-links">
    <li><a href="mailto:{{ site.email }}">{% include icon.html name="email" %}{{ site.email }}</a></li>
    <li><a href="{{ site.links.scholar }}">{% include icon.html name="scholar" %}Google Scholar</a></li>
    <li><a href="{{ site.links.arxiv }}">{% include icon.html name="arxiv" %}arXiv</a></li>
    <li><a href="{{ site.links.orcid }}">{% include icon.html name="orcid" %}ORCID</a></li>
    <li><a href="{{ site.links.github }}">{% include icon.html name="github" %}GitHub</a></li>
  </ul>
</header>

<div class="intro-row">
<img class="portrait" src="{{ '/assets/img/abigail-ollson.jpg' | relative_url }}" width="1037" height="1037" alt="Abigail Ollson, smiling, in a teal jacket in front of snowy trees">
<div class="intro" markdown="1">
I am a PhD student in mathematics at Keele University, working in enumerative combinatorics, supervised by [Christian Bean](/authors/bean/). My research focus has been on the enumeration of combinatorial objects defined as pattern-avoiding words on \\(\mathbb{N}\\). This has largely been through writing algorithms in Python for the automatic discovery of generating functions, and for many of these algorithms I have also proven when they will terminate. So far, the combinatorial objects I have focused on are Cayley permutations, restricted growth functions and inversion sequences.
</div>
</div>

{%- assign papers = site.papers | sort: "order" | reverse -%}
{%- assign months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec" | split: "," %}
<div class="cards">
  <section class="card" aria-labelledby="card-papers">
    <h2 id="card-papers">Recent papers</h2>
    <ul>
      {%- assign shown = 0 -%}
      {%- for p in papers -%}
        {%- if p.status == "published" and shown < 3 -%}
        {%- assign shown = shown | plus: 1 %}
        <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a><span class="meta">{% include paper-status.html paper=p %}</span></li>
        {%- endif -%}
      {%- endfor %}
    </ul>
    <a class="all" href="{{ '/papers/' | relative_url }}">All papers →</a>
  </section>
  <section class="card" aria-labelledby="card-talks">
    <h2 id="card-talks">Recent talks</h2>
    <ul>
      {%- for t in site.data.talks limit: 3 -%}
      {%- assign mi = t.month | minus: 1 %}
        <li>{{ t.title }}<span class="meta">{{ t.event }}, {{ months[mi] }} {{ t.year }}</span></li>
      {%- endfor %}
    </ul>
    <a class="all" href="{{ '/talks/' | relative_url }}">All talks →</a>
  </section>
  <section class="card" aria-labelledby="card-current">
    <h2 id="card-current">Current projects</h2>
    <ul>
      {%- for p in papers -%}
        {%- if p.status == "in preparation" %}
        <li><a href="{{ p.url | relative_url }}">{{ p.title }}</a><span class="meta">In preparation</span></li>
        {%- endif -%}
      {%- endfor %}
    </ul>
    <a class="all" href="{{ '/projects/' | relative_url }}">All research projects →</a>
  </section>
</div>
