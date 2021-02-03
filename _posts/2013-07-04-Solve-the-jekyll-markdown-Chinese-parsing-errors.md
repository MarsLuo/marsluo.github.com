---
layout: post
title: "解决jekyll markdown中文解析有误的问题"
description: ""
categoriesLog
tags: [blog, Jekyll]
---


在编辑博文的时候，如果博文有中文的话，有时候会出现MarkDown语法解析不了的情况。

在Google一下午之后，得出了解决方案。

使用 [jekyll-pandoc-plugin](https://github.com/dsanson/jekyll-pandoc-plugin)来解决这个问题。   
[Pandoc](http://yanping.me/cn/blog/2012/03/13/pandoc/)是一个非常强大的格式转换器。

解决步骤：  

1. 打开[jekyll-pandoc-plugin](https://github.com/dsanson/jekyll-pandoc-plugin)。
2. 安装pandoc。  

		(sudo) gem install pandoc-ruby
3. 把这个[文件](https://github.com/dsanson/jekyll-pandoc-plugin/blob/master/pandoc_markdown.rb)拷贝到yourName.github.com/_plugins下面。
4. 修改_congif.yml文件。在文件下面增加下面的代码就可以解决我们的问题了。  

		markdown:  rdiscount  
		pandoc:  true  
		
PS：因为Github不支持pandoc，而且如果在markdown选项里遇到pandoc会自动替换为默认选项。所以要使用以上代码，详见[jekyll-pandoc-plugin](https://github.com/dsanson/jekyll-pandoc-plugin)。

修改完这个后，需要生成静态页面然后上传，谨记。