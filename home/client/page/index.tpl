{% extends 'home:page/layout.tpl' %}

{% block content %}
  <div>
    <div class="position">
      <span>当前位置：</span>
      <p>
        <a href="/">首页</a>
        {% for item in paths %}
          / <a href="{{item.path}}">{{item.name}}</a>
        {% endfor %}
      </p>
    </div>
    {% if isFile %}
      <h1 class="pagetitle">{{ content.title }}</h1>

      <div class="file_time_info">
        <b>创建时间：</b>
        <span>{{content.created_at.toLocaleString()}}</span>

        <b>修改时间：</b>
        <span>{{content.updated_at.toLocaleString()}}</span>
      </div>
      {% if content.html %}
        <div class="article">
          {% autoescape false %}
            {{content.html}}
          {% endautoescape %}
        </div>
      {% elseif isHtml(content.filename)  %}
        <div class="html_preview">
          <div class="box">
            <div class="container">
              <div class="_blank"></div>
              <iframe sandbox="" src="{{url}}?preview=1" frameborder="0"></iframe>
            </div>
          </div>
        </div>
      {% else %}
        <div class="nopreview">
          <p class="info">非markdown文件暂不提供在线预览</p>
          <a href="/___download?url={{encodeURI(url)}}">点击下载本文件</a>
        </div>
      {% endif %}
    {% else %}
      {% if dirs.length == 0 && files.length == 0 %}
        <div class="nofiles">空文件夹</div>
      {% endif %}

      {% if dirs.length %}
        <div class="module_box">
          <p class="title">当前目录包含以下文件夹：</p>
          <ul class="fir_file_list">
            {% for item in dirs %}
              <li class="dir"><a href="{{item.fullpath}}/">{{item.dirname}}</a></li>
            {% endfor %}
          </ul>
        </div>
      {% endif %}
      {% if files.length %}
        <div class="module_box">
          <p class="title">当前目录包含以下文件：</p>
          <ul class="fir_file_list">
            {% for item in files %}
              <li class="file">
                <a href="{{item.fullpath}}">{{item.filename || item.title}}</a>
              </li>
            {% endfor %}
          </ul>
        </div>
      {% endif %}

      {% if hasReadMe && readMe.html %}
        <div class="module_box">
          <p class="title">{{readMeFileName}}</p>
          <div class="article">
            {% autoescape false %} {{readMe.html}} {% endautoescape %}
          </div>
        </div>
      {% endif %}
    {% endif %}
  </div>
  <link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css">
  <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
  {% script %}
    $(document).ready(function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    });
  {% endscript %}
{% endblock %}