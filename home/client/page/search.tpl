{% extends 'home:page/layout.tpl' %}

{% block content %}
  {% require 'home:static/css/search.less' %}
  <div class="searchpage">
    <div class="position">
      <span>当前位置：</span>
      <p>
        <a href="/">首页</a> / 搜索结果
      </p>
    </div>
    {% if !list.length %}
      <div class="nofiles">没有搜索到<b>『{{word}}』</b></div>
    {% else %}
      <p class="title"><b>『{{word}}』</b>的搜索结果如下：</p>
      {% if path && path !== '/' %}
        <div class="filter"><input type="checkbox" id="filterInPath" checked="checked" /> 只看 <a href="{{path}}">{{path}}</a> 下的搜索结果</div>
      {% endif %}
      <ul class="fir_file_list">
        {% for item in list %}
          <li class="file-item {{item.isInPath}}">
            <a href="{{item.fullpath}}">{{item.fullpath}}</a>
            <div class="des">
              {% autoescape false %}
                {{item.des}}
              {% endautoescape %}
            </div>
          </li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
  {% script %}
  $('#filterInPath').change(function () {
    var checked = $('#filterInPath')[0].checked;
    if (checked) {
      $('.notInPath').hide();
    } else {
      $('.notInPath').show();
    }
  });
  {% endscript %}
{% endblock %}