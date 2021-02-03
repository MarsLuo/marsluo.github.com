---
layout: post  
title:  "Swift 中 Dictionary 的默认值"  
date:   2021-01-18 16:52:53 
comments: ture
categories: Tips  
tags: [Swift, Tips]  
---

```
let planets = [1: "Mercury", 2: "Venus"]
let venus = planets[2, default: "Planet X"]
```

今天发现一个新的知识点。 Swift 的 Dictionary 在取值时，可以加默认值。就像上面这样。

大概类似于:

```
let venus = planets[2] ?? "Planet X"

```
 