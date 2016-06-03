require('PublicWebViewController'); // 1.7.0 增加成长足迹缺省页
defineClass('MeViewController', {
    gotoZLChildTrackViewController: function() {

        var webViewController = PublicWebViewController.alloc().initWithNibName_bundle("PublicWebViewController", null);
        webViewController.setRequestUrlStr("http://www.baidu.com");
        webViewController.setRequestType("成长足迹");
        self.navigationController().pushViewController_animated(webViewController, YES);
    },
});