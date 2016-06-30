
require('ZLChildrenAttendanceViewController,ZLTeacherAttendanceViewController');  // 1.8.1.206 修正园长不能正确查看接送信息的问题
defineClass('ZLDirectorAssistantViewController', {
    onChildrenButtonTouch: function(sender) {
        if (self.hasCardMachineArray().count() == 1) {
            self.setHasCardMachine(self.hasCardMachineArray().firstObject());
        }

        var zlChildrenAttendanceViewController = ZLChildrenAttendanceViewController.alloc().initWithNibName_bundle("ZLChildrenAttendanceViewController", null);
        zlChildrenAttendanceViewController.setSchoolId(self.schoolIdStr());
        zlChildrenAttendanceViewController.setHasCardMachine(self.hasCardMachine());
        self.navigationController().pushViewController_animated(zlChildrenAttendanceViewController, YES);
    },
    onTeacherButtonTouch: function(sender) {

        if (self.hasCardMachineArray().count() == 1) {
            self.setHasCardMachine(self.hasCardMachineArray().firstObject());
        }

        var zlTeacherAttendanceViewController = ZLTeacherAttendanceViewController.alloc().initWithNibName_bundle("ZLTeacherAttendanceViewController", null);
        zlTeacherAttendanceViewController.setSchoolId(self.schoolIdStr());
        zlTeacherAttendanceViewController.setHasCardMachine(self.hasCardMachine());
        self.navigationController().pushViewController_animated(zlTeacherAttendanceViewController, YES);
    },
});