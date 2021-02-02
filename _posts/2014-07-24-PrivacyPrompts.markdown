---
layout: post
title:  "如何自定义隐私提醒"
date:   2014-07-24 18:00:00
categories: Notes
tags: [iOS]
---

最近有同事问我，他发现微信在用户关闭地理位置定位的时候，会给用户一个提示。  
![微信提示图片](/assets/images/2014-07-24-01.png)

那么我们怎么定义这个提示呢？  
Apple给了我们[答案](https://developer.apple.com/library/ios/samplecode/PrivacyPrompts/Introduction/Intro.html#//apple_ref/doc/uid/DTS40013410)。 

这个例子告诉我们，我们可以通过在Info.plist里定义相关的字段，来自定义请求用户打开隐私选项时的提示。

以下是相关的字段和描述。  
NSCalendarsUsageDescription  = "日历相关的描述";  
NSRemindersUsageDescription = "提醒事项相关的描述";  
NSPhotoLibraryUsageDescription = "照片库相关的描述";  
NSContactsUsageDescription = "联系人相关的描述";  
NSLocationUsageDescription = "定位服务相关的描述";  
NSMicrophoneUsageDescription = "请求麦克风的描述";  
NSMotionUsageDescription = "请求读取运动处理器相关的描述";  

具体哪些Key我们可以在这里定义，详见[这个文档](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html)。

另外关于这个问题，leisurehuang34也在[他的博客](http://blog.sina.com.cn/s/blog_8280f5ec0102uy9m.html)里写的很清楚了。
