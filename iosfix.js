require('NSString,NSNumber');  // 修正园长不能正确查看接送信息的问题
defineClass('ZLDirectorAssistantViewController', {
    updateUIMethodWithkindergartenCount: function() {
        for (var i = 0; i < self.kindergartenCountArray().count(); i++) {
            var zlDirectorKG = self.kindergartenCountArray[i]();
            _schoolIdArray.addObject(NSString.stringWithFormat("%lld", (long long) zlDirectorKG.schoolId()));
            _schoolNameArray.addObject(zlDirectorKG.schoolName());
            _levelArr.addObject(NSString.stringWithFormat("%ld", (long) zlDirectorKG.level()));
            _hasCardMachineArray.addObject(NSNumber.numberWithBool(zlDirectorKG.hasCardMachine()));
        }
        if (_schoolNameArray.count() == 1) {
            _ui_btnImage.setHidden(YES);
            _selectTableView.setHidden(YES);
            _selectBtn.setUserInteractionEnabled(NO);
            _hasCardMachine = _hasCardMachineArray.firstObject().boolValue();
        }

        if (_schoolNameArray.count() < 4) {
            _selectViewHeight.setConstant(_schoolNameArray.count() * 40);
        } else {
            _selectViewHeight.setConstant(40 * 4);
        }
        self.selectTableView().reloadData();
        if (self.schoolNameArray().count() > 0) {
            self.ui_titleLabel().setText(self.schoolNameArray().firstObject());
        }
        if (self.schoolIdArray().count() > 0) {
            self.setSchoolIdStr(self.schoolIdArray().firstObject());
        }
        self.queryTeacherAndChildAttendanceBySchoolId();
        self.configDirectorFunction(self.levelArr().firstObject().integerValue());
    },
});