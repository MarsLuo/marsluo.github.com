---
layout: post  
title:  "Swift Switch 的fallthrough"  
date:   2021-01-21 11:33:49
comments: ture
categories: Tips  
tags: [Swift, Tips]  
---

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

今天发现一个新的知识点。 Swift 的 Switch 语句，如果希望当前case执行完后，还希望继续执行，就像C中的switch语句一样， 就可以用fallthrough来标记。
 