---
layout: post
title:  "iOS平台处理通话时，对UI的影响"
date:   2014-08-07 18:00:00
categories: 工匠梦
tags: [Jekyll]
---

在iOS平台上，如果我们定制了自己的控件，在打电话的时候，很有可能影响到我们的控件的位置。  
对于这种情况，苹果也给我们提出了解决方案：


####使用AppDelegate的代理方法。  
 
	-(void)application:(UIApplication *)application 
	willChangeStatusBarFrame:(CGRect)newStatusBarFrame;
	
####使用系统的通知。
  
	UIApplicationWillChangeStatusBarFrameNotification
	
	
系统会在StatusBar的高度发生变化的时候，系统会调用如上的方法或者通知，我们可以在相关的方法里进行处理。