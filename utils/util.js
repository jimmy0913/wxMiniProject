import Promise from './bluebird';
var Util = {};


Util.showWXToast = function(title = "", duration = 3000, hideDuration = 6000, showMask = false, icon = "") {
    wx.showToast({
        title: title,
        icon: icon,
        duration: duration,
        mask: showMask
    });
    setTimeout(function() {
        wx.hideToast()
    }, hideDuration);
};
Util.showWXModal = function(title = "", content = "", duration = 3000, hideDuration = 6000, confirmText = '确定', callBack) {
    wx.showModal({
        title: title,
        content: content,
        confirmText: confirmText,
        showCancel: false,
        confirmColor: '#f13031',
        success: function(res) {
            callBack && callBack();
        }
    });
};
// 获取当前页url
Util.getCurrentPageUrl = function() {
    let pages = getCurrentPages(),   //获取加载的页面
    currentPage = pages[pages.length-1],  //获取当前页面的对象
    url = currentPage.route; //当前页面url
    return url;
}

// 获取当前页带参数的url
Util.getCurrentPageUrlWithArgs = function() {
    let pages = getCurrentPages(),  //获取加载的页面
    currentPage = pages[pages.length-1], //获取当前页面的对象
    url = currentPage.route, //当前页面url
    options = currentPage.options; //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    let urlWithArgs = url + '?';
    for(let key in options){
        let value = options[key];
        urlWithArgs += key + '=' + value + '&';
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1);
    return urlWithArgs;
}

/**
 * 封封微信的的request
 */
Util.request = function(url, data = {}, method = "GET") {
    let head = "application/json";
    if (method === "POST") {
        head = "application/x-www-form-urlencoded"
    }
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: {
                'Content-Type': head
            },
            success: function(res) {
                // console.log("success");
                if (res.statusCode == 200) {
                    resolve(res.data);
                }
            },
            fail: function(err) {
                reject(err)
                // console.log("failed")
            }
        });
    });
}

Util.objectToString = function(obj) {
    let outPutStr = '';
    if (Object.prototype.toString.call(obj) == "[object Object]") {
        for (let key in obj) {
            if (key !== 'backUrl') {
                outPutStr += (key + '=' + obj[key] + '\&');
            }
        }
        return outPutStr;
    }
}

module.exports = Util;
