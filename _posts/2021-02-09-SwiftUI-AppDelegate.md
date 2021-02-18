---
layout: post  
title:  "AppDelegate去哪里了？"  
date:   2021-02-09 14:07:20
comments: ture
categories: Notes  
tags: [SwiftUI]  
---

日落西沉，我又一次打开的熟悉的Xcode，熟悉的创建了一个新的应用，开始了新的学习之旅。  
当窗口顺利的加载结束后，我正准备开始进行功能的编写。

突然，神奇的事情发生了！
我发现熟悉的AppDelegate不见了！没有地方构建KeyWindow，没有地方放置各种App的回调，只有简单的几行代码静静地站在那里，面对我这个不速之客，不知所措。

我熟悉的AppDelegate去哪里了？ 你们是谁，怎么来这里的，是AppDelegate的大表哥吗？

```swift
@main
struct SwiftUIAppApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

经过一番攀谈交心，我才知道，这哥们叫 SwiftUIAppApp（项目名称）， 是SwiftUI部门的，平时的行为规范是App， body是他们的工装，出门就得穿，这工装也是有规范的，这规范叫Scene。 我原来熟悉的UIKit，AppKit，已经退居二线了，Apple正计划让他们退休呢。这App啊，顶的就是UIApplicationDelegate的班。

我前两天见的AppDelegate大概长这个样子：

```swift
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }
}
```

这里面就@main的注解，标志应用程序开始之外，没一个地方一样的。 这可如何是好？怎么样才能找回我熟悉的老伙计，愉快的开始今天旅程呢？

又经过一番攀谈交心，SwiftUIApp告诉我，他们也可以按照UIApplicationDelegate的方式来工作，只不过需要我额外做一点工作。

大概是这样子的：

```swift
import SwiftUI

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        print("log-didFinishLaunching")
        return true
    }
    func applicationDidReceiveMemoryWarning(_ application: UIApplication) {
        print("log-DidReceiveMemoryWarning")
    }
}

@main
struct SwiftUIAppApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

我看了下，那大概就是需要声明一个符合UIApplicationDelegate协议的类，然后使用@UIApplicationDelegateAdaptor的注解标记该类即可。

搞定了！

我又开始了愉快的旅程。

---

你以为到这里就结束了吗？ 

不，还没有。

这个在SwiftUI上桥接UIKit代理方法有问题啊，只有部分代理可以使用。有一部分设计应用程序前后台切换的代理方法，就没有回调发生了。比如 applicationDidBecomeActive， applicationDidEnterBackground等等，这又是为啥？

再经过一番攀谈交心，他告诉我，之前Window那一套，已经不管用了，现在得用Scene。说着，甩出了一份[文档](https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle)：

```
When your app’s state changes, UIKit notifies you by calling methods of the appropriate delegate object:
In iOS 13 and later, use UISceneDelegate objects to respond to life-cycle events in a scene-based app.
In iOS 12 and earlier, use the UIApplicationDelegate object to respond to life-cycle events.

Note
If you enable scene support in your app, iOS always uses your scene delegates in iOS 13 and later. In iOS 12 and earlier, the system uses your app delegate.
```

哦，这文档说的是，iOS13以前，由UIApplicationDelegate来控制声明周期，iOS13以后，由UISceneDelegate来控制声明周期。在iOS 13之后，用UIScene替代了之前UIWindow来管理视图。主要是为了解决iPadOS展示多窗口的问题。

在iOS 14之后，Apple又给SwiftUI提供了更优雅的API来显示和控制Scene。所以控制应用展示可以这样：

```swift
@main
struct SwiftUIAppApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    @Environment(\.scenePhase) var scenePhase
    var body: some Scene {
        WindowGroup {
            ContentView()
        }.onChange(of: scenePhase) { newScenePhase in
            switch newScenePhase {
            case .active:
              print("应用启动了")
            case .inactive:
              print("应用休眠了")
            case .background:
              print("应用在后台展示")
            @unknown default:
              print("default")
            }
        }
    }
}
```

另外：openURL，userActivity等可以直接挂在某一个具体的View上，来进行单独处理，不需要再通过AppDelegate中转了。

这下就搞定了，又可以开始我愉快的旅程了。

结论：

1. 在iOS13后，Scene取代了Window，来做视图的管理和呈现。
2. 在SwiftUI中，可以控制场景的切入，切出（取代applicationDidBecomeActive，applicationWillResignActive， applicationDidEnterBackground）。openURL，userActivity等事件。
3. SwiftUI现在还无法处理applicationDidReceiveMemoryWarning，applicationWillTerminate等回调，需要通过@UIApplicationDelegateAdaptor的方式来实现。

---

备注：SwiftUI 是 Apple 在2019年 WWDC 上发布的一款声明式的UI框架。该框架适用于Apple 全生态，包括 iOS， iPadOS，macOS等；旨在取代AppKit和UIKit等传统UI开发框架。

参考： 

1. https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle
2. https://www.donnywals.com/understanding-the-ios-13-scene-delegate/
3. https://www.donnywals.com/adding-support-for-multiple-windows-to-your-ipados-app/