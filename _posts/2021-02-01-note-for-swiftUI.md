---
layout: post  
title:  "SwiftUI 笔记"  
date:   2021-02-02 15:40:13
comments: ture
categories: Tips  
tags: [SwiftUI]  
---

最近在学习SwifUI，发现这个开发的模式，和UIKit相差还是很远的，以下记录一下开发中遇到的问题。


### 1. ForEach中能否使用字典
ForEach中不能使用字典。 如[这条答案](https://stackoverflow.com/a/56675704/2575321)中所说， 字典是无序的。 而在SwiftUI 中，ForEach会监控他使用集合的变化， 包括新增，删除，移动和更新。任何一类变化发生， 都会触发更新。

参见 https://developer.apple.com/videos/play/wwdc2019/204/ at 46:10:

```
A ForEach automatically watches for changes in his collection
```



所以无序组件（包括字典，集合等）是无法在ForEach中使用的，所有需要实时监控的组件（ForEach，List等），应该都无法使用。

那如果想使用怎么办呢？可以参考下面的形式，现将字典有序化，然后再使用。

```swift
let dict = ["a":1,"b":2,"c":3,"d":4]

ForEach(dict.sorted(by: {$0.key > $1.key}), id: \.key) { item in
	Text("\(item.key)")
}
```

### 2. 如何在Picker中使用字典

我们往常使用Picker时，如果需要便利的集合是数组，那可以写作下面这种形式：

```swift
let tipPercentages = [10, 15, 20, 25, 0]
Picker("Tip percentage", selection: $tipPercentage) {
	ForEach(0 ..< tipPercentages.count) {
		Text("\(self.tipPercentages[$0])%")
	}
}
```

但是如果是字典，字典的Key和Value由要怎么体现呢？怎么和Picker形成关联呢？ 大家可以参考以下形式：

```swift
let dict = ["a":1,"b":2,"c":3,"d":4]
Picker("Value", selection: $selection) {
	ForEach(dict.sorted(by: {$0.key > $1.key}), id: \.key) { item in
		Text("\(item.key)").tag(item.value)
	}
}
```

使用tag将对应的指和Picker关联起来。

### 3. View
在SwiftUI中，View不再是一个对象，而是一个协议。任何符合这个协议的结构体，都可以被渲染为屏幕上的视图。 所以我们不能在SwifUI中，直接使用一个View。
modifier 本质上是返回了一个新的View（Struct）。

### 4. Color的本质
Color在SwiftUI中，本质上就是View。 它会像View一样自动占用所有可用空间。也可以用.frame()来改编他的大小。

### 5.  单个叶子节点的数量
在SwiftUI中，单个元素的叶子节点不能多于10个，否则会报错“Extra argument in call”， 如果需要展示多于10个组件，可以使用Group组件。

```
@frozen public struct VStack<Content> : View where Content : View {

    /// Creates an instance with the given spacing and horizontal alignment.
    ///
    /// - Parameters:
    ///   - alignment: The guide for aligning the subviews in this stack. This
    ///     guide has the same vertical screen coordinate for every child view.
    ///   - spacing: The distance between adjacent subviews, or `nil` if you
    ///     want the stack to choose a default distance for each pair of
    ///     subviews.
    ///   - content: A view builder that creates the content of this stack.
    @inlinable public init(alignment: HorizontalAlignment = .center, spacing: CGFloat? = nil, @ViewBuilder content: () -> Content)

    /// The type of view representing the body of this view.
    ///
    /// When you create a custom view, Swift infers this type from your
    /// implementation of the required `body` property.
    public typealias Body = Never
}
```

如上述代码所示，所有的SwiftUI组件在构建时，都会用到ViewBuilder。 ViewBuilder把我们输入的View变成了最终需要绘制的视图。

```
@available(iOS 13.0, macOS 10.15, tvOS 13.0, watchOS 6.0, *)
extension ViewBuilder {

    public static func buildBlock<C0, C1, C2, C3, C4, C5, C6, C7, C8, C9>(_ c0: C0, _ c1: C1, _ c2: C2, _ c3: C3, _ c4: C4, _ c5: C5, _ c6: C6, _ c7: C7, _ c8: C8, _ c9: C9) -> TupleView<(C0, C1, C2, C3, C4, C5, C6, C7, C8, C9)> where C0 : View, C1 : View, C2 : View, C3 : View, C4 : View, C5 : View, C6 : View, C7 : View, C8 : View, C9 : View
}
```
这是ViewBuilder参数最多的一个extension，我们看到，这个只有10个，所以在SwiftUI中，容器类型最多可以放10个View。

### 6. State
State 本质是双向绑定。


参考： 
[SwiftUI之ViewModifier详解](https://zhuanlan.zhihu.com/p/148780922)