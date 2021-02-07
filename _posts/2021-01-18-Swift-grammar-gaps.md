---
layout: post  
title:  "Swift Grammar Gaps"  
date:   2021-01-18 16:52:53 
comments: ture
categories: Tips  
tags: [Swift, Tips]  
---

### 1. Swift 中 Dictionary 的默认值

```
let planets = [1: "Mercury", 2: "Venus"]
let venus = planets[2, default: "Planet X"]
```

Swift 的 Dictionary 在取值时，可以加默认值。就像上面这样。

大概类似于:

```
let venus = planets[2] ?? "Planet X"

```
 
### 2. Swift Switch 的fallthrough

```
switch weather {
case "rain":
    print("Bring an umbrella")
case "snow":
    print("Wrap up warm")
case "sunny":
    print("Wear sunscreen")
    fallthrough
default:
    print("Enjoy your day!")
}
// will print "Enjoy your day!"
```

Swift 的 Switch 语句，如果希望当前case执行完后，还希望继续执行，就像C中的switch语句一样， 就可以用fallthrough来标记。

### 3. 循环标记

在Swift中，break只能退出单个循环，想退出多个循环怎么办呢？可以给某个循环以标记，可以使用break语句退出该循环。

```
outerLoop: for i in 1...10 {
    for j in 1...10 {
        let product = i * j
        print ("\(i) * \(j) is \(product)")

        if product == 50 {
            print("It's a bullseye!")
            break outerLoop
        }
    }
}
```


