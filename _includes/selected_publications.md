## Selected Publications

{% assign selected = site.data.publications.main | where_exp: "item", "item.selected == true" %}
{% if selected == empty %}
  {% assign selected = site.data.publications.main %}
{% endif %}

{% include publication_list.html publications=selected %}
