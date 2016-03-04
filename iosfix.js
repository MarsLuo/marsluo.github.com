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