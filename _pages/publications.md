---
layout: default
title: Publications
permalink: /publications/
---

## Publications

<ul class="publications-list">
{% for link in site.data.publications.main %}
  <li class="publication-item">
    <div class="pub-row">
      <div class="col-sm-9" style="position: relative;padding-right: 15px;padding-left: 0;">
        <div class="title"><strong>{{ link.title }}</strong></div>
        <div class="author">{{ link.authors }}</div>
        {% if link.journal %}
            <div class="periodical"><em>{{ link.journal }}</em></div>
        {% endif %}

          {% if link.conference_short or link.preprint or link.doi or link.pdf or link.page or link.code or link.github %}
            <span class="paper-links">
              {% if link.conference_short and link.conference_link %}
              <a href="{{ link.conference_link }}" target="_blank" rel="noopener">{{ link.conference_short }}</a>
              {% elsif link.conference_short %}
              <span class="paper-link-label">{{ link.conference_short }}</span>
              {% endif %}
              {% if link.doi %}
              <a href="{{ link.doi }}" target="_blank" rel="noopener">[DOI]</a>
              {% endif %}
              {% if link.preprint %}
              <a href="{{ link.preprint }}" target="_blank" rel="noopener">[arXiv]</a>
              {% endif %}
              {% if link.pdf %}
              <a href="{{ link.pdf }}" target="_blank" rel="noopener">[PDF]</a>
              {% endif %}
              {% if link.page %}
              <a href="{{ link.page }}" target="_blank" rel="noopener">[Project]</a>
              {% endif %}
              {% if link.code %}
              <a href="{{ link.code }}" target="_blank" rel="noopener">[Code]</a>
              {% endif %}
              {% if link.github %}
              <a href="{{ link.github }}" target="_blank" rel="noopener">[GitHub]</a>
              {% endif %}
            </span>
          {% endif %}

        {% if link.notes %}
        <strong><i style="color:#e74d3c">{{ link.notes }}</i></strong>
        {% endif %}
        {% if link.others %}
        {{ link.others }}
        {% endif %}
      </div>
    </div>
  </li>
{% endfor %}
</ul>
