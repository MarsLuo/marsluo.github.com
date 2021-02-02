---
layout: post
title: "iOS零碎小知识"
description: ""
categories: tips
tags: [iOS]
---


##### 使应用不会自动锁屏。  

	[UIApplication sharedApplication].idleTimerDisabled=YES;//不自动锁屏
	[UIApplication sharedApplication].idleTimerDisabled=NO;//自动锁屏

##### 程序图标不加高光效果  

iOS程序build到手机上时，默认的桌面图标是有高亮的光圈效果的。如果您要去掉这一高亮特效，可以在程序的 info.plist 设置Icon already includes gloss effects，值设定为YES，默认值是NO。程序上传到App Store 也就不会在图标上添加高亮特效了。  


##### 判断屏幕分辨率  

	BOOL retina = CGSizeEqualToSize(CGSizeMake(640, 960), [[UIScreen mainScreen] currentMode].size);  
	返回true说明当前分辨率是CGSizeMake(640, 960)，false则不是。  


##### 错误警告1

类似这样的错误failed to get the task for process XXX多半是证书问题，project和targets证书都要是可用并且正确的证书才行。

##### 错误警告2  
出现这样的问题Property's synthesized getter follows Cocoa naming convention for returning Property's synthesized getter follows Cocoa naming convention for returning.  
今天早上在整理代码的时候发现了如上警告。  
在网上查询后发现，是因为苹果在新的编码，不推荐变量以new、copy等关键字开头。  
突然想起来之前也有朋友问过类似的问题。特做以记录。  
也希望大家在以后编码的时候，能够多多注意。  

##### 快速获取沙盒路径  

	#define DOCUMENTS_FOLDER [NSHomeDirectory() stringByAppendingPathComponent:@"Documents"]  

##### 判断邮箱是否合法  

	- (BOOL) validateEmail: (NSString \*) candidate {
		NSString *emailRegex = @"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}";
		NSPredicate *emailTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", emailRegex];
		return [emailTest evaluateWithObject:candidate];
	}    

##### 显示网络活动状态  

	UIApplication* app = [UIApplication sharedApplication];  
	app.networkActivityIndicatorVisible = YES; // to stop it, set this to NO  


##### 显示一组连续的图片（类似动画效果）  

	NSArray *myImages = [NSArray arrayWithObjects:
	[UIImage imageNamed:@"myImage1.png"],
	[UIImage imageNamed:@"myImage2.png"],
	[UIImage imageNamed:@"myImage3.png"],
	[UIImage imageNamed:@"myImage4.gif"],nil];  
	UIImageView *myAnimatedView = [UIImageView alloc];
	[myAnimatedView initWithFrame:[self bounds]];  
	myAnimatedView.animationImages = myImages;  
	myAnimatedView.animationDuration = 0.25; // seconds  
	myAnimatedView.animationRepeatCount = 0; // 0 = loops forever  
	[myAnimatedView startAnimating];  
	[self addSubview:myAnimatedView];  
	[myAnimatedView release];  

##### 页面切换效果设置

	controller.modalTransitionStyle = UIModalTransitionStyleCoverVertical;
	[self presentModalViewController:controller animated:YES];

	//可供使用的效果：  	
		UIModalTransitionStyleCoverVertical
		UIModalTransitionStyleFlipHorizontal
		UIModalTransitionStyleCrossDissolve
		UIModalTransitionStylePartialCurl

	//恢复之前的页面：  
		[self dismissModalViewControllerAnimated:YES];


##### 为UIImageView添加单击事件：  

	imageView.userInteractionEnabled = YES;  

	UITapGestureRecognizer *singleTap = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(yourHandlingCode:)];
	[imageView addGestureRecognizer:singleTap];  

##### 获取应用版本  

	NSDictionary *infoDict =[[NSBundle mainBundle] infoDictionary];  
	NSString *versionNum =[infoDict objectForKey:@"CFBundleVersion"];  
	NSString *appName =[infoDict objectForKey:@"CFBundleDisplayName"];    

##### 给图片加圆角

	// 给view 设置圆角
    view.layer.masksToBounds = YES; // 内边界切割
    view.layer.cornerRadius = 6.0; // 圆角弧度
    view.layer.borderWidth = 1.0; // 边界宽度
    view.layer.borderColor = [[UIColor whiteColor] CGColor];  // 边界颜色

##### 键盘弹出，但无法输入
	// 有可能是键盘所在的window不是当前的key window
	if (!m_searchBar.window.isKeyWindow){
        [m_searchBar.window makeKeyAndVisible];
    }
