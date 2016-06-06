require('NSString'); // 修正分享问题
defineClass('ZLPrivilegeCenterViewController', {
    webView_shouldStartLoadWithRequest_navigationType: function(webView, request, navigationType) {
        var requestURL = request.URL();

        if (requestURL.scheme().isEqualToString(CICADA_URL_SCHEME)) {

            if (requestURL.host().isEqualToString(CICADA_CICADA)) {

                if (requestURL.path().isEqualToString(CICADA_CICADA_PAGE_GOPAGE)) {
                    // 页面跳转
                    var paramString = requestURL.absoluteString().componentsSeparatedByString("?").lastObject();
                    var queryDit = paramString.URLDecodedString().getQueryDict();
                    var pageNameValue = queryDit[CICADA_P_VIEWNAME];

                    if (pageNameValue.isEqualToString(CICADA_V_Pay)) { //支付相关   
                        var sloganJsonStr = queryDit[CICADA_P_SLOGAN];
                        var sloganDic = NSString.jsonObjectWithNSString(sloganJsonStr);
                        self.gotoZLBuyVipController(sloganDic);
                    }
                }
            }
            return NO;
        }

        self.setZlShareUrl(NSString.stringWithFormat("%", webView.request().URL()));

        self.setZlLeaveRequest(request);

        return YES;
    },
});