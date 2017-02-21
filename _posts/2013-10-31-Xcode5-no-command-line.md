---
layout: post
title: "新装的Xcode5没有command line的问题"
description: ""
categories: CodeArtisan
tags: [iOS, Xcode]
---

今天手贱，不小心把Xcode5给删掉了。 没办法只能重新安装。  
结果新安装的Xcode5没有command line工具，没有办法只能找找看怎么能搞到。  
在[这里](http://stackoverflow.com/questions/19066647/xcode-5-0-error-installing-command-line-tools)找到我想要的东西了。

打开terminal， 然后输入 "xcode-select --install"。回车后，就会能看到让你安装新程序的提示了。

11月11日更新：

command line tools工具安装成功后，新的问题又出来了。  

因为项目进度的缘故，我旧有的项目需要使用iOS6.1的SDK build并且发布。  
我在公司的一个旧设备上找到了该SDK。  
拷贝到目录 /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs 下后进行build。
仍然显示找不到command line tools， 这时，我只能分析另一个错误提示，<Availability.h> not found。
这次是在cocoa上找到的，说因为所有的 framework 里都没有.h文件，确实如此，原先的sdk文件包存在问题。

于是我只能从新下载一个xcode的包了，因为这边连接苹果的服务器速度很低，所以我在[百度云盘](http://pan.baidu.com/share/link?shareid=4284185897&uk=1057836303&fid=3010969575)上下了一个。

解开文件包，找到了我想要的iOS 6.1的SDK，重新放到 /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs 这个目录下，问题解决了。

为了帮助，遇到同样问题的开发同仁们，我把iOS 6.1 的SDK 放到[百度云盘](http://pan.baidu.com/s/1vJBie)上了。大家可以直接下载，不需要去下载那个1.9G的大文件包了。

