---
layout: post
title:  "iOS开发中限制TextField只能输入数字和限制输入长度的办法"
date:   2014-07-31 18:00:00
categories: Tips
tags: [iOS]
---

iOS开发中限制TextField只能输入数字和限制输入长度的办法：
	
	- (BOOL)textField:(UITextField *)textField 
	shouldChangeCharactersInRange:(NSRange)range 
	replacementString:(NSString *)string{
    
    	// Check for non-numeric characters
    	NSUInteger lengthOfString = string.length;
    	for (NSInteger loopIndex = 0; loopIndex < lengthOfString; loopIndex++) {
        	unichar character = [string characterAtIndex:loopIndex];
        	if (character < 48) return NO; // 48 unichar for 0
        	if (character > 57) return NO; // 57 unichar for 9
    	}
    
    	// Check for total length
    	NSUInteger proposedNewLength = 
    	textField.text.length - range.length + string.length;
    	
    	if (proposedNewLength > 11)
        	return NO;//限制长度
        	
    	return YES;
	}
	
	
摘自[CSDN](http://blog.csdn.net/hintcnuie/article/details/17331971)