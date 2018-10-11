{% extends 'home:page/layout.tpl' %}

{% block content %}
  <div>
    <div class="form_box">
      <p class="title">你是谁？</p>
      <div class="form">
        <input id="token" type="text" placeholder="输入密令，查看WIKI" />
        <span id="submit">GO</span>
      </div>
    </div>
  </div>
  {% require "home:static/css/login.less" %}
{% endblock %}

{% block script %}
  {{ parent }}
  {% require "home:static/js/login.js" %}
{% endblock %}
