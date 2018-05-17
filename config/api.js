/**
 * 小程序配置文件
 */
// 接口URL配置文件

var ENV = "prod";

var domain = 'sit';
var imgUrl = '';
var host = 'https://img.xiarikui08.com/';

var config = {
    imgUrl,
    domain,
    host,
    debug: false,
    debugLog: function(){
        if (config.debug) {
            console.log.apply(console, arguments);
        }
    },
    //
    // 个人中心首页
    my: host + 'api/user/index',
    // 我的关注列表
    myFollow: host + 'api/user/my_follow',
    //
    wxLoginUrl: `https://mgo.${domain}.com/wxAppLogin/wxLogin`,
    // 首页接口
    indexUrl: `https://mgo.${domain}.com/taolibao/index.htm`
};

module.exports = config;