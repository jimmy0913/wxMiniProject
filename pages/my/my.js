import { config } from '../../config/api.js';
Page({
    data: {
      authorInfo:{

      }
    },
    onLoad: function(option) {
      this.setData({
        authorInfo: getApp().globalData.userInfo
      });
      console.log(getApp().globalData.userInfo);

    },
    onShow: function(options) {

    },
    onLaunch: function(options) {
    }
});