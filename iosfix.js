require('ZLUMCount,DataManager,PromptAction,NSBundle'); // 1.6.5 修正老师无法发送消息的问题。
defineClass('NoticeViewController', {
    sendMessageAction: function() {
        ZLUMCount.touchNotifyButton();

        var dataManager = DataManager.sharedInstance();
        if ((dataManager.userSetting().isTeacher() == 1) || dataManager.userSetting().hasChildClass() == 1) {
            self.gotoSendNotifyViewController();
        } else {
            PromptAction.showPromptAlter(NSBundle.mainBundle().localizedStringForKey_value_table("Prompt_CantSend_Message", "", null));
        }
    },
});

require('NSString,PromptAction,NSBundle'); // 1.6.5 取消客户端本地号段验证
defineClass('NSString', {}, {
    checkPhoneString: function(phone) {
        var result = YES;
        if (NSString.checkNullString(phone)) {
            PromptAction.showErrorPrompt(NSBundle.mainBundle().localizedStringForKey_value_table("Prompt_PhoneCantBeNull", "", null));
            result = NO;
        } else if (phone.length() != 11) {
            PromptAction.showErrorPrompt(NSBundle.mainBundle().localizedStringForKey_value_table("Prompt_PhoneFormatError", "", null));
            result = NO;
        }
        return result;
    },
});

require('NSNumber,NetWorkClient');  // 1.6.6 家长获取孩子入离园信息 修改为message服务
defineClass('NetWorkClient', {}, {
    queryCardMessageWithChildId_PageNo_success_failure: function(childId, pageNo, success, failure) {
        var path = "/message/queryCardMessageByChildId";
        var parameter = {
            "pageNo": NSNumber.numberWithInteger(pageNo),
            "childId": NSNumber.numberWithInteger(childId)
        };

        NetWorkClient.postRequest_parameters_serviceType_NeedPrompt_WaitPrompt_ShouldDismissPrompt_success_failure(path, parameter, 3, YES, NO, YES, block("id", function(dataObject) {
            var arr = require('NSMutableArray').alloc().init()
            for (var i = 0; i < dataObject.length; i++) {
                var jsData =  dataObject[i];
                arr.push(jsData);
            };
            jsArr = arr.toJS() 
            success(jsArr);
        }), block('NSDictionary', function(dataObject) {
            failure();
        }));
    },
});