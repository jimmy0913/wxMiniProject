//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        tabIndex: 0,
        authorInfo: {},
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        token:null,
        bannerArr:[],
        indexList:[], // 首页图文列表
        key_words:'',//搜索关键字
        now_page:1, //当前页
        follow_now_page:1,//关注列表当前页
        indexFollowList:[],
    },
    tabHandle: function(e) {
        this.tabIndex = e.currentTarget.dataset.idx;

        if(this.tabIndex == 1){
            this.getIndexFollowList();
        }

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
            // myaaamylet token = _this.data.token;
            let token = '8891fc56a232c7e95634e9a9c21a78b2';
            wx.setStorageSync('token', token);
        });


        this.getBannerImg();
        this.getIndexDetail();
    },

    // 获取轮播图
    getBannerImg:function(){

        let _this =  this;

        wx.request({
            url: 'https://img.xiarikui08.com/api/index/ad_img',
            method: 'POST',
            data: {},
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(ret) {
                if (ret.data.code == 200) {
                    
                    _this.setData({
                        bannerArr:ret.data.data,
                    })
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

    // 获取推荐列表
    getIndexDetail:function(){
        let _this =  this;

        wx.request({
            url: 'https://img.xiarikui08.com/api/index/index',
            method: 'POST',
            data: {},
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(ret) {
                if (ret.data.code == 200) {
                    _this.setData({
                        indexList:ret.data.data.list,
                    })
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

    //获取关注列表
    getIndexFollowList : function(){
        let _this =  this;

        wx.request({
            url: 'https://img.xiarikui08.com/api/index/follow_index',
            method: 'POST',
            data: {
                now_page: _this.data.follow_now_page,
                token: _this.data.token,
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function(ret) {
                if (ret.data.code == 200) {
                    console.log(ret.data);

                    _this.setData({
                        indexFollowList:ret.data.data.list,
                    })
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
                                            // console.log(ret);
                                        }
                                    })


                                },
                                fail: function(res) {
                                    // console.log(res);
                                }



                            })



                        }
                    }
                });


            }
        })

    }

})