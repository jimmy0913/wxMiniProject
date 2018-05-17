//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        tabIndex: 0,
        authorInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        token:null,
    },
    tabHandle: function(e) {
        this.tabIndex = e.currentTarget.dataset.idx;

        this.setData({
            tabIndex: this.tabIndex
        })


    },
    onLoad: function() {
        let _this = this;
        _this.setData({
            // token: getApp().globalData.token,
            authorInfo: getApp().globalData.userInfo
        });
        _this.bindGetUserInfo(function(){
            let token = _this.data.token;
            wx.setStorageSync('token', token);
            console.log('222222222:', token);
        });
    },

    onLaunch: function() {

    },

    bindGetUserInfo: function(callback) {
        let _this = this;
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
                                                });
                                                 // _this.globalData.token = ret.data.data;
                                                 _this.setData({
                                                    token: ret.data.data
                                                 });
                                                 if (typeof callback === 'function') {
                                                    callback();
                                                 }
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

    }

})