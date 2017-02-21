---
layout: post
title:  "在iOS上如何正确的调整键盘和输入框的距离"
date:   2014-06-06 11:25:50
categories: CodeArtisan
tags: [iOS]
---
在做iOS开发时，经常会用到键盘。  
而用到键盘时，经常会碰到因为键盘出现，而需要调整输入框位置的情况。  

[How to make a UITextField move up when keyboard is present](http://stackoverflow.com/questions/1126726/how-to-make-a-uitextfield-move-up-when-keyboard-is-present)

[KeyboardManagement by Apple](https://developer.apple.com/library/ios/documentation/StringsTextFonts/Conceptual/TextAndWebiPhoneOS/KeyboardManagement/KeyboardManagement.html)

上面这问题，很多事情都讲得很清楚了。有时间的话，我整理下，上面这篇回答吧。

根据苹果官方的建议，我们可以这么写。

####注册相应的通知
一般情况下，我们应该使用苹果给我们提供的`UIKeyboardDidShowNotification`和`UIKeyboardWillHideNotification`通知。

	- (void)registerForKeyboardNotifications
	{
    	[[NSNotificationCenter defaultCenter] addObserver:self
            selector:@selector(keyboardWasShown:)
            name:UIKeyboardDidShowNotification object:nil];
            
        [[NSNotificationCenter defaultCenter] addObserver:self
             selector:@selector(keyboardWillBeHidden:)
             name:UIKeyboardWillHideNotification object:nil];
 
	}
	
	- (void)unregisterForKeyboardNotifications
	{
    	 [[NSNotificationCenter defaultCenter] removeObserver:self];
	}
	
####做出相应的响应
根据不同的通知，做出不同的相应。

	- (void) keyboardWasShown:(NSNotification *) notification
	{
		// 在此处填代码
	}
	- (void) keyboardWillBeHidden:(NSNotification *) notification
	{
    	//	在此处填代码
	}
	
####获取激活的控件
有时候，一个VC里可能有多个控件可以弹出键盘。所以需要我们声明一个中间变量来了解当前是哪一个控件被激活。

	- (void)textFieldDidBeginEditing:(UITextField *)textField
	{
    	activeField = textField;
	}
 
	- (void)textFieldDidEndEditing:(UITextField *)textField
	{
    	activeField = nil;
	}
	
####在tableView中

如果我们在开发过程中用的是`UITableViewController`的话，相应的控件动作，会为我们做好。  
我们也可以直接使用这句来让键盘消失。

	[self.view endEditing:YES];
	
	
我们也可以参考苹果的相关[例程](https://developer.apple.com/library/ios/samplecode/KeyboardAccessory/Introduction/Intro.html)。