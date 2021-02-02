---
layout: post
title:  "如何在Jekyll里加图片"
date:   2014-07-24 22:00:00
categories: log
tags: [Jekyll]
---

以前一直想在博客里面加上图片，有时候，能方便描述。  
无奈懒癌频频发作。直到今天才想起来去找一下具体怎么做。

没想到方法出奇的简单。
我在根目录下，创建了一个文件夹`assets`，然后在这个文件夹里放置了一个图片。然后我只要在文章里写上`![微信提示图片](/assets/images/2014-07-24-01.png)`，就可以把图片成功导入了。  
大赞！

以下[文字](http://jekyllrb.com/docs/posts/)翻译自Jekyll官网的文档里。 

有时候，有可能我们会想在文章里加上图片，下载或者别的数据资源。虽然在Markdown和Textile中，可能链接这些资源的语法不同，但是哪里能让我们存放这些资源，却是我们需要共同面对的问题。
	
但是因为Jekyll的灵活性，我们有很多解决方案可以做到这一点。一个常见的解决方案就是在你网站的根目录下，创建一个文件夹，比如叫assets或者downloads，用来放你的图片，下载文件或者其他资源。现在，我们可以从你的所有文章里读取你这些根路径下的资源了。这个依赖于你网站和根域名是如何配置的，不过下面有个例子，来告诉我们，如何在Markdown里面使用site.url这个变量。
 
有兴趣的可以直接看原文。  

Including images and resources

Chances are, at some point, you’ll want to include images, downloads, or other digital assets along with your text content. While the syntax for linking to these resources differs between Markdown and Textile, the problem of working out where to store these files in your site is something everyone will face.

Because of Jekyll’s flexibility, there are many solutions to how to do this. One common solution is to create a folder in the root of the project directory called something like `assets` or `downloads`, into which any images, downloads or other resources are placed. Then, from within any post, they can be linked to using the site’s root as the path for the asset to include. Again, this will depend on the way your site’s (sub)domain and path are configured, but here some examples (in Markdown) of how you could do this using the `site.url` variable in a post.

Including an image asset in a post:
	
	… which is shown in the screenshot below:
	![My helpful screenshot]({{ site.url }}/assets/screenshot.jpg)  

Linking to a PDF for readers to download:
	
	… you can [get the PDF]({{ site.url }}/assets/mydoc.pdf) directly.