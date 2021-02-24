---
layout: post  
title:  "SwiftUI的CSS"  
date:   2021-02-23 17:44:28
comments: ture
categories: Notes  
tags: [SwiftUI]  
---

CSS 相信很多前端开发者都很熟悉，全称为`Cascading Style Sheets`, 层叠样式表。

在2019年，Apple 推出SwiftUI后，iOS开发者，也可以在Swift中使用“CSS”了。 这就是SwiftUI中的ViewModifier。

通过ViewModifier， 开发者可以向View添加accessibility的功能，可以调整View和内部元素的样式，布局，可以响应事件，还可以有条件的显示模态视图等。

任何符合View协议的视图，都可以通过ViewModifier来操作。

```swift
Text("Hello, World!")
    .foregroundColor(.red)
```

![02-23-0-1](/assets/images/2021/02-23-0-1.png)

上述代码中`.foregroundColor(.red)`就是一个标准的对ViewModifier的调用，也是对样式的基本操作，具体有哪些操作，可以查看[SwiftUI-Cheat-Sheet](https://github.com/SimpleBoilerplates/SwiftUI-Cheat-Sheet)。

同时呢，ViewModifier也支持链式操作。

```swift
Text("Title")
    .frame(width: 100)
    .border(Color.gray)
```

![02-23-0-1](/assets/images/2021/02-23-0-2.png)

```swift
Text("Title")
    .border(Color.gray)
    .frame(width: 100)
```



![02-23-0-1](/assets/images/2021/02-23-0-4.png)

 这里要注意，和CSS不同的是，ViewModifier的调用顺序，会影响到最终样式的呈现。

为什么会有这样的现象呢？ 

要回答这个问题，首先就要来看看，怎么自定义实现一个ViewModifier。

```swift
struct BlueTitle : ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.title)
            .foregroundColor(.blue)
    }
}

extension View {
    func blueTitle() -> some View {
        self.modifier(BlueTitle())
    }
}

struct ContentView: View {
    var body: some View {
        Text("Hello World")
            .blueTitle()
    }
}
```

![02-23-0-1](/assets/images/2021/02-23-0-5.png)

上述代码，描述了如何自定义一个名为BlueTitle的struct， 作用是改变content中所有的元素样式，改为title的大小，并且将颜色改为蓝色。这里我们注意到，BlueTitle 遵循了ViewModifier的协议。并返回了`some View`。 所以ViewModifier实际返回的是一个已经应用了具体配置的View，而不是一个可以在某一范围内全局应用的配置表。理解了这一点，也就能理解，为什么改变了顺序，就改变了视图呈现的结果。

和CSS一样，父元素ViewModifier的作用，是可以被子元素覆盖的。

```swift
VStack {
    Text("Title")
        .font(.title) // Override the font of this view.
    Text("First body line.")
    Text("Second body line.")
}
.font(.body) 
```

![02-23-0-1](/assets/images/2021/02-23-0-0.png)

在上面的例子里，`Title`的样式是`.title`，而不是`.body`。

当然，ViewModifier也不是都能覆盖的。

在这里要注意的是，如果某个View被通用修饰符（ViewModifier）修饰后，就不能再使用特定的修饰符了。

```swift
Text("Hello, world!")
    .padding()
    .bold() 
```

上面就是一个反例，[bold()](https://developer.apple.com/documentation/swiftui/text/bold())是Text的特定修饰符，仅能作用于Text；当Text被`padding()` 修饰后，类型就变成了View，便不能在使用`.bold() `进行修饰了。 如果一定要用，那就需要将两个调用顺序做个调整。

参考：

[Configuring Views](https://developer.apple.com/documentation/swiftui/configuring-views)

[SwiftUI-Cheat-Sheet](https://github.com/SimpleBoilerplates/SwiftUI-Cheat-Sheet)

[bold()](https://developer.apple.com/documentation/swiftui/text/bold())

