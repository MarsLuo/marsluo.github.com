---
layout: post
title:  "怎么辨别并移除iOS用户输入的emoji表情"
date:   2014-08-11 18:00:00
categories: tips
tags: [iOS]
---

今天有个业务需求，要求识别并屏蔽项目中所有的emoji表情输入。  

首先我们要解决识别的问题，emoji表情实际上也是文字，只不过他是一种特殊的unicode编码。
我们需要使用下面的方式来，判断是否是emoji字符。

	- (BOOL)isEmoji {
    	BOOL returnValue = NO;
    	const unichar hs = [self characterAtIndex:0];
    	// surrogate pair
    	if (0xd800 <= hs && hs <= 0xdbff) {
        	if (self.length > 1) {
            	const unichar ls = [self characterAtIndex:1];
            	const int uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
            	if (0x1d000 <= uc && uc <= 0x1f77f) {
                	returnValue = YES;
            	}
        	}
    	} else if (self.length > 1) {
        	const unichar ls = [self characterAtIndex:1];
        	if (ls == 0x20e3) {
            	returnValue = YES;
        	}
        	if (ls == 0xfe0f) {
            	if (hs == 0x203c || hs == 0x2049 || hs == 0x231a || hs == 0x231b || 
            	hs == 0x24c2 || hs == 0x2934 || hs == 0x2935 || hs == 0x303d || 
            	hs == 0x3297 || hs == 0x3299) {
                	returnValue = YES;
            	}else if (hs >= 0x2139 && hs <= 0x21aa){
                	returnValue = YES;
            	}else if (hs >= 0x25aa && hs <= 0x27a1 ){
                	returnValue = YES;
            	}else if (hs >= 0x2b05 && hs <= 0x2b55 ){
                	returnValue = YES;
            	}
        	}
        
    	} else {
        	// non surrogate
        	if (0x2100 <= hs && hs <= 0x27ff) {
            	returnValue = YES;
        	} else if (0x2B05 <= hs && hs <= 0x2b07) {
            	returnValue = YES;
        	} else if (0x2934 <= hs && hs <= 0x2935) {
            	returnValue = YES;
        	} else if (0x3297 <= hs && hs <= 0x3299) {
            	returnValue = YES;
        	} else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 || 
        	hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b || hs == 0x2b50) {
            	returnValue = YES;
        	}
    	}
    	return returnValue;
	}

因为emoji的编码存在于多个区间内，所以才有了这样的笨办法。


知道如何判断emoji表情后，我们还需要屏蔽所有的输入。

这边需要屏蔽两个地方的输入。一个是从表情键盘的输入；另外一个从普通键盘中输入的时候，iOS会智能的判断你可能要输入的emoji表情，并给你提示出来。

关于屏蔽直接由表情键盘的输入：

	- (BOOL)textField:(UITextField *)textField
	shouldChangeCharactersInRange:(NSRange)range
	replacementString:(NSString *)string
	{
    	if ([string isIncludingEmoji]) {
        	return NO;
    	}
    	return YES;
	}


关于屏蔽从普通键盘中输入的时候，iOS的智能判断和复制粘贴的变化：  
首先要在需要使用的地方注册通知`UITextFieldTextDidChangeNotification`, 然后在相应的通知方法里进行处理。

我在下面有一个[Demo](https://github.com/MarsLuo/RemoveEmoji)，大家感兴趣可以去看下。


另外非常感谢[woxtu](https://github.com/woxtu/NSString-RemoveEmoji)，我的demo是在他的基础上做调整的。
