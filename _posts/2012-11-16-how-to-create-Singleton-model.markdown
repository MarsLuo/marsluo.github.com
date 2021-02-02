---
layout: post
title:  "iOS 创建单例的两种方法"
date:   2012-11-16 14:58:43
categories: tips
tags: [iOS]
---

创建一个单例很多办法。我先列举一个苹果官方文档中的写法。

	static AccountManager *DefaultManager = nil;  
   
	+ (AccountManager *)defaultManager {  
    	if (!DefaultManager) DefaultManager = [[self allocWithZone:NULL] init];  
    	return DefaultManager;  
	}  
	
当然，在iOS4之后有了另外一种写法：

	+ (AccountManager *)sharedManager  
	{  
        static AccountManager *sharedAccountManagerInstance = nil;  
        static dispatch_once_t predicate;  
        dispatch_once(&predicate, ^{  
                sharedAccountManagerInstance = [[self alloc] init];   
        });  
    	return sharedAccountManagerInstance;  
	}  
	
该写法来自 objcolumnist，文中提到，该写法具有以下几个特性：
 
1. 线程安全。
2. 满足静态分析器的要求。
3. 兼容了ARC

然后我还有点好奇的是dispatch_once,这个函数，没见过啊。  
于是就到官方的文档里找找看，是怎么说的。  
下面是官方文档介绍：  
 
#####dispatch_once  
Executes a block object once and only once for the lifetime of an application.  
  void dispatch_once(  
    dispatch_once_t *predicate,  
    dispatch_block_t block);  
    
#####Parameters
predicate  
A pointer to a dispatch_once_t structure that is used to test whether the block has completed or not.  
block  
The block object to execute once.  
#####Discussion  
This function is useful for initialization of global data (singletons) in an application. Always call this function before using or testing any variables that are initialized by the block.  
If called simultaneously from multiple threads, this function waits synchronously until the block has completed.  
The predicate must point to a variable stored in global or static scope. The result of using a predicate with automatic or dynamic storage is undefined.  
#####Availability
Available in iOS 4.0 and later.  
######Declared In
dispatch/once.h  

我们看到，该方法的作用就是执行且在整个程序的声明周期中，仅执行一次某一个block对象。简直就是为单例而生的嘛。而且，有些我们需要在程序开头初始化的动作，如果为了保证其，仅执行一次，也可以放到这个dispatch_once来执行。  
然后我们看到它需要一个断言来确定这个代码块是否执行，这个断言的指针要保存起来，相对于第一种方法而言，还需要多保存一个指针。  

方法简介中就说的很清楚了：对于在应用中创建一个初始化一个全局的数据对象（单例模式），这个函数很有用。  
如果同时在多线程中调用它，这个函数将等待同步等待，直至该block调用结束。  
这个断言的指针必须要全局化的保存，或者放在静态区内。使用存放在自动分配区域或者动态区域的断言，dispatch_once执行的结果是不可预知的。  


总结：  
1. 这个方法可以在创建单例或者某些初始化动作时使用，以保证其唯一性。  
2. 该方法是线程安全的，所以请放心大胆的在子线程中使用。（前提是你的dispatch_once_t *predicate对象必须是全局或者静态对象。这一点很重要，如果不能保证这一点，也就不能保证该方法只会被执行一次。）