---
layout: post
title:  "关于使用IB时，Autoresize Subviews的坑"
date:   2014-07-17 18:00:00
categories: Log
tags: [iOS]
---

最近连续两次被同一个属性坑到了。  
残念中。。。。。

第一次是在调一个TableView的时候，发现TableView的高度总是有问题。  
第二次实在调一个ImageView的时候，发现ImageView的高度总是有问题。  

这种事情，总让人很尴尬。

最后发现是在IB里，View上设置了Autoresize Subviews， 每每你设定了坐标后，他都会自说自话的变化View子view的frame。  

去掉了这个属性之后，相关的代码，才按照我们的期望来呈现界面。