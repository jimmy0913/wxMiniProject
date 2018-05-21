import Config from '../../config/api.js';
import Util from '../../utils/util';
Page({
    data: {
      authorInfo:{

      }
    },
    onLoad: function(option) {
      // myComment
      let _this = this;
      this.setData({
        authorInfo: getApp().globalData.userInfo
      });
      // console.log(getApp().globalData.userInfo);
      let url = Config.myComment,
          token = wx.getStorageSync('token');
      Util.request(url, {token: token}, 'POST').then((res) => {
        if (res.code === 200) {
          //
          _this.setData({
            myData: res.data
          });
          console.log('33333333333333:', res.data);
        }
      }, (err) => {

      });
      /*this.setData({
        authorInfo: getApp().globalData.userInfo
      });
      console.log(getApp().globalData.userInfo);*/

    },
    onShow: function(options) {

    },
    onLaunch: function(options) {
    }
});