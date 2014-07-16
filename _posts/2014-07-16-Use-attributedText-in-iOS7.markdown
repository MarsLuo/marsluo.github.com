---
layout: post
title:  "在iOS7中使用html来做图文混排"
date:   2014-07-16 18:00:00
categories: 工匠梦
tags: [iOS]
---

在iOS开发中，不可避免的要用到图文混排的技术，那在iOS7里，为我们全面提供了图文混排的技术，我们不在需要使用CoreText在哪里苦苦的Coding了。  
更好的消息是，我们可以使用HTML来完成我们的文字排版。当发现这个功能的时候，我无疑是非常激动的。  
然后我就用开发中最常见的形式，聊天文字和表情的形式来试一下这个新功能。

我这里接触到的[Demo](http://image.data.weipan.cn/41210995/1d7ab6ca33b1217cafc2edc06c0c736fbe8b86ea?ssig=457rEpfno8&Expires=1405447200&KID=sae,l30zoo1wmz&fn=attributeString.zip)为tabao的jason写的。感谢jason。

jason的demo为：

	NSURL *url = [[NSBundle mainBundle] URLForResource:@"text" withExtension:@"html"];
    NSAttributedString *attrStr = [[NSAttributedString alloc]
                                   initWithFileURL:url
                                   options:@{NSDocumentTypeDocumentAttribute:NSHTMLTextDocumentType}
                                   documentAttributes:nil error:nil];
    [_textView setAttributedText:attrStr];


HTML文件为：

	<meta charset="UTF-8">
	<div style="background-color:lightgrey;
    font-size:14px;
    color:#304182;
    text-align:center; 
    margin-left:5px;
    padding-right:5px">
	<p>Hi
		<span style="font-size:18px; color:#E88834;">
			Taobao
		</span>
        
		<img src="hufeng.png" height="32" width="32" />
        <p> 静态图片
		<img src="taobao.gif" height="32" width="52">
        <p> 动态图片
	</p>
	</div>

我们可以看到代码非常简单，但是功能却很强大。苹果的工程师在背后帮我们做了很多事情。  

但是我们在开发过程中直接加载资源里的HTML文件的情况可能会比较少。我们手动生成动态的HTML代码的情况会比较多。  

`NSAttributedString` 为我们提供了另外一种加载html代码的方式。  

`- (id)initWithData:(NSData *)data options:(NSDictionary *)options documentAttributes:(NSDictionary **)dict error:(NSError **)error` 我们可以通过这个方法来加载我们生成的HTML代码。

但是加载图片的时候，却出现了大问题，我实验了各种方式，始终没有办法把使用我们生成的HTML代码来正确的加载图片。  
最开始我以为是html代码格式的问题后来发现，**我们并不需要使用标准的DOM结构，几个标签也可以成功加载**。  
但是仍然没有解决我的问题。

然后我又分析了NSAttributedString的具体结构，发现这里面有一个`NSTextAttachment`，了解了CoreText的知识我发现，`NSTextAttachment`正是我们加载图片的关键。  
在没能成功加载图片的NSAttributedString里，是没有NSTextAttachment的。
说明路径有问题！！

然后我把路径给为绝对路径，又试了一次，还是不行。  

我看了下其他人在使用CoreText的时候，加载的路径，才发现自己到底那里出错了。  
没有加`file://`!!

加上`file://`就可以正常显示了。

	NSString *path = [[NSBundle mainBundle] pathForResource:@"expression_first_1@2x" ofType:@"png"];
    path = [NSString stringWithFormat:@"file://%@",path];
    
    NSString *dataString =     [NSString stringWithFormat:@"<meta charset=\"UTF-8\">我右边的是图片:<img src=\"%@\" height=\"15\" width=\"15\"/>:我左边的也是图片", path];

    NSAttributedString *attrStr = [[NSAttributedString alloc]
                   initWithData:[dataString dataUsingEncoding:NSUTF8StringEncoding]
                   options:@{NSDocumentTypeDocumentAttribute:NSHTMLTextDocumentType}
                   documentAttributes:nil error:nil];

