---
layout: post  
title:  "使用CocoaPods来开发并打包静态库的总结"  
date:   2015-04-25 13:48:40  
categories: 工匠梦  
tags: [iOS, CocoaPods]  
---

作为一个新时代的iOS开发人员，能够科学使用CocoaPods来管理自己项目的集成和依赖，已经是一项必不可少的技能了。

最近因为项目需要，我需要开发一个SDK，并将其打包为静态链接库或者framework供其他项目的小伙伴们使用。
因为我自己的项目和公司的项目都是使用CocoaPods来进行管理的，而我在SDK开发中，也需要使用到CocoaPods来管理项目，避免重复依赖等问题。

参照brycezhang的[使用CocoaPods开发并打包静态库](http://www.cnblogs.com/brycezhang/p/4117180.html)这篇文章，我完成了一些初始工作，但是遇到了很多问题，导致打出来的静态库，没有办法编译，现在将这些问题总结一下。

###在打包之前请务必用`pod lib lint`命令检查下，自己的项目有没有问题。    
我之前就是花了很多时间打包，重试，找问题，但是都找不到点上，使用`pod lib lint` 命令检查后，迅速发现了自己的问题之所在。顺利的完成了打包的工作。    

###其实绝大多数问题都是因为podspec文件写的有问题导致的。 
   
#### 1. 需要把项目所有的一级依赖全都写在podspec文件里，我在项目用到了4个第三方库，所以就需要把这四个都列出来。   
 
	s.dependency 'Mantle'	
	s.dependency 'AFNetworking'
	s.dependency 'JSONFunction'
	s.dependency 'FMDB'

#### 2.需要把项目中所有的依赖到的frameworks和libraries都标注清楚：

	s.frameworks = 'CoreTelephony', 'MobileCoreServices', 'SystemConfiguration'
	s.libraries = 'sqlite3'

#### 3. 需要引用到的libraries中，没必要写原名，比如libsqlite3，写sqlite3即可。

#### 4. 项目中，如果有引用到第三方的头文件，请一定要把这个文件封闭起来，仅暴露需要使用的头文件。如果项目中不打算暴露的头文件，请不要再暴露的文件中引用。

	s.public_header_files = 'Pod/Classes/TJMessage.h', 'Pod/Classes/TJMessageSDK.h', 'Pod/Classes/TJMessageSDKDBManager.h', 'Pod/Classes/TJMessageSDKObject.h'


#### 5. `pod package` 命令会帮我们做重复引用时，对重复引用的库名进行重新编码，不会有重名问题。
但是我们自己在命名时，一定要注意，带上前缀，这样才不会和其他项目进行重名。    

#### 6 .执行Demo   

	pod lib lint TJMessage.podspec --verbose
	pod package TJMessage.podspec    
	