---
layout: post  
title:  "如何编写一个Excel插件"  
date:   2017-02-13 16:38:44  
categories: 工匠梦  
tags: [Excel, Tips]  
---

最近没有上项目，公司安排我们做一个Excel的插件，以前没有做过类似的项目，觉得还蛮有意思的。  
写个小总结，记一下，免得自己以后忘记了。  

### 环境配置  

做开发要做的第一件事情就是搭环境了。  
根据用户需要，我们的依赖环境是Windows 7， Excel 2010。  
在这个基础上，我们还需要安装Visual Studio 2015。  
因为我现在用的是mac，所以现在还需要使用Bootcamp或者虚拟机。在这里我选择的是虚拟机Parallels Desktop，丝滑般享受，你值得拥有。  
步骤：  
1. 依次分别安装好Parallels Desktop、Windows 7和Visual Studio 2015。  
2. 打开Windows的控制面板，检查更新。更新完毕后，重启Windows。 这个过程可能会持续N次，直到检查不到更新为止。  
3. 打开Visual Studio 2015，新建项目->VSTO外接程序。因为用户使用的是Excel 2010，所以这里我们选择Excel 2010 VSTO 外接程序。给项目起个名字，点击创建，我们的插件项目就算创建好啦。  

### Hello World  

程序员做什么都是从 Hello World 开始，Excel也不例外。  

1. 创建项目后，会为我们自动生成一系列的文件，并自动打开项目。  
2. ThisAddIn.cs文件管理着这个插件的全生命周期。此处有两个方法，`ThisAddIn_Startup(object sender, System.EventArgs e)`会在插件开始加载的时候执行，而`ThisAddIn_Shutdown(object sender, System.EventArgs e)`会在应用关闭或者插件被关闭时执行。  
3. 我们这里可以在`ThisAddIn_Startup(...)`中加入此句：  

		System.Windows.Forms.MessageBox.Show("Hello World");
4. 点击执行，可以看到屏幕上成功的出现一个对话框，上面出现Hello World的字样，就说明我们的插件成功的加载到当前应用了。   

### 添加控件，事件响应

1. 在解决方案资源管理器中，在项目上邮件，点击添加，新建项，选择功能区，点击完成。会出现入下图所示。  
 ![编辑功能区](/assets/images/2017/02-13-01.png)
2. VS为我们自动生成的插件UI上只包括了一个Gourp和一个Leabl，我们可以通过修改Lebal的值，来变更我们这个Group的业务范围。
3. 点击工具箱（一般在右侧，如果找不到可以在菜单栏->视图中找到），拖拽 一个Button控件，放入Group中。双击Button，就可以直接跳转到Button的Click事件（`private void button1_Click(object sender, RibbonControlEventArgs e)`）中。
4. 在上面方法里加入此句： 

		System.Windows.Forms.MessageBox.Show("Hello World By Click");   
5. 点击执行后，看到对应的插件在Add-Ins里。点击按钮，出现一个对话框，上面有“Hello World By Click”的字样。

### Sheet

### Range  

### Excel样式  

### 格式  

### 发布  

### 其他 （Exception）  