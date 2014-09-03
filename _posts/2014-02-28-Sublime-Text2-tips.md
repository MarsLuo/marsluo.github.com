---
layout: post
title: "Sublime Text2 使用技巧"
description: ""
categories: 工匠梦
tags: [HTML, Sublime]
---

####如何用Sublime格式化代码呢？

 `menu-edit-line-reindent`
   
     
 
####如何查找替换回车

["GET     /","GET     /biz","GET     /biz/:id","GET     /cust"]  
前几天要把类似这样的API文档化，但是这种格式根本不利于阅读。  
每一个API结尾都有一个“,”， 于是要查找替换就好了。  

1. Shift+Command+r， 调出查找页面。  
2. 点击查找框左上的 “.＊” 符号。（一定要进入正则模式才能替换回车哦）  
3. 在Find输入框中输入“,”
4. 在Replace中输入“,/n”
5. 回车，搞定。

####如何进入列模式
鼠标左键＋Option 或 鼠标中键