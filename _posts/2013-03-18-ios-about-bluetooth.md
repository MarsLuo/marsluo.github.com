---
layout: post
title: "iOS 关于蓝牙开发的相关知识"
description: ""
categories: Tips
tags: [iOS, buletooth]
---

#### 苹果的蓝牙支持哪些协议？
参考这个[link](http://support.apple.com/kb/HT3647?viewlocale=zh_CN) 不同的设备支持的协议不同。


#### 开发配件是是否需要使用加密芯片？  
同样的link下面有 这样一行字  
注：iOS 需要远程蓝牙设备支持加密连接。在 iOS 设备和蓝牙设备之间建立配对记录时，还应在两台设备之间设置加密。注：iOS 需要远程蓝牙设备支持加密连接。在 iOS 设备和蓝牙设备之间建立配对记录时，还应在两台设备之间设置加密。  

#### 用哪几个通道和蓝牙配件通信。
参见上述link。


#### 如果需要开发或者制造相关的蓝牙设备，可能需要申请MFI证书。
详见 这个[link](http://mfi.apple.com/faqs)


#### 但是如果只是打算开发相关的APP，则不需要加入MFI。
开发APP时，所有的资料都在[External Accessory Framework Reference](https://developer.apple.com/library/ios/#documentation/ExternalAccessory/Reference/ExternalAccessoryFrameworkReference/_index.html)
和 [External Accessory Programming Topics](https://developer.apple.com/library/ios/#featuredarticles/ExternalAccessoryPT/Introduction/Introduction.html#//apple_ref/doc/uid/TP40009502)中。 

#### 关于蓝牙4.0的区别  
可以参见[维基百科](http://zh.wikipedia.org/wiki/%E8%97%8D%E7%89%99)  和 [蓝牙3.0和蓝牙4.0的区别](http://www.52solution.com/basic/1424)


iPhone 4s 以上支持4.0 iPad 3.0以上 iPad Mini 及以上版本 支持 蓝牙4.0协议 