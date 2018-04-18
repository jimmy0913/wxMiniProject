/**
 * 小程序配置文件
 */
// 接口URL配置文件

var ENV = "prod";

var domain = 'sit';
var imgUrl = '';
var host = "";

var config = {
    imgUrl,
    domain,
    host,
    debug: false,
    //
    // 是否登陆微信
    isWxLoginUrl: `https://mgo.${domain}.com/wxAppLogin/isWxLogin`,
    //
    wxLoginUrl: `https://mgo.${domain}.com/wxAppLogin/wxLogin`,
    // 首页接口
    indexUrl: `https://mgo.${domain}.com/taolibao/index.htm`
};

module.exports = config;