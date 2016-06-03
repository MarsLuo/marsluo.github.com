---
layout: post  
title:  "如何使用Cocoapod 构建模块化项目"  
date:   2016-05-31 11:37:07
categories: 工匠梦  
tags: [iOS, Tips]  
---

随着项目人数的增多，我们对构建模块化项目的需求也越来越强烈。  
鉴于此，需要将我们的项目模块化。  
但因为还需要支持iOS7，所以不能选用Carthage等支持动态框架的依赖管理器，所以仍旧采用了 Cocoapod 来完成这一工作，希望2016的WWDC之后，有更好的依赖管理器吧。

##模块化项目的构建思路基本清晰：  
1. 将整个项目按照业务，工具和基础支撑分为三类。基础支撑不依赖任何模块。工具有可能依赖基础支撑。业务依赖于工具和基础支撑。  
2. 每一个业务都有一个壳工程，壳工程可以独立运行。
3. 在壳工程联调结束后，会集成至主工程中，进行集成测试。

##操作步骤：
以下操作步骤基于Cocoapod 1.0.0

1. 构建主项目。  
	使用xcode创建一个新项目。因为项目和人员的问题，暂时不采用Swift来构建项目。我们仍然使用Objc。我们以往的项目风格是使用xib来完成项目主要的视图部分。  
	所以删除了Main.storyboard,和Info.plist里对应的条目。  
	为了验证我们的项目是OK的。我写了以下代码： 
	 
	```  
    UIWindow *rootWindow = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    UITabBarController *tabbarVc = [[UITabBarController alloc] init];
    
    UIViewController *buleVc = [[UIViewController alloc] init];
    buleVc.title = @"Bule";
    [buleVc.view setBackgroundColor:[UIColor blueColor]];
    
    UIViewController *redVc = [[UIViewController alloc] init];
    redVc.title = @"Red";
    [redVc.view setBackgroundColor:[UIColor redColor]];
    
    UINavigationController *bNavController = [[UINavigationController alloc] initWithRootViewController:buleVc];
    UINavigationController *rNavController = [[UINavigationController alloc] initWithRootViewController:redVc];
    
    [tabbarVc setViewControllers:@[bNavController, rNavController]];
    self.window = rootWindow;
    [rootWindow setRootViewController:tabbarVc];
    [rootWindow makeKeyAndVisible];  
    ```
	
2. 然后我们需要构建一个业务项目，来作为我们依赖的示例。  
   1. 构建一个私有的Pod。
   		在命令行里输入命令：   
   		`pod lib create MyLibrary`  
   		
   		bash里面会出现以下Log：
   		
   		```   
   		Cloning `https://github.com/CocoaPods/pod-template.git` into `DemoLib`.
   		Configuring DemoLib template. 
   		------------------------------  
   		To get you started we need to ask a few questions, this should only take a minute.

		If this is your first time we recommend running through with the guide: 
 - http://guides.cocoapods.org/making/using-pod-lib-create.html
 ( hold cmd and double click links to open in a browser. )


		What language do you want to use?? [ Swift / ObjC ]
		> ObjC

		Would you like to include a demo application with your library? [ Yes / No ]
		> Yes

		Which testing frameworks will you use? [ Specta / Kiwi / None ]
		 > None

		Would you like to do view based testing? [ Yes / No ]
		> No

		What is your class prefix?
		> ZL

		Running pod install on your new library.

		Analyzing dependencies
		Fetching podspec for `DemoLib` from `../`
		Downloading dependencies
		Installing DemoLib (0.1.0)
		Generating Pods project
		Integrating client project

		[!] Please close any current Xcode sessions and use 		`DemoLib.xcworkspace` for this project from now on.
		Sending stats
		Pod installation complete! There is 1 dependency from the Podfile and 1 total pod installed.

		 Ace! you're ready to go!
		 We will start you off by opening your project in Xcode
		  open 'DemoLib/Example/DemoLib.xcworkspace'

		To learn more about the template see `https://github.com/CocoaPods/pod-template.git`.
		To learn more about creating a new pod, see `http://guides.cocoapods.org/making/making-a-cocoapod`.
```
打开DemoLib.xcworkspace，验证一下。 示例应用可以使用，我们来进行下一步。  
因为目前的项目需要支持iOS7，所以我们将最低支持系统设置为iOS7。  
为了让我们对应的依赖可以使用git来管理，我们需要将原有的git文件删除掉。
