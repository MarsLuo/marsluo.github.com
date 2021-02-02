---
layout: post  
title:  "SwiftUI 笔记"  
date:   2021-02-02 15:40:13
comments: ture
categories: tips  
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