//app.js
import Config from './config/api';
const isDebug = Config.debug;
const debugLog = Config.debugLog;

App({
    onLaunch: function() {
        var _this = this;
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                this.code = res.code;

                // 获取用户信息
                wx.getSetting({
                    success: res => {
                        if (res.authSetting['scope.userInfo']) {
                            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                            wx.getUserInfo({
                                withCredentials: true,
                                success: (res, rawData, signature, encryptedData, iv) => {

                                    wx.request({
                                        url: 'https://img.xiarikui08.com/api/user/login',
                                        method: 'POST',
                                        data: {
                                            code: this.code,
                                            encryptedData: res.encryptedData,
                                            iv: res.iv,
                                            rawData: res.rawData,
                                            signature: res.signature,
                                        },
                                        header: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        },
                                        success: function(ret) {
                                            if (ret.data.code == 200) {
                                                wx.showToast({
                                                    title: '登录成功',
                                                    icon: 'success',
                                                    duration: 2000
                                                })

                                                _this.globalData.token = ret.data.data;

                                            } else {
                                                wx.showToast({
                                                    title: ret.data.msg,
                                                    icon: 'none',
                                                    duration: 2000
                                                })
                                            }
                                        },
                                        error: function(ret) {
                                            console.log(ret);
                                        }
                                    })


                                    // 可以将 res 发送给后台解码出 unionId
                                    _this.globalData.userInfo = res.userInfo

                                    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                                    // 所以此处加入 callback 以防止这种情况
                                    if (_this.userInfoReadyCallback) {
                                        _this.userInfoReadyCallback(res)
                                    }

                                },
                                fail: function(res) {
                                    console.log(res);
                                }

                            })


                        }
                    }
                });


            }
        })


        //获取用户信息权限  
        wx.getUserInfo({
            success: function(res) {
                _this.globalData.userInfo = res.userInfo;
                // 测试时 用的console
                debugLog('_this.globalData.userInfo');
                debugLog(_this.globalData.userInfo);
            },
            fail: function(err) {
                debugLog('_this.globalData.userInfo fail');
                debugLog(err);
            }
        });
    },
    globalData: {
        userInfo: null,
        code: null,
        token:null,
    }
})