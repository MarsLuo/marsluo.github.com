require('NSString'); // 修正分享问题
defineClass('ZLPrivilegeCenterViewController', {
    webView_shouldStartLoadWithRequest_navigationType: function(webView, request, navigationType) {
        var requestURL = request.URL();

        if (requestURL.scheme().isEqualToString('cicada')) {

            if (requestURL.host().isEqualToString('cicada')) {

                if (requestURL.path().isEqualToString('/page/goPage')) {
                    // 页面跳转
                    var paramString = requestURL.absoluteString().componentsSeparatedByString("?").lastObject();
                    var queryDit = paramString.URLDecodedString().getQueryDict();
                    var pageNameValue = queryDit['viewName'];

                    if (pageNameValue.isEqualToString('pay')) { //支付相关   
                        var sloganJsonStr = queryDit['slogan'];
                        var sloganDic = NSString.jsonObjectWithNSString(sloganJsonStr);
                        self.gotoZLBuyVipController(sloganDic);
                    }
                }
            }
            return NO;
        }

        self.setZlShareUrl(NSString.stringWithFormat("%@", webView.request().URL()));

        self.setZlLeaveRequest(request);

        return YES;
    },
});