import os

tornado_settings = dict(
    template_path = os.path.join(os.path.dirname(__file__),"template"),
    static_path = os.path.join(os.path.dirname(__file__),"static"),
    debug = True,
    port=8888,
)

## Site
title = 'ForgetWall'
subtitle = 'Write it down and forget all.'
description = 'Wancheng`s blog'
author = "Wancheng Zhang"
url = 'http://wancheng.site'
theme = 'default' 

# Category & Tag
headers = [
        {'title':'首页','url':'/','class':'fa fa-home'},
        {'title':'归档','url':'life.md','class':'fa fa-archive'},
        {'title':'关于','url':'life.md','class':'fa fa-about'},
        {'title':'订阅','url':'life.md','class':'fa fa-rss'},
        ]
categories = [
        {'title':'技术','url':'_tech.md'},
        {'title':'生活','url':'life.md'},
        ]
tags = ['Python','神经网络','tmux','爬虫']

links = [
        {'title':'酷壳','url':'http://www.coolshell.cn'},
        {'title':'邓侃的博客','url':'http://blog.sina.com.cn/kdeng'},
        ]
