# Clue Standard Edition

{% assign edition = "standard" %}

{% assign spliturl = post.url | split: '/' %}
{% assign postname = spliturl[4] | replace: '.html', '' %}

{% include nav.html %}

{% include suspects.html %}

{% include weapons.html %}

{% include rooms.html %}
