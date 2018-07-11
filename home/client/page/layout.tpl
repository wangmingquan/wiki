<!doctype html>
{% html lang="en" framework="home:static/js/mod.js" %}
    {% head %}
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" type="image/x-icon" href="../static/images/icon.png">
        <title>{{ title || 'Here-Wiki' }}</title>
        {% require 'home:static/css/reset.less' %}
        {% require 'home:static/css/home.less' %}
    {% endhead %}

    {% body %}
        <div id="wrapper">
            <a id="top" name="top"></a>
            <header>
                <div class="headermain">
                    <span class="logo">Here-Wiki</span>
                    <div class="search">
                        <form action="/___search" method="get">
                            {% if content && content.path %}
                                <input type="hidden" name="path" value="{{ content.path }}" >
                            {% elseif path %}
                                <input type="hidden" name="path" value="{{ path }}">
                            {% endif %}
                            <input type="text" id="word" name="word" />
                            <input type="submit" id="search" value="" />
                        </form>
                    </div>
                </div>
            </header>
            <div id="middle" class="container">
                <div class="main">
                    {% block content %}
                    {% endblock %}
                </div>
            </div>
            <a class="top" id="topbtn" href="#"></a>
        </div>
        {% require "home:static/js/zepto.js" %}
        {% require "home:static/js/formattitle.js" %}
        {% script %}
            var checkTopBtn = () => {
                 if (window.scrollY > 200) {
                    $('#topbtn').show(); 
                } else {
                    $('#topbtn').hide(); 
                }
            };
            $(window).scroll(checkTopBtn);
            checkTopBtn();
        {% endscript %}
    {% endbody %}
{% endhtml %}
