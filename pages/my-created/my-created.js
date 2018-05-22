import Config from '../../config/api.js';
import Util from '../../utils/util';
Page({
    data: {
      authorInfo:{

      }
    },
    onLoad: function(option) {
      let _this = this;
      this.setData({
        authorInfo: getApp().globalData.userInfo
      });
      // console.log(getApp().globalData.userInfo);
      let url = Config.myCreated,
          token = wx.getStorageSync('token');
      Util.request(url, {token: token}, 'POST').then((res) => {
        if (res.code === 200) {
          //
          res.data = {
            "total_page":1,
            "is_next":false,
            "list":[
                {
                    "id":3,
                    "like_num":0,
                    "comment_num":0,
                    "reply_num":0,
                    "add_time":"2018-05-15 11:56",
                    "img":"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f11b3f5b4a1df7e9bdfce788b6506ebb.jpg",
                    "img_desc":"米家空气净化器Pro 白色",
                    "head_img":"https://wx.qlogo.cn/mmopen/vi_32/666ZxTwTYHWc6picOx3OLW5M6vFWZ6PjMe9Q9wkiaKuIU9INnR5e9lD2STy16mY9sXRKmzzSIhlMGjf2vTwFNmGQ/132",
                    "nick_name":"yellow"
                },
                {
                    "id":2,
                    "like_num":0,
                    "comment_num":0,
                    "reply_num":0,
                    "add_time":"2018-05-15 11:56",
                    "img":"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f11b3f5b4a1df7e9bdfce788b6506ebb.jpg",
                    "img_desc":"米家空气净化器Pro 白色",
                    "head_img":"https://wx.qlogo.cn/mmopen/vi_32/666ZxTwTYHWc6picOx3OLW5M6vFWZ6PjMe9Q9wkiaKuIU9INnR5e9lD2STy16mY9sXRKmzzSIhlMGjf2vTwFNmGQ/132",
                    "nick_name":"yellow"
                },
                {
                    "id":1,
                    "like_num":0,
                    "comment_num":0,
                    "reply_num":0,
                    "add_time":"2018-05-15 11:39",
                    "img":"https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/f11b3f5b4a1df7e9bdfce788b6506ebb.jpg",
                    "img_desc":"米家空气净化器Pro 白色",
                    "head_img":"https://wx.qlogo.cn/mmopen/vi_32/666ZxTwTYHWc6picOx3OLW5M6vFWZ6PjMe9Q9wkiaKuIU9INnR5e9lD2STy16mY9sXRKmzzSIhlMGjf2vTwFNmGQ/132",
                    "nick_name":"yellow"
                }
            ]
        };
          _this.setData({
            myData: res.data
          });
          console.log('myCreated 33333333:', res.data);
        }
      }, (err) => {

      });
    },
    onShow: function(options) {

    },
    onLaunch: function(options) {
    }
});