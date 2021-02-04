---
layout: post  
title:  "分析iOS Crash 文件"  
date:   2014-06-04 18:00:00  
categories: Log
tags: [iOS]
---

最近在开发的时候，遇到了一个Crash的现象。但是这个现象只能在客户的手机上出现。  
没有办法，只能让客户把相应的Crash Report给我，我再来分析相应的情况。
使用以下的步骤，可以让我们顺利的从Crash Report中分析到相关信息。

## 从手机上获取Crash Report
我们需要拿到用户Crash log。根据系统的不同，有不同的获取办法。  
首先，需要让用户把设备连接上电脑的iTunes，然后做一次同步操作。
在下面的路径里，把相应的Crash文件取出来，发给我们。

####Mac OS X:
~/Library/Logs/CrashReporter/MobileDevice/  
####Windows XP:
C:Documents and Settings<USERNAME>Application DataApple ComputerLogsCrashReporterMobileDevice<DEVICE_NAME>  
####Windows Vista or 7:
C:Users<USERNAME>AppDataRoamingApple ComputerLogsCrashReporterMobileDevice<DEVICE_NAME>  

## 准备好其他的文件
我们使用编辑器打开相应的crash文件，通常只能看到类似汇编语言的代码。这个不利于我们分析情况。所以我们要使用Xcode来帮助我们阅读Crash Report里的信息。  

我们需要准备以下三个文件。  

####crash报告(.crash文件)
通常用户给你的应该是以.crash结尾的文件。不过也有可能是以.ips结尾的文件。我们把他改成.crash就可以用了。  

####符号文件 (.dSYM文件)
这个文件可以从我们本地取到。  
打开Xcode，Organizer->Archives，在左边栏选择你要查看的App，在右侧的列表中选择crash的版本。在版本上右键，点击“Show in Finder”。 我们就找到了相应的Archive文件。在该文件上右键，点击“Show Package Contents”，打开dSYMs文件夹。我们就能看到需要的文件“YourAppName.app.dSYM”了。  

####应用程序文件 (YourAppName.app文件)  
还是在Archive文件里，Products->Applications。我们就能看到需要的YourAppName.app文件了。  
  
我们把这三个文件放到一个目录里面。  
然后再把crash拖到Organizer->Devices->Devices Logs里，稍等片刻，就能看到有详细信息的crash日志了。  
例如：`13  AppName                 	0x000843ce __36-[ContactsViewController enableGUI:]_block_invoke (ContactsViewController.m:137)`，这个让我们可以很快定位到问题在ContactsViewController的enableGUI方法里。  

相关阅读：  
[分析iOS Crash文件：符号化iOS Crash文件的3种方法](http://wufawei.com/2014/03/symbolicating-ios-crash-logs/)  
[iOS应用崩溃日志揭秘](http://www.raywenderlich.com/zh-hans/30818/ios%E5%BA%94%E7%94%A8%E5%B4%A9%E6%BA%83%E6%97%A5%E5%BF%97%E6%8F%AD%E7%A7%98)

