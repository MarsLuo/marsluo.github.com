---
layout: post  
title:  "使用gitbook心得小记"  
date:   2017-02-10 14:26:41  
categories: 工匠梦  
tags: [gitbook, Tips]  
---

Gitbook 是一个写书的工具。让我们可以以写代码的形式，来写书。
当然这里我们也可以用它来写文档。

https://www.gitbook.com/book/gitbookio/docs-toolchain  这里是他的官方文档，有问题可以查阅下文档。
该网站习惯性抽风，建议大家下载PDF来看。

#### 1.安装
我们需要用npm来安装他。gitbook的依赖环境是nam和node.js。在安装gitbook之前，需要安装npm和node.js。

使用下面的命令来安装gitbook：
$ npm install gitbook-cli -g

#### 2. 创建一本书
$ gitbook init
命令行会帮我们做初始化。
执行 gitbook init 之后，当前目录会多两个文件，SUMMARY.md 和 README.md。

SUMMARY.md 中包含整个文件的目录结构。README.md 则为我们生成了一个示例的文件。

#### 3. 查看书籍
$ gitbook serve
执行上面的命令之后，我们可以通过在浏览器里输入 http://localhost:4000 来查看我们之前写的书。

####  4. 目录结构

~~~
# Summary
* [Part I](part1/README.md)
    * [Writing is nice](part1/writing.md)
    * [GitBook is nice](part1/gitbook.md)
* [Part II](part2/README.md)
    * [We love feedback](part2/feedback_please.md)
    * [Better tools for authors](part2/better_tools.md)  

~~~~
以官方提供的示例来解说。
在gitbook中，我们可以为我们的书分两个目录层级。层级用/tab键来划分。方括号中的是章节名，圆括号中的是这个章节对应的文件路径。

#### 5. 导出。
以PDF形式导出。
gitbook以PDF形式导出的时候依赖calibre。 所以我们要先安装calibre。
命令行形式：
`$ sudo aptitude install calibre`
也可以去官方的网站上去下载。

安装成功后，要执行下面的命令，把ebook-convert 加到路径里。
`$ sudo ln -s ~/Applications/calibre.app/Contents/MacOS/ebook-convert /usr/bin`
成功之后，就可以导出PDF了。
$ gitbook pdf
#### 6. 封面。
图书当然要有封面了。
在根目录下面放一个名为cover.jpg，大小为1800x2360 像素的jpg格式图片，就可以在生成的时候，将封面加在PDF前面了。

7.配置。
gitbook有很多配置。我们这里只说我们用到的配置。
配置文件的名字为book.json。
内容如下：
~~~
{
    "language": "zh-hans”, // 标记当前文档语言
    "title": "HMS-iOS SDK 使用说明文档”, // 标记当前文档标题
    "author":"ThoughtWorks”, //文档作者
    "pdf": {
        "fontSize": 8, // 标记当前文档字体大小
    }
}
~~~
