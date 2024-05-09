# Clue Standard Edition

{% assign edition = "standard" %}

{% set spliturl = post.url | split: '/' %}
{% set postname = spliturl[4] | replace: '.html', '' %}

{% include nav.html %}

{% include suspects.html %}

{% include weapons.html %}

{% include rooms.html %}
